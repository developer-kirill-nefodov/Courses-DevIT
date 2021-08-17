function StringChange(value: string): string {
    return (
        value.split("").map((c) => {
                return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
            }
        ).sort().join("")
    );
}

console.log(StringChange('teSTsTRing')); //EGINSTrstt