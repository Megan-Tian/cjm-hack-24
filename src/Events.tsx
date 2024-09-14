import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { events, Event } from './data/eventsData';
import ResumeModal from './components/ResumeModal';

const Events: React.FC = () => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [eventNotes, setEventNotes] = useState<{ [key: string]: string }>({});
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const handleEventClick = (event: Event) => {
    navigate(`/companies/`);
  };

  const handleOpenNotes = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (selectedEvent) {
      setEventNotes({
        ...eventNotes,
        [selectedEvent.id]: e.target.value
      });
    }
  };

  const openResumeModal = () => {
    setIsResumeModalOpen(true);
  };

  const closeResumeModal = () => {
    setIsResumeModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex gap-8 mb-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
          <ul className="space-y-2">
            {events.map((event) => (
              <li key={event.id} className="flex items-center">
                <button
                  onClick={() => handleEventClick(event)}
                  className="flex-grow text-left p-2 rounded hover:bg-gray-100"
                >
                  <div className="font-semibold">{event.name}</div>
                  <div className="text-sm text-gray-600">{event.date}</div>
                </button>
                <button
                  onClick={() => handleOpenNotes(event)}
                  className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Notes
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1">
          {selectedEvent ? (
            <div>
              <h3 className="text-xl font-bold mb-2">{selectedEvent.name}</h3>
              <p className="mb-4">Date: {selectedEvent.date}</p>
              <label htmlFor="eventNotes" className="block mb-2 font-semibold">
                Event Notes:
              </label>
              <textarea
                id="eventNotes"
                value={eventNotes[selectedEvent.id] || ''}
                onChange={handleNoteChange}
                className="w-full h-40 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your notes here..."
              />
            </div>
          ) : (
            <div className="text-gray-500 italic">Select an event to view details and add notes.</div>
          )}
        </div>
      </div>
      <button
        onClick={openResumeModal}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Update Profile
      </button>
      <ResumeModal isOpen={isResumeModalOpen} onClose={closeResumeModal} />
    </div>
  );
};

export default Events;