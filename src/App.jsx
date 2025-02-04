import React, { useState } from 'react';
import NPKCalculator from './components/NPKCalculator';
import AmendmentDatabase from './components/AmendmentDatabase';
import { calculateTotalNPK } from './utils/calculations';
import { Bars3Icon } from '@heroicons/react/24/outline';

function App() {
  const [amendments, setAmendments] = useState([]);
  const [totalNPK, setTotalNPK] = useState({ N: 0, P: 0, K: 0 });
  const [activeTab, setActiveTab] = useState('calculator');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAddAmendment = (amendment) => {
    setAmendments([...amendments, amendment]);
    const newTotalNPK = calculateTotalNPK([...amendments, amendment]);
    setTotalNPK(newTotalNPK);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Side Navigation */}
      <div className={`fixed inset-y-0 left-0 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out z-20`}>
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Menu</h2>
          <nav className="space-y-2">
            <button
              onClick={() => handleTabChange('calculator')}
              className={`w-full text-left px-4 py-2 rounded-md ${
                activeTab === 'calculator'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              NPK Calculator
            </button>
            <button
              onClick={() => handleTabChange('database')}
              className={`w-full text-left px-4 py-2 rounded-md ${
                activeTab === 'database'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Amendment Database
            </button>
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="min-h-screen">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Fertilizer Blend Calculator
            </h1>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              {activeTab === 'calculator' ? (
                <NPKCalculator 
                  onAddAmendment={handleAddAmendment}
                  amendments={amendments}
                  totalNPK={totalNPK}
                />
              ) : (
                <AmendmentDatabase />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;