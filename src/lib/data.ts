export type Tourist = {
  id: string;
  name: string;
  passport: string;
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
  id: string;
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
    name: 'Alice Johnson',
    passport: 'A12345678',
    itinerary: 'Mountain trail hike, visiting waterfall.',
    emergencyContact: { name: 'Bob Johnson', phone: '+1-555-0101' },
    status: 'Alert',
    lastSeen: '2 hours ago',
    location: { lat: 34.0522, lng: -118.2437 },
    dateAdded: '2023-10-26T10:00:00Z',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
  },
  {
    id: 't2',
    name: 'Carlos Gomez',
    passport: 'B87654321',
    itinerary: 'City tour and museum visit.',
    emergencyContact: { name: 'Maria Gomez', phone: '+34-555-0102' },
    status: 'Safe',
    lastSeen: '15 minutes ago',
    location: { lat: 34.055, lng: -118.25 },
    dateAdded: '2023-10-26T11:30:00Z',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  },
  {
    id: 't3',
    name: 'Li Wei',
    passport: 'C24681357',
    itinerary: 'Beach relaxation and surfing lesson.',
    emergencyContact: { name: 'Li Fen', phone: '+86-555-0103' },
    status: 'Safe',
    lastSeen: '45 minutes ago',
    location: { lat: 34.049, lng: -118.24 },
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
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    location: 'Mountain Trail, Sector 4',
    status: 'Active',
  },
  {
    id: 'a2',
    touristId: 't2',
    type: 'Anomaly',
    description: 'Prolonged stop detected.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    location: 'Downtown Crossing',
    status: 'Resolved',
  },
];
