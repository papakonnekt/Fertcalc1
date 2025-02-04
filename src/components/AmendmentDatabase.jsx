import React, { useState, useEffect } from 'react';
import { commonAmendments, getCustomAmendments, saveCustomAmendment, deleteCustomAmendment } from '../utils/amendmentData';

function AmendmentDatabase() {
  const [customAmendments, setCustomAmendments] = useState([]);
  const [newAmendment, setNewAmendment] = useState({ name: '', N: 0, P: 0, K: 0 });

  useEffect(() => {
    setCustomAmendments(getCustomAmendments());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = saveCustomAmendment(newAmendment);
    setCustomAmendments(updated);
    setNewAmendment({ name: '', N: 0, P: 0, K: 0 });
  };

  const handleDelete = (id) => {
    const updated = deleteCustomAmendment(id);
    setCustomAmendments(updated);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Common Amendments</h2>
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">N</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">P</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">K</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {commonAmendments.map((amendment, index) => (
                <tr key={index}>
                  <td className="py-4 pl-4 pr-3 text-sm text-gray-900">{amendment.name}</td>
                  <td className="px-3 py-4 text-sm text-gray-500">{amendment.N}%</td>
                  <td className="px-3 py-4 text-sm text-gray-500">{amendment.P}%</td>
                  <td className="px-3 py-4 text-sm text-gray-500">{amendment.K}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Custom Amendments</h2>
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">N</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">P</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">K</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {customAmendments.map((amendment) => (
                <tr key={amendment.id}>
                  <td className="py-4 pl-4 pr-3 text-sm text-gray-900">{amendment.name}</td>
                  <td className="px-3 py-4 text-sm text-gray-500">{amendment.N}%</td>
                  <td className="px-3 py-4 text-sm text-gray-500">{amendment.P}%</td>
                  <td className="px-3 py-4 text-sm text-gray-500">{amendment.K}%</td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    <button
                      onClick={() => handleDelete(amendment.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Add Custom Amendment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={newAmendment.name}
              onChange={(e) => setNewAmendment({ ...newAmendment, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {['N', 'P', 'K'].map((nutrient) => (
              <div key={nutrient}>
                <label className="block text-sm font-medium text-gray-700">{nutrient} (%)</label>
                <input
                  type="number"
                  value={newAmendment[nutrient]}
                  onChange={(e) => setNewAmendment({ ...newAmendment, [nutrient]: parseFloat(e.target.value) || 0 })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  min="0"
                  max="100"
                  step="0.1"
                  required
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Amendment
          </button>
        </form>
      </div>
    </div>
  );
}

export default AmendmentDatabase;