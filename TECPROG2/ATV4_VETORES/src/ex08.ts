var v1: number[] = [];

for (var i = 0; i < 20; i++) {
    const num1 = Math.floor(Math.random() * 100 + 1);
    v1.push(num1);
}

v1.sort((a, b) => a - b);

console.log("Vetor Ordenado:", v1);