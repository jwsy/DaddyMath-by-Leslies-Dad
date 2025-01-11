export function generateProblem() {
  const a = Math.floor(Math.random() * 11); // 0 to 10
  const b = Math.floor(Math.random() * 11); // 0 to 10
  return {
    a,
    b,
    sum: a + b
  };
}