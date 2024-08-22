let input = prompt("Digite o número");

if (input !== null && !isNaN(parseInt(input))) {
    let n = parseInt(input);
    console.log("Antecessor:", n - 1);
    console.log("Sucessor:", n + 1);
} else {
    console.log("Entrada inválida. Por favor, insira um número.");
}
