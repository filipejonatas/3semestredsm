document.getElementById('addProductForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const productName = document.getElementById('productName').value;
    const productValue = parseFloat(document.getElementById('productValue').value);

    if (productName.trim() === '' || isNaN(productValue) || productValue <= 0) {
        alert("Por favor, insira um nome de produto válido e um valor maior que zero.");
        return;
    }

    // Criação do item no MongoDB
    fetch('/api/item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: productName,
            quantity: productValue
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Produto adicionado com sucesso:', data);
        
        // Adiciona o novo item na tabela
        addItemToTable(data);

        // Limpa os campos do formulário
        document.getElementById('productName').value = '';
        document.getElementById('productValue').value = '';
    })
    .catch(error => {
        console.error('Erro ao adicionar o produto:', error);
    });
});

function addItemToTable(item) {
    const shoppingList = document.getElementById('shoppingList');
    const newRow = document.createElement('tr');
    newRow.dataset.id = item._id; // ID único do MongoDB
    newRow.innerHTML = `
        <td class="product-name">${item.name}</td>
        <td class="product-value">R$ ${parseFloat(item.quantity).toFixed(2)}</td>
        <td class="actions">
            <button class="edit-button">Editar</button>
            <button class="delete-button">Excluir</button>
        </td>
    `;

    // Event listeners para editar e excluir
    newRow.querySelector('.edit-button').addEventListener('click', () => editItem(newRow, item._id));
    newRow.querySelector('.delete-button').addEventListener('click', () => deleteItem(newRow, item._id));

    shoppingList.appendChild(newRow);
}

function editItem(row, itemId) {
    const productNameCell = row.querySelector('.product-name');
    const productValueCell = row.querySelector('.product-value');

    const currentName = productNameCell.textContent;
    const currentValue = parseFloat(productValueCell.textContent.replace('R$', '').trim());

    const newName = prompt("Digite o novo nome do produto:", currentName);
    const newValue = parseFloat(prompt("Digite o novo valor do produto:", currentValue));

    if (newName && !isNaN(newValue) && newValue > 0) {
        // Atualização no MongoDB
        fetch(`/api/item/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newName,
                quantity: newValue
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Produto atualizado com sucesso:', data);
            
            // Atualiza os valores na interface
            productNameCell.textContent = data.name;
            productValueCell.textContent = `R$ ${parseFloat(data.quantity).toFixed(2)}`;
        })
        .catch(error => {
            console.error('Erro ao atualizar o produto:', error);
        });
    } else {
        alert("Nome ou valor inválido.");
    }
}

function deleteItem(row, itemId) {
    if (confirm("Tem certeza de que deseja excluir este produto?")) {
        // Exclusão do item no MongoDB
        fetch(`/api/item/${itemId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                console.log('Produto excluído com sucesso');
                row.remove(); // Remove a linha da tabela
            } else {
                console.error('Erro ao excluir o produto');
            }
        })
        .catch(error => {
            console.error('Erro ao excluir o produto:', error);
        });
    }
}
