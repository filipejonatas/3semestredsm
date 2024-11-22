
document.getElementById('addProductForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Previne o envio do formulário

    const productName = document.getElementById('productName').value;
    const productValue = document.getElementById('productValue').value;

    // Verificação de valores válidos
    if (productName.trim() === '' || productValue <= 0) {
        alert("Por favor, insira um nome de produto válido e um valor maior que zero.");
        return;
    }

    // Envia os dados para o servidor usando fetch
    fetch('/api/item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: productName,
            quantity: parseInt(productValue) // Supondo que o valor seja uma quantidade
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Produto adicionado com sucesso:', data);

            // Atualiza a tabela com o novo item adicionado
            const shoppingList = document.getElementById('shoppingList');
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
            <td>${data.name}</td>
            <td>R$ ${parseFloat(data.quantity).toFixed(2)}</td>
            <td class="actions">
                <button class="edit-button">Editar</button>
                <button class="delete-button">Excluir</button>
            </td>
        `;
            shoppingList.appendChild(newRow);

            // Limpa os campos do formulário
            document.getElementById('productName').value = '';
            document.getElementById('productValue').value = '';
        })
        .catch(error => {
            console.error('Erro ao adicionar o produto:', error);
        });
});
