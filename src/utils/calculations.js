export function calculateTotalNPK(amendments) {
  if (amendments.length === 0) {
    return { N: 0, P: 0, K: 0 };
  }

  // Calculate total weight and nutrient weights
  let totalWeight = 0;
  let totalN = 0;
  let totalP = 0;
  let totalK = 0;

  amendments.forEach(amendment => {
    // Convert all weights to grams for consistent calculation
    const weightInGrams = convertToGrams(amendment.amount, amendment.unit);
    totalWeight += weightInGrams;

    // Calculate the weight of each nutrient
    // Convert percentage to decimal (e.g., 5% = 0.05) and multiply by weight
    totalN += (amendment.N / 100) * weightInGrams;
    totalP += (amendment.P / 100) * weightInGrams;
    totalK += (amendment.K / 100) * weightInGrams;
  });

  // Convert back to percentages based on total weight
  return {
    N: (totalN / totalWeight) * 100,
    P: (totalP / totalWeight) * 100,
    K: (totalK / totalWeight) * 100
  };
}

function convertToGrams(amount, unit) {
  switch (unit.toLowerCase()) {
    case 'pounds':
      return amount * 453.592; // 1 pound = 453.592 grams
    case 'cups':
      return amount * 236.588; // 1 cup ≈ 236.588 grams (assuming water density)
    case 'grams':
    default:
      return amount;
  }
}