import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common'; // <--- IMPORT THIS

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  private currentUserSubject = new BehaviorSubject<string | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  // --- LOGIN ---
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        const username = credentials.username;
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('username', username);

          // --- UNCOMMENT AND FIX THIS SECTION ---
          // If your backend returns a JWT token, you MUST save it.
          // Check your browser's Network tab -> Login response to see the actual field name (e.g., 'token', 'accessToken', 'jwt')
          if (response.token) {
            localStorage.setItem('token', response.token);
          }
          // --------------------------------------
        }
        this.currentUserSubject.next(username);
      })
    );
  }

  registerExpert(formData: FormData): Observable<any> {
    // ✅ Matches @PostMapping("/register/expert")
    return this.http.post(`${this.apiUrl}/register/expert`, formData);
  }

  // 2. Register Client
  registerClient(formData: FormData): Observable<any> {
    // ✅ Matches @PostMapping("/register/client")
    return this.http.post(`${this.apiUrl}/register/client`, formData);
  }

  // --- LOGOUT ---
  logout() {
    // FIX: Only access localStorage in the browser
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('username');
      localStorage.removeItem('token'); // Remove token if you have one
      localStorage.removeItem('role');
      localStorage.removeItem('userRole');
    }
    this.currentUserSubject.next(null);

    // Optional backend logout
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe();
  }

  // --- SYNC SESSION (Fixes the 401 Error) ---
  syncSessionState(): Observable<any> {
    // FIX: If on the Server, STOP immediately. Do not call the API.
    if (!isPlatformBrowser(this.platformId)) {
      return of(null);
    }

    // Only browser reaches here
    return this.http.get<any>(`${this.apiUrl}/me`).pipe(
      tap(user => {
        if (user && user.username) {
          this.currentUserSubject.next(user.username);
          localStorage.setItem('username', user.username);
        }
      }),
      catchError(err => {
        return of(null);
      })
    );
  }

  // --- HELPER METHODS (Fixes the Crashes) ---

  isLoggedIn(): boolean {
    // FIX: Check platform before touching localStorage
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false; // Server is never "logged in"
  }

  getUserRole(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('role') || 'USER';
    }
    return 'USER'; // Default for server
  }

  isAdmin(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const role = localStorage.getItem('userRole'); // Ensure this key matches your login logic
      return role === 'ADMIN';
    }
    return false; // Server is never admin
  }

  getCurrentUsername(): string | null {
    return this.currentUserSubject.value;
  }
  getAllUsersForAdmin(): Observable<any> {
    // The "Double Lock" - Safety inside the service itself
    if (!isPlatformBrowser(this.platformId)) {
      return of([]);
    }
    return this.http.get(this.apiUrl);
  }
  getUserProfile(id: number | string): Observable<any> {
    // Make sure this matches your backend @GetMapping exactly!
    return this.http.get<any>(`${this.apiUrl}/profile/${id}`);
  }
}
