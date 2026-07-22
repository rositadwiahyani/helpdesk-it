export type UserRole = 'Admin' | 'User' | 'Guest';
export type UserStatus = 'Active (Registered)' | 'Guest' | 'Locked (Pending Activation)';

export interface User {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  totalTickets: number;
  organization?: string;
  joinedDate: string;
  lastUpdated: string;
}

export const DUMMY_USERS: User[] = [];

// Helper stat data
export const DUMMY_USER_STATS = {
  total: 120,
  admin: 5,
  user: 115,
  newThisMonth: 18,
};
