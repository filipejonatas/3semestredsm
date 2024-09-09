var maior: number = 0, numeros: number[] = [];

for (var i: number = 0; i < 20; i++) {
    numeros[i] = Math.floor(Math.random() * 100 + 1);
    if (numeros[i] > maior) {
        maior = numeros[i]
    }
}
console.log("Maior Numero", maior);