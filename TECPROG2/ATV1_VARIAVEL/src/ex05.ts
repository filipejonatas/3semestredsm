let l1 = parseInt(prompt("digite o 1º lado"));
let l2 = parseInt(prompt("digite o 2º lado"))


if (isNaN(l1) || isNaN(l2)) {
    console.log("insira numeros válidos")
} else {
    let base = l1 * l2;
    console.log("Area:", base);
}