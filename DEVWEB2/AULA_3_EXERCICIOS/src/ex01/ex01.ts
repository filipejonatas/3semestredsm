import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calcular(n1: number, n2: number, operador: string): number | null {
    switch (operador) {
        case '+':
            return n1 + n2;
        case '-':
            return n1 - n2;
        case '*':
            return n1 * n2;
        case '/':
            if (n2 === 0) {
                console.log("divisao por zero não permitida");
                return null;
            }
            return n1 / n2;
        default:
            console.error("Erro: Operador inválido. Use +, -, * ou /.");
            return null;
    }
}

function iniciarCalculadora() {
    rl.question('Digite o número 1: ', (entrada1) => {
        const n1 = parseFloat(entrada1);
        if (isNaN(n1)) {
            console.error('Erro: Entrada inválida. Por favor, digite um número válido.');
            rl.close();
            return;
        }

        rl.question('Digite o número 2: ', (entrada2) => {
            const n2 = parseFloat(entrada2);
            if (isNaN(n2)) {
                console.error('Erro: Entrada inválida. Por favor, digite um número válido.');
                rl.close();
                return;
            }

            rl.question('Digite o operador (+, -, *, /): ', (operador) => {
                const resultado = calcular(n1, n2, operador);
                if (resultado !== null) {
                    console.log(`Resultado: ${n1} ${operador} ${n2} = ${resultado}`);
                }
                rl.close();
            });
        });
    });
}

iniciarCalculadora();