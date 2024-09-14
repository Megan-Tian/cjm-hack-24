import React, { useState } from 'react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    school: '',
    graduationYear: '',
    major: '',
    skills: '',
    industries: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form data submission
    console.log('Submitting form data:', formData);
    // After submission logic, close the modal
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Your Experience</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="school" className="block mb-1">What school do you attend?</label>
            <input
              type="text"
              id="school"
              name="school"
              value={formData.school}
              onChange={handleInputChange}
              className="w-full px-2 py-1 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="graduationYear" className="block mb-1">What is your graduation year?</label>
            <select
              id="graduationYear"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleInputChange}
              className="w-full px-2 py-1 border rounded"
            >
              <option value="">Select year</option>
              {[2025, 2026, 2027, 2028].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="major" className="block mb-1">What is your major?</label>
            <input
              type="text"
              id="major"
              name="major"
              value={formData.major}
              onChange={handleInputChange}
              className="w-full px-2 py-1 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="skills" className="block mb-1">What are your skills?</label>
            <textarea
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              className="w-full px-2 py-1 border rounded h-24"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="industries" className="block mb-1">What industries are you interested in?</label>
            <textarea
              id="industries"
              name="industries"
              value={formData.industries}
              onChange={handleInputChange}
              className="w-full px-2 py-1 border rounded h-24"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResumeModal;