let x = prompt("digite o lado 1 :");
let y = prompt("digite o lado 2 :");
let z = prompt("digite o lado 3 :");

if (isNaN(x) || isNaN(y) || isNaN(z)) {
    console.log("Numeros inválidos");
} else {
    if (x == y && x == z) {
        console.log("triangulo equilátero")
    } else {
        if (x == y || x == z) {
            console.log("triangulo isoceles")
        } else {
            console.log("triangulo escaleno")
        }
    }
}