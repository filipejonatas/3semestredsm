let vogais = "aeiouAEIOU"; 
let contvogal = 0;
let palavra = prompt("Digite a palavra") || "";
var i = 0;

while (i < palavra.length) {
    if (vogais.includes(palavra[i])) { 
        contvogal++;
    }
    i++;
}

let contcons = palavra.length - contvogal;
console.log(`Nº de Vogais: ${contvogal}, Nº de Consoantes: ${contcons}`);
