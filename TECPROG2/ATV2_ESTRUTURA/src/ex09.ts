let mes = parseInt(prompt("digite o mes do ano"));

if (isNaN(mes) || mes < 1 || mes > 12) {
    console.log("insira um mes valido")
} else {
    switch (mes) {
        case 1:
            console.log("O mês é: Janeiro");
            break;
        case 2:
            console.log("O mês é: Fevereiro");
            break;
        case 3:
            console.log("O mês é: Março");
            break;
        case 4:
            console.log("O mês é: Abril");
            break;
        case 5:
            console.log("O mês é: Maio");
            break;
        case 6:
            console.log("O mês é: Junho");
            break;
        case 7:
            console.log("O mês é: Julho");
            break;
        case 8:
            console.log("O mês é: Agosto");
            break;
        case 9:
            console.log("O mês é: Setembro");
            break;
        case 10:
            console.log("O mês é: Outubro");
            break;
        case 11:
            console.log("O mês é: Novembro");
            break;
        case 12:
            console.log("O mês é: Dezembro");
            break;
    }
}

