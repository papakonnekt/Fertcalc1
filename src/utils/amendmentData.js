// Common fertilizer amendments database
export const commonAmendments = [
  { name: "Blood Meal", N: 12, P: 0, K: 0 },
  { name: "Bone Meal", N: 3, P: 15, K: 0 },
  { name: "Fish Meal", N: 10, P: 4, K: 0 },
  { name: "Kelp Meal", N: 1, P: 0.5, K: 2.5 },
  { name: "Alfalfa Meal", N: 2.5, P: 0.5, K: 2 },
  { name: "Down to Earth All Purpose", N: 4, P: 4, K: 4 },
  { name: "Bat Guano", N: 7, P: 3, K: 1 },
  { name: "Chicken Manure", N: 4, P: 3, K: 3 },
  { name: "Worm Castings", N: 2, P: 1, K: 1 }
];

// Local storage key for custom amendments
const CUSTOM_AMENDMENTS_KEY = 'customAmendments';

// Get custom amendments from localStorage
export function getCustomAmendments() {
  const stored = localStorage.getItem(CUSTOM_AMENDMENTS_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Save custom amendment
export function saveCustomAmendment(amendment) {
  const customs = getCustomAmendments();
  customs.push({ ...amendment, id: Date.now() });
  localStorage.setItem(CUSTOM_AMENDMENTS_KEY, JSON.stringify(customs));
  return customs;
}

// Delete custom amendment
export function deleteCustomAmendment(id) {
  const customs = getCustomAmendments();
  const updated = customs.filter(a => a.id !== id);
  localStorage.setItem(CUSTOM_AMENDMENTS_KEY, JSON.stringify(updated));
  return updated;
}