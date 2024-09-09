var v1: number[] = [];
var maior = 0;
var menor: number | undefined;

for (var i = 0; i < 30; i++) {
    const num1 = Math.floor(Math.random() * 100 + 1);
    v1.push(num1);

    if (i === 0 || num1 < menor!) {
        menor = num1;
    }
    if (num1 > maior) {
        maior = num1;
    }
}
console.log("vetor", v1);
console.log("Menor ", menor);
console.log("Maior", maior);