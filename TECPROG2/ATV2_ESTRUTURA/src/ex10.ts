let nome = prompt("informe o nome do funcionario:");
let categoria = prompt("informe a categoria de A-Z").toUpperCase();
let salario = parseFloat(prompt("informe o salario"));

if (isNaN(salario)) {
    console.log("Insira um valor valido")
} else {
    let percentualreajuste;
    switch (categoria) {
        case 'A':
        case 'C':
        case 'F':
        case 'H':
            percentualreajuste = 10;
            break;
        case 'B':
        case 'D':
        case 'E':
        case 'I':
        case 'J':
        case 'T':
            percentualreajuste = 15;
            break;
        case 'K':
        case 'R':
            percentualreajuste = 25;
            break;
        case 'L':
        case 'M':
        case 'N':
        case 'O':
        case 'P':
        case 'Q':
        case 'S':
            percentualreajuste = 35;
            break;
        case 'U':
        case 'V':
        case 'X':
        case 'Y':
        case 'W':
        case 'Z':
            percentualreajuste = 50;
            break;
        default:
            console.log("Categoria inválida.");
            percentualreajuste = 0;
            break;
    }

    if (percentualreajuste > 0) {
        let valorReajuste = (salario * percentualreajuste) / 100;
        let salarioReajustado = salario + valorReajuste;

        console.log(`Nome: ${nome}`);
        console.log(`Categoria: ${categoria}`);
        console.log(`Salário original: R$ ${salario}`);
        console.log(`Percentual de reajuste: ${percentualreajuste}%`);
        console.log(`Salário reajustado: R$ ${salarioReajustado}`)
    }
}
