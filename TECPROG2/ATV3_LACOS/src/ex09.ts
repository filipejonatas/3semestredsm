const entradausuario = prompt("Digite um número inteiro:");

if (entradausuario !== null) {
    const number = parseInt(entradausuario, 10);

    if (!isNaN(number) && number > 0) {
        let primo = true;
        let divisor = 2;
        let tempNum = number;
        const fatorprimo: number[] = [];


        while (divisor * divisor <= number) {
            if (number % divisor == 0) {
                primo = false;
                break;
            }
            divisor++;
        }

        if (primo) {
            divisor = 2;

            while (tempNum >= 2) {
                if (tempNum % divisor === 0) {
                    if (!fatorprimo.includes(divisor)) {
                        fatorprimo.push(divisor);
                    }
                    tempNum /= divisor;
                } else {
                    divisor++;
                }
            }
        }

        if (primo) {
            console.log(`${number} é um número primo.`);
        } else {
            console.log(`${number} não é um número primo. Os fatores primos únicos são: ${fatorprimo.join(', ')}.`);
        }
    } else {
        console.log("Por favor, digite um número inteiro positivo válido.");
    }
} else {
    console.log("Por favor, digite um número.");
}
