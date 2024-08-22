let totalEleitores = parseInt(prompt("Digite o número total de eleitores do município:"));
let votosBrancos = parseInt(prompt("Digite o número de votos brancos:"));
let votosNulos = parseInt(prompt("Digite o número de votos nulos:"));
let votosValidos = parseInt(prompt("Digite o número de votos válidos:"));
let votosCandidato = parseInt(prompt("Digite a quantidade de votos que você obteve na última eleição:"));

if (isNaN(totalEleitores) || isNaN(votosBrancos) || isNaN(votosNulos) || isNaN(votosValidos) || isNaN(votosCandidato)) {
    console.log("Por favor, insira apenas números válidos.");

} else {

    let totalVotosValidosBrancos = votosValidos + votosBrancos;

    let porcentagemVotos = (votosCandidato / totalVotosValidosBrancos) * 100;

    if (porcentagemVotos > 10) {
        console.log("Parabéns, você foi eleito!");
    } else {
        console.log("Infelizmente, você não foi eleito.");
    }

    let porcentagemEleitores = (votosCandidato / totalEleitores) * 100;
    console.log(`Sua votação corresponde a ${porcentagemEleitores} % da quantidade total de eleitores do município.`);
}
