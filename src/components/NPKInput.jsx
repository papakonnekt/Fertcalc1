import React from 'react';

function NPKInput({ values, onChange }) {
  const handleChange = (nutrient, value) => {
    onChange({
      ...values,
      [nutrient]: parseFloat(value) || 0
    });
  };

  const handleKeyPress = (e, nutrient) => {
    if (e.key === 'Enter') {
      const nextNutrient = {
        N: 'P',
        P: 'K',
        K: 'N'
      }[nutrient];
      
      const nextInput = document.querySelector(`input[name="${nextNutrient}"]`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">NPK Values (%)</h3>
      
      <div className="grid grid-cols-3 gap-4">
        {['N', 'P', 'K'].map((nutrient) => (
          <div key={nutrient}>
            <label className="block text-sm font-medium text-gray-700">
              {nutrient}
            </label>
            <div className="mt-1">
              <input
                type="number"
                name={nutrient}
                value={values[nutrient]}
                onChange={(e) => handleChange(nutrient, e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, nutrient)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                min="0"
                max="100"
                step="0.1"
              />
              <input
                type="range"
                value={values[nutrient]}
                onChange={(e) => handleChange(nutrient, e.target.value)}
                className="mt-2 w-full"
                min="0"
                max="50"
                step="0.1"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NPKInput