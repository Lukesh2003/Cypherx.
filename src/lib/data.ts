
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
    itinerary: 'Exploring the river island of Majuli, Assam.',
    emergencyContact: { name: 'Rohan Sharma', phone: '+91-555-0101' },
    status: 'Alert',
    lastSeen: '2 hours ago',
    location: { lat: 26.9138, lng: 94.2237 },
    dateAdded: '2023-10-26T10:00:00Z',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
  },
  {
    id: 't2',
    name: 'Arjun Gupta',
    passport: 'G87654321',
    itinerary: 'Visiting the living root bridges in Cherrapunji, Meghalaya.',
    emergencyContact: { name: 'Sunita Gupta', phone: '+91-555-0102' },
    status: 'Safe',
    lastSeen: '15 minutes ago',
    location: { lat: 25.2709, lng: 91.7323 },
    dateAdded: '2023-10-26T11:30:00Z',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  },
  {
    id: 't3',
    name: 'Ananya Reddy',
    passport: 'R24681357',
    itinerary: 'Enjoying the views of Kanchenjunga from Gangtok, Sikkim.',
    emergencyContact: { name: 'Vijay Reddy', phone: '+91-555-0103' },
    status: 'Safe',
    lastSeen: '45 minutes ago',
    location: { lat: 27.3389, lng: 88.6065 },
    dateAdded: '2023-10-25T14:00:00Z',
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
  },
  {
    id: 't4',
    name: 'Rohan Mehra',
    passport: 'M78901234',
    itinerary: 'Trekking in Dzukou Valley, Nagaland.',
    emergencyContact: { name: 'Kavita Mehra', phone: '+91-555-0104' },
    status: 'Safe',
    lastSeen: '3 hours ago',
    location: { lat: 25.6163, lng: 94.1186 },
    dateAdded: '2023-10-24T09:00:00Z',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d'
  },
  {
    id: 't5',
    name: 'Isha Singh',
    passport: 'S54321098',
    itinerary: 'Visiting Tawang Monastery in Arunachal Pradesh.',
    emergencyContact: { name: 'Amit Singh', phone: '+91-555-0105' },
    status: 'Safe',
    lastSeen: '1 hour ago',
    location: { lat: 27.5859, lng: 91.8592 },
    dateAdded: '2023-10-23T16:45:00Z',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d'
  }
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'a1',
    touristId: 't1',
    type: 'SOS',
    description: 'Tourist activated panic button.',
    timestamp: '2023-10-26T12:00:00Z',
    location: 'Garamur, Majuli',
    status: 'Active',
  },
  {
    id: 'a2',
    touristId: 't2',
    type: 'Anomaly',
    description: 'Prolonged stop detected near Double Decker Living Root Bridge.',
    timestamp: '2023-10-25T18:30:00Z',
    location: 'Nongriat Village, Cherrapunji',
    status: 'Resolved',
  },
];


export type HeatmapPoint = [number, number, number]; // [lat, lng, intensity]

export const MOCK_HIGH_RISK_ZONES: HeatmapPoint[] = [
    [26.9, 94.2, 0.8],
    [26.92, 94.21, 0.7],
    [25.3, 91.7, 0.9],
    [25.28, 91.72, 1.0],
    [27.3, 88.6, 0.6],
    [27.34, 88.61, 0.5],
    [26.1, 91.7, 0.9],
    [26.14, 91.73, 1.0]
];
