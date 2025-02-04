import React from 'react';

function AmendmentList({ amendments, totalNPK }) {
  if (amendments.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Current Blend</h2>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Total NPK Ratio</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-green-100 p-2 rounded">
            <span className="block text-sm text-gray-500">N</span>
            <span className="text-lg font-medium text-gray-900">{totalNPK.N.toFixed(1)}%</span>
          </div>
          <div className="bg-blue-100 p-2 rounded">
            <span className="block text-sm text-gray-500">P</span>
            <span className="text-lg font-medium text-gray-900">{totalNPK.P.toFixed(1)}%</span>
          </div>
          <div className="bg-purple-100 p-2 rounded">
            <span className="block text-sm text-gray-500">K</span>
            <span className="text-lg font-medium text-gray-900">{totalNPK.K.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Amendment</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">N-P-K</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {amendments.map((amendment) => (
              <tr key={amendment.id}>
                <td className="py-4 pl-4 pr-3 text-sm text-gray-900">
                  {amendment.name}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {amendment.amount} {amendment.unit}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {amendment.N}-{amendment.P}-{amendment.K}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AmendmentList