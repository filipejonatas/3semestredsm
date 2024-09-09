var v1: number[] = [];
var v2: number[] = [];
var v3: number[] = [];

for (var i = 0; i < 10; i++) {
    const num1 = Math.floor(Math.random() * 100 + 1);
    const num2 = Math.floor(Math.random() * 100 + 1);
    v1.push(num1);
    v2.push(num2);
    v3.push(num1);
    v3.push(num2);
}

console.log("V1", v1);
console.log("V2", v2);
console.log("V3", v3);