import React, { useState } from 'react';
import { companies, Company } from './data/companiesData';
import Modal from './components/Modal';

const Companies: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const openModal = (company: Company) => {
    setSelectedCompany(company);
  };

  const closeModal = () => {
    setSelectedCompany(null);
  };

  return (
    <div className="flex gap-8">
      <div className="flex-1">
        <p className="mb-4">Here's a list of companies we think you would be interested in. Click on a company to learn more.</p>
        <ul className="space-y-2">
          {companies.map((company) => (
            <li key={company.name}>
              <button 
                onClick={() => openModal(company)}
                className="text-left hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
              >
                {company.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1">
        {selectedCompany ? (
          <Modal isOpen={true} onClose={closeModal}>
            <h2 className="text-xl font-bold mb-4">{selectedCompany.name}</h2>
            <p className="mb-2"><strong>Industry:</strong> {selectedCompany.industry}</p>
            <p><strong>Mission Statement:</strong> {selectedCompany.missionStatement}</p>
          </Modal>
        ) : (
          <div className="bg-gray-100 p-6 rounded-lg h-full flex items-center justify-center text-gray-500">
            Select a company to learn more.
          </div>
        )}
      </div>
    </div>
  );
};

export default Companies;