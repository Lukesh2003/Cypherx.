
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
  safeScore: number;
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
    location: { lat: 26.9138, lng: 94.2237 }, // Majuli
    safeScore: 78,
    dateAdded: '2023-10-26T10:00:00Z',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
  },
  {
    id: 't2',
    name: 'Arjun Gupta',
    passport: 'G87654321',
    aadhaar: '2345 6789 0123',
    drivingLicense: 'DL1520120023456',
    itinerary: 'Visiting the living root bridges in Cherrapunji, Meghalaya.',
    emergencyContact: { name: 'Sunita Gupta', phone: '+91-555-0102' },
    status: 'Safe',
    lastSeen: '15 minutes ago',
    location: { lat: 25.2709, lng: 91.7323 }, // Cherrapunji
    safeScore: 92,
    dateAdded: '2023-10-26T11:30:00Z',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  },
  {
    id: 't3',
    name: 'Ananya Reddy',
    passport: 'R24681357',
    aadhaar: '3456 7890 1234',
    drivingLicense: 'DL1620130034567',
    itinerary: 'Enjoying the views of Kanchenjunga from Gangtok, Sikkim.',
    emergencyContact: { name: 'Vijay Reddy', phone: '+91-555-0103' },
    status: 'Safe',
    lastSeen: '45 minutes ago',
    location: { lat: 27.3389, lng: 88.6065 }, // Gangtok
    safeScore: 85,
    dateAdded: '2023-10-25T14:00:00Z',
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
  },
  {
    id: 't4',
    name: 'Rohan Mehra',
    passport: 'M78901234',
    aadhaar: '4567 8901 2345',
    drivingLicense: 'DL1720140045678',
    itinerary: 'Trekking in Dzukou Valley, Nagaland.',
    emergencyContact: { name: 'Kavita Mehra', phone: '+91-555-0104' },
    status: 'Safe',
    lastSeen: '3 hours ago',
    location: { lat: 25.6163, lng: 94.1186 }, // Dzukou Valley
    safeScore: 88,
    dateAdded: '2023-10-24T09:00:00Z',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d'
  },
  {
    id: 't5',
    name: 'Isha Singh',
    passport: 'S54321098',
    aadhaar: '5678 9012 3456',
    drivingLicense: 'DL1820150056789',
    itinerary: 'Visiting Tawang Monastery in Arunachal Pradesh.',
    emergencyContact: { name: 'Amit Singh', phone: '+91-555-0105' },
    status: 'Safe',
    lastSeen: '1 hour ago',
    location: { lat: 27.5859, lng: 91.8592 }, // Tawang
    safeScore: 95,
    dateAdded: '2023-10-23T16:45:00Z',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d'
  },
  {
    id: 't6',
    name: 'Vikram Bose',
    passport: 'B98765432',
    aadhaar: '6789 0123 4567',
    drivingLicense: 'DL1920160067890',
    itinerary: 'Exploring Kaziranga National Park, Assam.',
    emergencyContact: { name: 'Nisha Bose', phone: '+91-555-0106' },
    status: 'Safe',
    lastSeen: '30 minutes ago',
    location: { lat: 26.5822, lng: 93.3644 }, // Kaziranga
    safeScore: 82,
    dateAdded: '2023-10-27T08:00:00Z',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
  },
  {
    id: 't7',
    name: 'Meera Krishnan',
    passport: 'K13579246',
    aadhaar: '7890 1234 5678',
    drivingLicense: 'DL2020170078901',
    itinerary: 'Boating on Umiam Lake, Meghalaya.',
    emergencyContact: { name: 'Suresh Krishnan', phone: '+91-555-0107' },
    status: 'Safe',
    lastSeen: '1 hour ago',
    location: { lat: 25.673, lng: 91.905 }, // Umiam Lake
    safeScore: 90,
    dateAdded: '2023-10-27T09:15:00Z',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708e',
  },
  {
    id: 't8',
    name: 'Siddharth Patel',
    passport: 'P65432109',
    aadhaar: '8901 2345 6789',
    drivingLicense: 'DL2120180089012',
    itinerary: 'Visiting the Kamakhya Temple in Guwahati, Assam.',
    emergencyContact: { name: 'Pooja Patel', phone: '+91-555-0108' },
    status: 'Safe',
    lastSeen: '5 hours ago',
    location: { lat: 26.1664, lng: 91.7056 },
    safeScore: 75,
    dateAdded: '2023-10-22T11:00:00Z',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026709f',
  },
  {
    id: 't9',
    name: 'Aditi Sharma',
    passport: 'S11223344',
    aadhaar: '9012 3456 7890',
    drivingLicense: 'DL2220190090123',
    itinerary: 'Exploring the serene town of Ziro, Arunachal Pradesh.',
    emergencyContact: { name: 'Rajesh Sharma', phone: '+91-555-0109' },
    status: 'Safe',
    lastSeen: '2 days ago',
    location: { lat: 27.6335, lng: 93.8324 },
    safeScore: 98,
    dateAdded: '2023-10-21T18:00:00Z',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026710a',
  },
  {
    id: 't10',
    name: 'Karan Malhotra',
    passport: 'M55667788',
    aadhaar: '0123 4567 8901',
    drivingLicense: 'DL2320200101234',
    itinerary: 'Visiting the Neermahal palace in Tripura.',
    emergencyContact: { name: 'Anjali Malhotra', phone: '+91-555-0110' },
    status: 'Safe',
    lastSeen: '1 day ago',
    location: { lat: 23.4939, lng: 91.3155 },
    safeScore: 80,
    dateAdded: '2023-10-20T12:30:00Z',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026711b',
  },
   {
    id: 't11',
    name: 'Neha Desai',
    passport: 'D99887766',
    aadhaar: '1122 3344 5566',
    drivingLicense: 'DL2420210112233',
    itinerary: 'Trekking to the Phawngpui Blue Mountain in Mizoram.',
    emergencyContact: { name: 'Rahul Desai', phone: '+91-555-0111' },
    status: 'Safe',
    lastSeen: '6 hours ago',
    location: { lat: 22.628, lng: 93.0485 },
    safeScore: 89,
    dateAdded: '2023-10-28T06:00:00Z',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026712c'
  },
  {
    id: 't12',
    name: 'Raj Verma',
    passport: 'V55443322',
    aadhaar: '2233 4455 6677',
    drivingLicense: 'DL2520220122334',
    itinerary: 'Exploring the ancient ruins of Unakoti, Tripura.',
    emergencyContact: { name: 'Priya Verma', phone: '+91-555-0112' },
    status: 'Safe',
    lastSeen: '4 hours ago',
    location: { lat: 24.0818, lng: 92.0163 },
    safeScore: 84,
    dateAdded: '2023-10-28T09:30:00Z',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026713d'
  },
  {
    id: 't13',
    name: 'Sonia Agarwal',
    passport: 'A11122334',
    aadhaar: '3344 5566 7788',
    drivingLicense: 'DL2620230133445',
    itinerary: 'Exploring the beauty of Shillong, Meghalaya.',
    emergencyContact: { name: 'Ravi Agarwal', phone: '+91-555-0113' },
    status: 'Safe',
    lastSeen: 'Just now',
    location: { lat: 25.5788, lng: 91.8933 },
    safeScore: 91,
    dateAdded: '2023-10-29T10:00:00Z',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026714e'
  },
  {
    id: 't14',
    name: 'Deepak Kumar',
    passport: 'K22233445',
    aadhaar: '4455 6677 8899',
    drivingLicense: 'DL2720240144556',
    itinerary: 'Visiting Loktak Lake in Manipur.',
    emergencyContact: { name: 'Sneha Kumar', phone: '+91-555-0114' },
    status: 'Safe',
    lastSeen: '2 hours ago',
    location: { lat: 24.553, lng: 93.7749 },
    safeScore: 86,
    dateAdded: '2023-10-29T11:00:00Z',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026715f'
  },
  {
    id: 't15',
    name: 'Alisha Das',
    passport: 'D33344556',
    aadhaar: '5566 7788 9900',
    drivingLicense: 'DL2820250155667',
    itinerary: 'Bird watching in Keibul Lamjao National Park, Manipur.',
    emergencyContact: { name: 'Ankit Das', phone: '+91-555-0115' },
    status: 'Safe',
    lastSeen: '3 hours ago',
    location: { lat: 24.498, lng: 93.7556 },
    safeScore: 88,
    dateAdded: '2023-10-29T12:00:00Z',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026716g'
  },
  {
    id: 't16',
    name: 'Manish Choudhary',
    passport: 'C44455667',
    aadhaar: '6677 8899 0011',
    drivingLicense: 'DL2920260166778',
    itinerary: 'Exploring the capital city of Aizawl, Mizoram.',
    emergencyContact: { name: 'Pooja Choudhary', phone: '+91-555-0116' },
    status: 'Safe',
    lastSeen: '4 hours ago',
    location: { lat: 23.7271, lng: 92.7176 },
    safeScore: 83,
    dateAdded: '2023-10-29T13:00:00Z',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026717h'
  },
  {
    id: 't17',
    name: 'Priyanka Naik',
    passport: 'N55566778',
    aadhaar: '7788 9900 1122',
    drivingLicense: 'DL3020270177889',
    itinerary: 'Visiting the historic city of Agartala, Tripura.',
    emergencyContact: { name: 'Sameer Naik', phone: '+91-555-0117' },
    status: 'Safe',
    lastSeen: '5 hours ago',
    location: { lat: 23.8315, lng: 91.2868 },
    safeScore: 81,
    dateAdded: '2023-10-29T14:00:00Z',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026718i'
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
