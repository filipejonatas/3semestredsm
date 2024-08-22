let idade = parseInt(prompt("digite a idade em anos:"));
let mes = parseInt(prompt("digite a idade em meses:"));
let dias = parseInt(prompt("digite a quantidade de dias"));

if (isNaN(idade) && isNaN(mes) && isNaN(dias)){
    console.log("insira numeros validos");
} else {
    let idadedias = (idade*365) + (mes*30) + dias;
    console.log("Idade em dias",idadedias);

}