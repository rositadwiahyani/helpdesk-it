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

export const DUMMY_USERS: User[] = [
  {
    id: '1',
    name: 'Ari Dwiningsih',
    email: 'ari@lecturer.undip.ac.id',
    status: 'Active (Registered)',
    totalTickets: 12,
    organization: 'Fakultas Teknik',
    joinedDate: '2022-04-18',
    lastUpdated: '2022-04-18 12:15:43',
  },
  {
    id: '2',
    name: 'Arin Farikha',
    email: 'arin.f@students.undip.ac.id',
    status: 'Guest',
    totalTickets: 5,
    organization: 'Fakultas Hukum',
    joinedDate: '2022-03-31',
    lastUpdated: '2022-03-31 11:40:21',
  },
  {
    id: '3',
    name: 'Aubrey Dara Nafiza Lubis',
    email: 'aubrey@students.undip.ac.id',
    status: 'Guest',
    totalTickets: 1,
    joinedDate: '2020-09-11',
    lastUpdated: '2020-09-11 10:59:12',
  },
  {
    id: '4',
    name: 'Brigitta Prisca Larasati',
    email: 'brigitta@staff.undip.ac.id',
    status: 'Active (Registered)',
    totalTickets: 42,
    organization: 'Direktorat IT',
    joinedDate: '2020-10-29',
    lastUpdated: '2020-10-29 02:39:32',
  },
  {
    id: '5',
    name: 'Elika Febrianti',
    email: 'elika@students.undip.ac.id',
    status: 'Guest',
    totalTickets: 0,
    organization: 'Fakultas Psikologi',
    joinedDate: '2021-04-19',
    lastUpdated: '2021-04-19 10:52:57',
  },
  {
    id: '6',
    name: 'Mahadevi Zainuzahri Wahana',
    email: 'mahadevi@lecturer.undip.ac.id',
    status: 'Locked (Pending Activation)',
    totalTickets: 8,
    organization: 'Fakultas Ilmu Budaya',
    joinedDate: '2021-01-10',
    lastUpdated: '2021-01-10 01:58:29',
  },
  {
    id: '7',
    name: 'Rizka Safitri',
    email: 'rizka@staff.undip.ac.id',
    status: 'Active (Registered)',
    totalTickets: 15,
    organization: 'Biro Administrasi Akademik',
    joinedDate: '2022-07-18',
    lastUpdated: '2022-07-19 10:09:02',
  },
  {
    id: '8',
    name: 'Ahmad Dika Styansah',
    email: 'ahmaddikastyansah15@gmail.com',
    status: 'Guest',
    totalTickets: 1,
    organization: 'Sistem Informasi',
    joinedDate: '2026-07-14',
    lastUpdated: '2026-07-14 08:46:30',
  }
];

// Helper stat data
export const DUMMY_USER_STATS = {
  total: 120,
  admin: 5,
  user: 115,
  newThisMonth: 18,
};
