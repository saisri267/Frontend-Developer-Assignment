/**
 * Calculates aggregate totals from the packages array.
 */
export function calculateTotals(packages) {
  const totalPackages = packages.length;

  const totalWeight = packages.reduce((sum, pkg) => {
    const w = parseFloat(pkg.weight) || 0;
    return sum + w;
  }, 0);

  const totalDeclaredValue = packages.reduce((sum, pkg) => {
    const v = parseFloat(pkg.declaredValue) || 0;
    return sum + v;
  }, 0);

  const totalVolume = packages.reduce((sum, pkg) => {
    const l = parseFloat(pkg.length) || 0;
    const w = parseFloat(pkg.width) || 0;
    const h = parseFloat(pkg.height) || 0;
    return sum + l * w * h;
  }, 0);

  return {
    totalPackages,
    totalWeight: parseFloat(totalWeight.toFixed(2)),
    totalDeclaredValue: parseFloat(totalDeclaredValue.toFixed(2)),
    totalVolume: parseFloat(totalVolume.toFixed(2)),
  };
}

/**
 * Formats currency in Indian Rupees.
 */
export function formatCurrency(amount) {
  if (!amount && amount !== 0) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
