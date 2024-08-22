let idade = prompt("digite sua idade:");
let idadenum = parseInt(idade as string);

if (idadenum <= 10) {
    console.log("Criança");
} else if (idadenum >= 11 && idadenum <= 13) {
    console.log("Pre-Adolescente");
} else if (idadenum >= 14 && idadenum <= 17) {
    console.log("Adolescente");
} else if (idadenum >= 18 && idadenum <= 59) {
    console.log("Adulto");
} else {
    console.log("Idoso");
}
