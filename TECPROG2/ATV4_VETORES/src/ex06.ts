var aluno: string[] = [];
var notas: number[][] = [];
var mediastotais: number[] = [];

for (let x: number = 0; x < 6; x++) {
    const nome: string = prompt("Digite o Aluno");
    aluno.push(nome);

    const n1 = parseFloat(prompt("Digite primeira nota:") || "0");
    const n2 = parseFloat(prompt("Digite a segunda nota") || "0");
    notas.push([n1, n2]);

    let media = (n1 + n2) / 2;
    mediastotais.push(media);

    console.log(`Aluno: ${aluno[x]}`);
    console.log(`Nota 1: ${notas[x][0]}`);
    console.log(`Nota 2: ${notas[x][1]}`)
    console.log(`Media: ${mediastotais[x]}`);

}
