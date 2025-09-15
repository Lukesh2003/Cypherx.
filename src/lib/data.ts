
export type Tourist = {
  id: string;
  name: string;
  passport: string;
  aadhaar?: string;
  drivingLicense?: string;
  itinerary: string;
  emergencyContact: {
    name: string;
    phone: string;
  };
  status: 'Safe' | 'Alert' | 'Missing';
  lastSeen: string;
  location: { lat: number; lng: number };
  dateAdded: string;
  avatar: string;
};

export type Alert = {
  id:string;
  touristId: string;
  type: 'SOS' | 'Anomaly';
  description: string;
  timestamp: string;
  location: string;
  status: 'Active' | 'Resolved';
};

export const MOCK_TOURISTS: Tourist[] = [
  {
    id: 't1',
    name: 'Priya Sharma',
    passport: 'P12345678',
    aadhaar: '1234 5678 9012',
    drivingLicense: 'DL1420110012345',
    itinerary: 'Exploring Guwahati and nearby wildlife sanctuaries.',
    emergencyContact: { name: 'Rohan Sharma', phone: '+91-555-0101' },
    status: 'Alert',
    lastSeen: '2 hours ago',
    location: { lat: 26.1445, lng: 91.7362 },
    dateAdded: '2023-10-26T10:00:00Z',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
  },
  {
    id: 't2',
    name: 'Arjun Gupta',
    passport: 'G87654321',
    itinerary: 'Visiting the scenic hills of Shillong.',
    emergencyContact: { name: 'Sunita Gupta', phone: '+91-555-0102' },
    status: 'Safe',
    lastSeen: '15 minutes ago',
    location: { lat: 25.5788, lng: 91.8933 },
    dateAdded: '2023-10-26T11:30:00Z',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  },
  {
    id: 't3',
    name: 'Ananya Reddy',
    passport: 'R24681357',
    itinerary: 'Trekking in the mountains near Itanagar.',
    emergencyContact: { name: 'Vijay Reddy', phone: '+91-555-0103' },
    status: 'Safe',
    lastSeen: '45 minutes ago',
    location: { lat: 27.0933, lng: 93.6053 },
    dateAdded: '2023-10-25T14:00:00Z',
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
  },
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'a1',
    touristId: 't1',
    type: 'SOS',
    description: 'Tourist activated panic button.',
    timestamp: '2023-10-26T12:00:00Z',
    location: 'Kamakhya Temple, Guwahati',
    status: 'Active',
  },
  {
    id: 'a2',
    touristId: 't2',
    type: 'Anomaly',
    description: 'Prolonged stop detected.',
    timestamp: '2023-10-25T18:30:00Z',
    location: 'Police Bazar, Shillong',
    status: 'Resolved',
  },
];

