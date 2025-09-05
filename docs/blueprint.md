# **App Name**: Cypherx Shield

## Core Features:

- Tourist Onboarding: Collect tourist details (Name, Passport, Itinerary, Emergency Contacts) via a simple web form.
- Digital Tourist ID: Generate a secure, unique ID valid only for the trip duration.
- Panic Button (SOS): Instantly alert emergency contacts and authorities with live location.
- Location Tracking: Show the tourist’s real-time position on Google Maps (opt-in).
- AI Anomaly Detection: Detect unusual patterns like sudden drop-offs, no movement, or route deviations; tool trigger auto-alerts.
- Multilingual Support: Translate alerts and the app UI using Gemini API for international tourists.
- Emergency FIR Generation: Auto-create a dummy FIR report if a tourist goes missing, to save response time.
- Incident Dashboard: A web dashboard for police/forest/park authorities to monitor registered tourists, live locations, and SOS & anomaly alerts.
- Incident Logging: Maintain a history of alerts, FIR drafts, and resolved cases.
- Automated Notifications: Send SMS/Email/WhatsApp alerts to both emergency contacts and nearest authorities via integrations (e.g., Twilio).
- Offline-First Design: Cache data locally when offline and auto-sync once reconnected.
- Connectivity Fallbacks: Use LoRaWAN or mesh networking for forests/caves, and standard networks when available.
- Resilient Location Updates: Prioritize GPS but fall back to last-known location if network fails.

## Style Guidelines:

- Primary color – Light Sea Green `#20B2AA` (calm & safety).
- Background color – Very Light Green `#F5FFFA` (secure & fresh).
- Accent color – Blue-Green `#7FFFD4` (interactive vibrancy).
- Font – “PT Sans” for both body and headlines.
- Clear, recognizable icons for navigation & alerts.
- Mobile-first responsive design.
- Subtle animations for state changes & confirmations (SOS pressed, ID generated, alert sent).