import React, { useState } from 'react';
import { companies, Company } from './data/companiesData';
import Modal from './components/Modal';
import { useNavigate } from 'react-router-dom';

const Companies: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const navigate = useNavigate();

  const openModal = (company: Company) => {
    setSelectedCompany(company);
  };

  const closeModal = () => {
    setSelectedCompany(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate('/events')}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Back to Events
      </button>

      <div className="flex">
        <div className="w-1/2 pr-4">
          <h2 className="text-2xl font-bold mb-4">Companies</h2>
          <ul className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            {companies.map((company) => (
              <li
                key={company.name}
                className="cursor-pointer p-4 border rounded hover:bg-gray-100"
                onClick={() => openModal(company)}
              >
                <h3 className="font-semibold">{company.name}</h3>
                <p className="text-sm text-gray-600">{company.industry}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-1/2 pl-4">
          <h2 className="text-2xl font-bold mb-4">Company Details</h2>
          <div className="h-[calc(100vh-200px)] overflow-y-auto">
            {selectedCompany ? (
              <div>
                <h3 className="text-xl font-semibold">{selectedCompany.name}</h3>
                <p className="mb-2"><strong>Industry:</strong> {selectedCompany.industry}</p>
                <p className="mb-2"><strong>Mission Statement:</strong> {selectedCompany.missionStatement}</p>
              </div>
            ) : (
              <p>Select a company to view details</p>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Companies;