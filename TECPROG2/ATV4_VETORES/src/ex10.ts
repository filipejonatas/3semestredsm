var matrix: number[][] = [];
let tamanho: number = parseInt(prompt("Digite a quantidade de elementos:"));
var matrixSomada: number[][] = [];

for (let i = 0; i < tamanho; i++) {
    const linha: number[] = [];
    for (let j = 0; j < tamanho; j++) {
        const aleatorio = Math.floor(Math.random() * 100);
        linha.push(aleatorio);
    }
    matrix.push(linha);
}

for (let i = 0; i < tamanho; i++) {
    const linhaSomada: number[] = [];
    for (let j = 0; j < tamanho; j++) {
        const soma = matrix[i][j] + matrix[0][j];
        linhaSomada.push(soma);
    }
    matrixSomada.push(linhaSomada);
}

console.log("Matriz Original:");
console.table(matrix);

console.log("Matriz Somada:");
console.table(matrixSomada);