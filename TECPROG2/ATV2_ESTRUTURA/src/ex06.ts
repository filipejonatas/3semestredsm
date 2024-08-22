
let salarioAtual = parseFloat(prompt("Digite o valor do seu salário mensal atual:"));

if (isNaN(salarioAtual)) {
    console.log("Por favor, insira um valor de salário válido.");
} else {

    let percentualReajuste;

    if (salarioAtual <= 650) {
        percentualReajuste = 10;
    } else {
        percentualReajuste = 5;
    }

    let valorReajuste = (salarioAtual * percentualReajuste) / 100;
    let salarioAtualizado = salarioAtual + valorReajuste;

    console.log(`Salário original: R$ ${salarioAtual}`);
    console.log(`Percentual de reajuste: ${percentualReajuste}%`);
    console.log(`Salário atualizado: R$ ${salarioAtualizado}`);
}
