import React, { useState, useEffect } from 'react';
import { commonAmendments, getCustomAmendments } from '../utils/amendmentData';

function AmendmentSearch({ onSelect }) {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [customAmendments, setCustomAmendments] = useState([]);

  useEffect(() => {
    setCustomAmendments(getCustomAmendments());
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length > 0) {
      const allAmendments = [...commonAmendments, ...customAmendments];
      const filtered = allAmendments.filter(amendment =>
        amendment.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (amendment) => {
    onSelect(amendment);
    setSearch('');
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Search Amendments
      </label>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Type to search amendments..."
      />
      
      {suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200">
          <ul className="max-h-60 overflow-auto py-1">
            {suggestions.map((amendment, index) => (
              <li
                key={amendment.id || index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(amendment)}
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
  );
}

export default AmendmentSearch;