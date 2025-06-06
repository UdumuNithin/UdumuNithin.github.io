import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { HomeIcon, CloudUploadIcon, PencilIcon } from '@heroicons/react/24/outline';

// Import pages
import Home from './pages/Home';
import Upload from './pages/Upload';
import Writings from './pages/Writings';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <h1 className="text-xl font-semibold text-primary-600">Mental Health Awareness</h1>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <NavLink to="/" icon={<HomeIcon className="h-5 w-5" />} text="Home" />
                  <NavLink to="/upload" icon={<CloudUploadIcon className="h-5 w-5" />} text="Upload" />
                  <NavLink to="/writings" icon={<PencilIcon className="h-5 w-5" />} text="Writings" />
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/writings" element={<Writings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function NavLink({ to, icon, text }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-primary-600 hover:border-primary-500 transition-colors duration-200"
    >
      {icon}
      <span className="ml-2">{text}</span>
    </Link>
  );
}

export default App; 