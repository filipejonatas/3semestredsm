let numeros = [];
let count = 0;

while (count<11){
    let atual = parseInt(prompt('Digite um numero entre 1 e 100:'));
    
    if(isNaN(atual)|| atual<1 || atual >100){
        console.log("Numero invalido")
    } else{
        numeros.push(atual);
        count++
    }
}
