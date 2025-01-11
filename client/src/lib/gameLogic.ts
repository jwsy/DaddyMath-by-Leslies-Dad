export function generateProblem() {
  const a = Math.floor(Math.random() * 6) + 1; // 1 to 6
  const b = Math.floor(Math.random() * (10 - a)) + 1; // Ensure sum <= 10
  return {
    a,
    b,
    sum: a + b
  };
}
