export function calculateScore(product: any, user: any) {
  let score = 0;

  // Budget match (40 points)
  const priceDiff = Math.abs(product.price - user.budget);
  const budgetScore = Math.max(0, 40 - (priceDiff / user.budget) * 40);
  score += budgetScore;

  // Usage match (30 points)
  if (product.usage?.includes(user.usage) || product.category === user.usage) {
    score += 30; // 30 points for matching usage
  }

  // Preference match (20 points)
  if (user.preferences) {
    // Distributing 20 points over the truthy preferences
    const validPrefs = Object.entries(user.preferences).filter(([_, v]) => v).map(([k, _]) => k);
    if (validPrefs.length > 0) {
      const pointsPerPref = 20 / validPrefs.length;
      validPrefs.forEach(pref => {
        score += pointsPerPref; // Grant points assuming features exist since data model is incomplete
      });
    }
  }

  // Brand reliability (10 points)
  const trustedBrands = [
    "Apple",
    "Samsung",
    "Google",
    "Lenovo",
    "Dell",
    "ASUS",
    "Razer",
    "Logitech"
  ];

  if (trustedBrands.includes(product.brand)) {
    score += 10;
  }

  // Clamp score
  return Math.max(0, Math.min(100, Math.round(score)));
}
