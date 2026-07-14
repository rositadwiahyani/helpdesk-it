export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type TicketStatus = 'Open' | 'Waiting' | 'In Progress' | 'Resolved' | 'Closed';

export interface TicketMessage {
  id: string;
  sender: string;
  avatar?: string;
  role: 'user' | 'admin';
  content: string;
  timestamp: string;
  attachments?: string[];
  type: 'reply' | 'internal_note';
}

export interface TicketTimelineEvent {
  id: string;
  event: string;
  actor: string;
  timestamp: string;
  details?: string;
}

export interface Ticket {
  id: string;
  subject: string;
  requester: string;
  email: string;
  department: string;
  priority: TicketPriority;
  status: TicketStatus;
  assignedTo: string | null;
  createdDate: string;
  updatedDate: string;
  dueDate: string;
  sla: string;
  source: string;
  helpTopic: string;
  conversations: TicketMessage[];
  timeline: TicketTimelineEvent[];
  isDeleted?: boolean;
}

export const DUMMY_TICKETS: Ticket[] = [
  {
    id: 'TKT-2026-001',
    subject: 'Reset prodi di Mandala.undip.ac.id',
    requester: 'Khansa Mariska Herdian',
    email: 'khansa@students.undip.ac.id',
    department: 'Sistem Informasi',
    priority: 'Medium',
    status: 'Open',
    assignedTo: null,
    createdDate: '2026-07-14 02:21:54',
    updatedDate: '2026-07-14 02:21:54',
    dueDate: '2026-07-16 02:21:54',
    sla: '48 Hours',
    source: 'Web Portal',
    helpTopic: 'Aplikasi Mandala',
    conversations: [
      {
        id: 'msg-1',
        sender: 'Khansa Mariska Herdian',
        role: 'user',
        content: 'Halo, mohon bantuannya untuk melakukan reset program studi saya di aplikasi Mandala karena salah memilih saat pendaftaran.',
        timestamp: '2026-07-14 02:21:54',
        type: 'reply'
      }
    ],
    timeline: [
      {
        id: 't-1',
        event: 'Ticket Created',
        actor: 'Khansa Mariska Herdian',
        timestamp: '2026-07-14 02:21:54',
        details: 'Submitted via Web Portal'
      }
    ]
  },
  {
    id: 'TKT-2026-002',
    subject: 'Butuh Password Akun SSO',
    requester: 'Andrew Benedict Waruwu',
    email: 'andrew.b@students.undip.ac.id',
    department: 'Infrastruktur IT',
    priority: 'High',
    status: 'In Progress',
    assignedTo: 'Support IT',
    createdDate: '2026-07-14 02:08:04',
    updatedDate: '2026-07-14 02:15:32',
    dueDate: '2026-07-15 02:08:04',
    sla: '24 Hours',
    source: 'Email',
    helpTopic: 'Akun SSO',
    conversations: [
      {
        id: 'msg-2-1',
        sender: 'Andrew Benedict Waruwu',
        role: 'user',
        content: 'Saya mahasiswa baru belum mendapatkan password SSO. Kemarin saat registrasi tidak terkirim ke email pribadi.',
        timestamp: '2026-07-14 02:08:04',
        type: 'reply'
      },
      {
        id: 'msg-2-2',
        sender: 'Support IT',
        role: 'admin',
        content: 'Sedang kami cek di database registrasi mahasiswa baru. Mohon tunggu sebentar.',
        timestamp: '2026-07-14 02:15:32',
        type: 'reply'
      },
      {
        id: 'msg-2-3',
        sender: 'Support IT',
        role: 'admin',
        content: 'Catatan internal: NIM ybs aktif, namun email registrasi typo dari undip.ca.id menjadi undip.ac.id.',
        timestamp: '2026-07-14 02:16:00',
        type: 'internal_note'
      }
    ],
    timeline: [
      {
        id: 't-2-1',
        event: 'Ticket Created',
        actor: 'Andrew Benedict Waruwu',
        timestamp: '2026-07-14 02:08:04'
      },
      {
        id: 't-2-2',
        event: 'Assigned to Agent',
        actor: 'System',
        timestamp: '2026-07-14 02:09:00',
        details: 'Assigned to Support IT'
      },
      {
        id: 't-2-3',
        event: 'Status Changed',
        actor: 'Support IT',
        timestamp: '2026-07-14 02:15:32',
        details: 'Changed status to In Progress'
      }
    ]
  },
  {
    id: 'TKT-2026-003',
    subject: 'error pada perubahan password utk pertama kali',
    requester: 'Maheswari Citra Kirani',
    email: 'maheswari@staff.undip.ac.id',
    department: 'Infrastruktur IT',
    priority: 'Critical',
    status: 'Waiting',
    assignedTo: 'Support IT',
    createdDate: '2026-07-14 01:59:02',
    updatedDate: '2026-07-14 02:05:00',
    dueDate: '2026-07-14 05:59:02',
    sla: '4 Hours',
    source: 'Web Portal',
    helpTopic: 'Akun SSO',
    conversations: [
      {
        id: 'msg-3-1',
        sender: 'Maheswari Citra Kirani',
        role: 'user',
        content: 'Saya mencoba mengganti password pertama kali di SSO tetapi muncul error "Invalid Token" terus menerus.',
        timestamp: '2026-07-14 01:59:02',
        type: 'reply'
      },
      {
        id: 'msg-3-2',
        sender: 'Support IT',
        role: 'admin',
        content: 'Kami membutuhkan tangkapan layar (screenshot) pesan error tersebut untuk menganalisis kendala token ini.',
        timestamp: '2026-07-14 02:05:00',
        type: 'reply'
      }
    ],
    timeline: [
      {
        id: 't-3-1',
        event: 'Ticket Created',
        actor: 'Maheswari Citra Kirani',
        timestamp: '2026-07-14 01:59:02'
      },
      {
        id: 't-3-2',
        event: 'Priority Set to Critical',
        actor: 'System',
        timestamp: '2026-07-14 01:59:05'
      },
      {
        id: 't-3-3',
        event: 'Status Changed',
        actor: 'Support IT',
        timestamp: '2026-07-14 02:05:00',
        details: 'Changed status to Waiting for User Response'
      }
    ]
  },
  {
    id: 'TKT-2026-004',
    subject: 'APLIKASI MANDALA - NIM Tidak Terdaftar',
    requester: 'Ati Nurwita',
    email: 'atinurwita@lecturer.undip.ac.id',
    department: 'Sistem Informasi',
    priority: 'Medium',
    status: 'Resolved',
    assignedTo: 'Developer Mandala',
    createdDate: '2026-07-14 01:22:13',
    updatedDate: '2026-07-14 03:00:00',
    dueDate: '2026-07-16 01:22:13',
    sla: '48 Hours',
    source: 'API/System',
    helpTopic: 'Aplikasi Mandala',
    conversations: [
      {
        id: 'msg-4-1',
        sender: 'Ati Nurwita',
        role: 'user',
        content: 'Mahasiswa bimbingan saya a.n. Doni tidak bisa mengisi rencana studi karena NIM dinyatakan tidak aktif.',
        timestamp: '2026-07-14 01:22:13',
        type: 'reply'
      },
      {
        id: 'msg-4-2',
        sender: 'Developer Mandala',
        role: 'admin',
        content: 'Sudah disinkronkan dengan data PDDIKTI akademik. Silakan dicoba login kembali.',
        timestamp: '2026-07-14 03:00:00',
        type: 'reply'
      }
    ],
    timeline: [
      { id: 't-4-1', event: 'Ticket Created', actor: 'Ati Nurwita', timestamp: '2026-07-14 01:22:13' },
      { id: 't-4-2', event: 'Status Changed to Resolved', actor: 'Developer Mandala', timestamp: '2026-07-14 03:00:00' }
    ]
  },
  {
    id: 'TKT-2026-005',
    subject: 'Undangan Wisuda - Link Zoom Salah',
    requester: 'Sanandha Azwa Fazila',
    email: 'sanandha@students.undip.ac.id',
    department: 'Humas & Protokoler',
    priority: 'Low',
    status: 'Closed',
    assignedTo: 'Panitia Wisuda',
    createdDate: '2026-07-14 00:07:11',
    updatedDate: '2026-07-14 05:00:00',
    dueDate: '2026-07-15 00:07:11',
    sla: '24 Hours',
    source: 'Web Portal',
    helpTopic: 'Wisuda',
    conversations: [
      {
        id: 'msg-5-1',
        sender: 'Sanandha Azwa Fazila',
        role: 'user',
        content: 'Link Zoom undangan wisuda ke-170 sesi pagi tidak bisa dibuka.',
        timestamp: '2026-07-14 00:07:11',
        type: 'reply'
      },
      {
        id: 'msg-5-2',
        sender: 'Panitia Wisuda',
        role: 'admin',
        content: 'Mohon maaf atas ketidaknyamanan tersebut. Berikut link Zoom yang benar: https://zoom.us/j/wisudaundip170',
        timestamp: '2026-07-14 04:30:00',
        type: 'reply'
      }
    ],
    timeline: [
      { id: 't-5-1', event: 'Ticket Created', actor: 'Sanandha Azwa Fazila', timestamp: '2026-07-14 00:07:11' },
      { id: 't-5-2', event: 'Ticket Closed', actor: 'System', timestamp: '2026-07-14 05:00:00', details: 'Auto-closed after resolution' }
    ]
  },
  {
    id: 'TKT-2026-006',
    subject: 'Permasalahan Lisensi Microsoft 365',
    requester: 'Soraya Khoiru Nissa',
    email: 'soraya@staff.undip.ac.id',
    department: 'Infrastruktur IT',
    priority: 'Low',
    status: 'Open',
    assignedTo: null,
    createdDate: '2026-07-13 11:00:55',
    updatedDate: '2026-07-13 11:00:55',
    dueDate: '2026-07-15 11:00:55',
    sla: '48 Hours',
    source: 'Email',
    helpTopic: 'Lisensi Software',
    conversations: [
      {
        id: 'msg-6-1',
        sender: 'Soraya Khoiru Nissa',
        role: 'user',
        content: 'Lisensi Office 365 saya tertulis "Subscription Expired" padahal login menggunakan email Undip resmi.',
        timestamp: '2026-07-13 11:00:55',
        type: 'reply'
      }
    ],
    timeline: [{ id: 't-6-1', event: 'Ticket Created', actor: 'Soraya Khoiru Nissa', timestamp: '2026-07-13 11:00:55' }]
  },
  {
    id: 'TKT-2026-007',
    subject: 'MFA error saat login di aplikasi dekstop',
    requester: 'Ahmad Dika Styansah',
    email: 'ahmaddikastyansah15@gmail.com',
    department: 'Infrastruktur IT',
    priority: 'High',
    status: 'Open',
    assignedTo: null,
    createdDate: '2026-07-13 08:51:29',
    updatedDate: '2026-07-13 08:51:29',
    dueDate: '2026-07-14 08:51:29',
    sla: '24 Hours',
    source: 'Mobile App',
    helpTopic: 'Keamanan & MFA',
    conversations: [
      {
        id: 'msg-7-1',
        sender: 'Ahmad Dika Styansah',
        role: 'user',
        content: 'Saya tidak bisa login di aplikasi Teams Desktop karena kode MFA Microsoft Authenticator tidak pernah muncul di HP.',
        timestamp: '2026-07-13 08:51:29',
        type: 'reply'
      }
    ],
    timeline: [{ id: 't-7-1', event: 'Ticket Created', actor: 'Ahmad Dika Styansah', timestamp: '2026-07-13 08:51:29' }]
  },
  {
    id: 'TKT-2026-008',
    subject: 'Error ticketing atribut almet',
    requester: 'Muhammad Riadha Parikesit Nugroho',
    email: 'riadha@students.undip.ac.id',
    department: 'Kemahasiswaan',
    priority: 'Medium',
    status: 'Closed',
    assignedTo: 'Biro Kemahasiswaan',
    createdDate: '2026-07-13 08:30:51',
    updatedDate: '2026-07-13 14:00:00',
    dueDate: '2026-07-15 08:30:51',
    sla: '48 Hours',
    source: 'Web Portal',
    helpTopic: 'Layanan Kemahasiswaan',
    conversations: [
      {
        id: 'msg-8-1',
        sender: 'Muhammad Riadha',
        role: 'user',
        content: 'Saat memilih ukuran almamater di portal registrasi selalu muncul pesan error database.',
        timestamp: '2026-07-13 08:30:51',
        type: 'reply'
      }
    ],
    timeline: [{ id: 't-8-1', event: 'Ticket Created', actor: 'Muhammad Riadha', timestamp: '2026-07-13 08:30:51' }]
  },
  {
    id: 'TKT-2026-009',
    subject: 'Reset password',
    requester: 'Stevielita Amadea Mahira',
    email: 'stevielita@students.undip.ac.id',
    department: 'Infrastruktur IT',
    priority: 'Low',
    status: 'Resolved',
    assignedTo: 'Support IT',
    createdDate: '2026-07-13 08:30:22',
    updatedDate: '2026-07-13 09:10:00',
    dueDate: '2026-07-15 08:30:22',
    sla: '48 Hours',
    source: 'Web Portal',
    helpTopic: 'Akun SSO',
    conversations: [
      {
        id: 'msg-9-1',
        sender: 'Stevielita Amadea',
        role: 'user',
        content: 'Tolong bantu reset password akun SSO SIAP saya.',
        timestamp: '2026-07-13 08:30:22',
        type: 'reply'
      }
    ],
    timeline: [{ id: 't-9-1', event: 'Ticket Created', actor: 'Stevielita Amadea', timestamp: '2026-07-13 08:30:22' }]
  },
  {
    id: 'TKT-2026-010',
    subject: 'Gagal login SSO SIAP',
    requester: 'Mansye Ronal Ayal',
    email: 'mansye@staff.undip.ac.id',
    department: 'Infrastruktur IT',
    priority: 'Medium',
    status: 'Open',
    assignedTo: null,
    createdDate: '2026-07-13 02:51:40',
    updatedDate: '2026-07-13 02:51:40',
    dueDate: '2026-07-15 02:51:40',
    sla: '48 Hours',
    source: 'Email',
    helpTopic: 'Akun SSO',
    conversations: [
      {
        id: 'msg-10-1',
        sender: 'Mansye Ronal Ayal',
        role: 'user',
        content: 'Saya dituduh melakukan serangan brute force oleh sistem sehingga akun di-suspend sementara. Mohon dibantu unlock.',
        timestamp: '2026-07-13 02:51:40',
        type: 'reply'
      }
    ],
    timeline: [{ id: 't-10-1', event: 'Ticket Created', actor: 'Mansye Ronal Ayal', timestamp: '2026-07-13 02:51:40' }]
  },
  {
    id: 'TKT-2026-011',
    subject: 'Status Mahasiswa di PDDIKTI',
    requester: 'Muhammad Ahsan Yudhistira',
    email: 'ahsan@students.undip.ac.id',
    department: 'Akademik',
    priority: 'High',
    status: 'In Progress',
    assignedTo: 'BAA Akademik',
    createdDate: '2026-07-13 01:16:04',
    updatedDate: '2026-07-13 04:30:00',
    dueDate: '2026-07-14 01:16:04',
    sla: '24 Hours',
    source: 'Web Portal',
    helpTopic: 'Sinkronisasi PDDIKTI',
    conversations: [
      {
        id: 'msg-11-1',
        sender: 'Muhammad Ahsan Yudhistira',
        role: 'user',
        content: 'Status saya di PDDIKTI masih tercatat non-aktif padahal saya sudah bayar UKT semester ini.',
        timestamp: '2026-07-13 01:16:04',
        type: 'reply'
      }
    ],
    timeline: [{ id: 't-11-1', event: 'Ticket Created', actor: 'Muhammad Ahsan', timestamp: '2026-07-13 01:16:04' }]
  },
  {
    id: 'TKT-2026-012',
    subject: 'Reset password alumni',
    requester: 'Oswin Farrel Malau',
    email: 'oswin@alumni.undip.ac.id',
    department: 'Infrastruktur IT',
    priority: 'Low',
    status: 'Closed',
    assignedTo: 'Support IT',
    createdDate: '2026-07-13 12:15:02',
    updatedDate: '2026-07-13 15:00:00',
    dueDate: '2026-07-15 12:15:02',
    sla: '48 Hours',
    source: 'Web Portal',
    helpTopic: 'Akun SSO',
    conversations: [
      {
        id: 'msg-12-1',
        sender: 'Oswin Farrel Malau',
        role: 'user',
        content: 'Saya memerlukan akses ke email alumni saya kembali untuk keperluan verifikasi berkas lamaran kerja.',
        timestamp: '2026-07-13 12:15:02',
        type: 'reply'
      }
    ],
    timeline: [{ id: 't-12-1', event: 'Ticket Created', actor: 'Oswin Farrel', timestamp: '2026-07-13 12:15:02' }]
  },
  {
    id: 'TKT-2026-013',
    subject: 'Penggantian Prodi Pada Aplikasi MANDALA',
    requester: 'Alya Khoirun Nisa',
    email: 'alya@students.undip.ac.id',
    department: 'Sistem Informasi',
    priority: 'Medium',
    status: 'Resolved',
    assignedTo: 'Support IT',
    createdDate: '2026-07-13 09:45:57',
    updatedDate: '2026-07-13 11:20:00',
    dueDate: '2026-07-15 09:45:57',
    sla: '48 Hours',
    source: 'Web Portal',
    helpTopic: 'Aplikasi Mandala',
    conversations: [
      {
        id: 'msg-13-1',
        sender: 'Alya Khoirun Nisa',
        role: 'user',
        content: 'Mohon dibantu ganti prodi pendaftaran dari Arsitektur menjadi Perencanaan Wilayah.',
        timestamp: '2026-07-13 09:45:57',
        type: 'reply'
      }
    ],
    timeline: [{ id: 't-13-1', event: 'Ticket Created', actor: 'Alya Khoirun', timestamp: '2026-07-13 09:45:57' }]
  },
  {
    id: 'TKT-2026-014',
    subject: 'Status PDDIKTI mahasiswa pindahan',
    requester: 'firdha nurhaliza',
    email: 'firdha@students.undip.ac.id',
    department: 'Akademik',
    priority: 'Medium',
    status: 'Open',
    assignedTo: null,
    createdDate: '2026-07-13 09:45:00',
    updatedDate: '2026-07-13 09:45:00',
    dueDate: '2026-07-15 09:45:00',
    sla: '48 Hours',
    source: 'Web Portal',
    helpTopic: 'Sinkronisasi PDDIKTI',
    conversations: [
      {
        id: 'msg-14-1',
        sender: 'firdha nurhaliza',
        role: 'user',
        content: 'Data SKS pindahan dari kampus asal belum terakumulasi di dashboard SIKAD.',
        timestamp: '2026-07-13 09:45:00',
        type: 'reply'
      }
    ],
    timeline: [{ id: 't-14-1', event: 'Ticket Created', actor: 'firdha nurhaliza', timestamp: '2026-07-13 09:45:00' }]
  },
  {
    id: 'TKT-2026-015',
    subject: 'Permohonan ganti Prodi',
    requester: 'Aryati Triandini',
    email: 'aryati@students.undip.ac.id',
    department: 'Akademik',
    priority: 'Medium',
    status: 'In Progress',
    assignedTo: 'BAA Akademik',
    createdDate: '2026-07-13 06:37:49',
    updatedDate: '2026-07-13 08:00:00',
    dueDate: '2026-07-15 06:37:49',
    sla: '48 Hours',
    source: 'Web Portal',
    helpTopic: 'Layanan Akademik',
    conversations: [
      {
        id: 'msg-15-1',
        sender: 'Aryati Triandini',
        role: 'user',
        content: 'Saya ingin membatalkan permohonan kepindahan prodi karena kendala administrasi di fakultas lama.',
        timestamp: '2026-07-13 06:37:49',
        type: 'reply'
      }
    ],
    timeline: [{ id: 't-15-1', event: 'Ticket Created', actor: 'Aryati Triandini', timestamp: '2026-07-13 06:37:49' }]
  }
];

export const getTicketStats = (tickets: Ticket[]) => {
  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'Open' || t.status === 'Waiting').length,
    inProgress: tickets.filter(t => t.status === 'In Progress').length,
    waiting: tickets.filter(t => t.status === 'Waiting').length,
    resolved: tickets.filter(t => t.status === 'Resolved').length,
    closed: tickets.filter(t => t.status === 'Closed').length,
  };
  return stats;
};
