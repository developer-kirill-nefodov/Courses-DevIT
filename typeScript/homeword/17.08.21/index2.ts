function StringChange(value: string): string {
    return (
        value.split("").map((c) => {
                return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
            }
        ).sort(() => Math.random() - 0.5).join("")
    );
}

console.log(StringChange('teSTsTRing'));