import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core'; // <--- Import these
import { isPlatformBrowser } from '@angular/common'; // <--- Import this

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Inject the Platform ID to know where we are running
  const platformId = inject(PLATFORM_ID);

  // 2. Only access localStorage if we are in the Browser
  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');

    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(cloned);
    }
  }

  // 3. If on Server (or no token), just pass the request through
  return next(req);
};
