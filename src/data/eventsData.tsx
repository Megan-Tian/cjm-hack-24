export interface Event {
    id: string;
    name: string;
    date: string;
  }
  
  export const events: Event[] = [
    { id: '1', name: 'Tech Conference 2024', date: '2024-03-15' },
    { id: '2', name: 'AI Symposium', date: '2024-04-22' },
    { id: '3', name: 'Startup Networking Event', date: '2024-05-10' },
    { id: '4', name: 'Cybersecurity Workshop', date: '2024-06-05' },
    { id: '5', name: 'Data Science Hackathon', date: '2024-07-18' },
  ];