import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Events from './Events';
import Companies from './Companies';

const App: React.FC = () => {
  return (
    <div className="container mx-auto"> 
      <Router>
        <Routes>
          <Route path="/" element={<Events />} />
          <Route path="/events/" element={<Events />} />
          <Route path="/companies/" element={<Companies />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
