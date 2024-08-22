let fahrenheit = parseInt(prompt("Digite a temperatura em Fahrenheit:"));
if (isNaN(fahrenheit)) {
    console.log("valor inválido");
} else {
    let celsius = (((fahrenheit - 32) / 9) * 5)
    console.log("Temp em Celsius:", celsius)
}
