// Matches 'StatusName' used in Appointment
export type AppointmentStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED';

// Matches 'Status' used in User (from previous context)
export type UserStatus = 'ONLINE' | 'OFFLINE' | 'BUSY';

// Inferred from OfferRequest comments
export type OfferStatus = 'DRAFT' | 'ACTIVE' | 'ARCHIVED';

// Inferred from ServiceOrder comments
export type OrderStatus = 'PENDING' | 'PAID' | 'FAILED' | 'COMPLETED' | 'CANCELLED';
