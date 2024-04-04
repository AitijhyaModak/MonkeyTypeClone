export default function Word({ word }) {
  let letters = [];
  for (let i of word) {
    letters.push(i);
  }
  letters.push("");
  return (
    <div>
      {letters.map((i) => (
        <letter>{i}</letter>
      ))}
    </div>
  );
}
