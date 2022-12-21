function StringChange(value) {
  return (
    value.split("").map((c) => (
      c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()
    )).sort(() => Math.random() - 0.5).join("")
  );
}

console.log(StringChange('teSTsTRing'));
