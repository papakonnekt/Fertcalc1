import React, { useState } from 'react';
import NPKInput from './NPKInput';
import AmendmentList from './AmendmentList';
import { commonAmendments, getCustomAmendments } from '../utils/amendmentData';

function NPKCalculator({ onAddAmendment, amendments, totalNPK }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('grams');
  const [npkValues, setNPKValues] = useState({ N: 0, P: 0, K: 0 });
  const [suggestions, setSuggestions] = useState([]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);

    if (value.length > 0) {
      const allAmendments = [...commonAmendments, ...getCustomAmendments()];
      const filtered = allAmendments.filter(amendment =>
        amendment.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (amendment) => {
    setName(amendment.name);
    setNPKValues({
      N: amendment.N,
      P: amendment.P,
      K: amendment.K
    });
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount || amount <= 0) return;

    const amendment = {
      id: Date.now(),
      name,
      amount: parseFloat(amount),
      unit,
      ...npkValues
    };

    onAddAmendment(amendment);
    
    // Reset form
    setName('');
    setAmount('');
    setNPKValues({ N: 0, P: 0, K: 0 });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">
            Amendment Name
          </label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter amendment name"
          />
          {suggestions.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200">
              <ul className="max-h-60 overflow-auto py-1">
                {suggestions.map((amendment, index) => (
                  <li
                    key={amendment.id || index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectSuggestion(amendment)}
                  >
                    <div className="font-medium">{amendment.name}</div>
                    <div className="text-sm text-gray-500">
                      N: {amendment.N}% - P: {amendment.P}% - K: {amendment.K}%
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter amount"
              min="0"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Unit
            </label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="grams">Grams</option>
              <option value="pounds">Pounds</option>
              <option value="cups">Cups</option>
            </select>
          </div>
        </div>

        <NPKInput 
          values={npkValues}
          onChange={setNPKValues}
        />

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Amendment
        </button>
      </form>

      <div className="mt-8">
        <AmendmentList amendments={amendments} totalNPK={totalNPK} />
      </div>
    </div>
  );
}

export default NPKCalculator;