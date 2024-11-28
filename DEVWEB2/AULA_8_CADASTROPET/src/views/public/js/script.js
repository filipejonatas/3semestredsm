let totalDespesas = 0;

document.getElementById('addExpenseForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const expenseName = document.getElementById('expenseName').value;
    const expenseValue = parseFloat(document.getElementById('expenseValue').value);
    const expenseDate = document.getElementById('expenseDate').value;

    if (expenseName.trim() === '' || isNaN(expenseValue) || expenseValue <= 0 || !expenseDate) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // Criação do item no MongoDB
    fetch('/api/item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: expenseName,
            quantity: expenseValue,
            date: expenseDate
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Despesa adicionada com sucesso:', data);

            // Adiciona a nova despesa na tabela
            addItemToTable(data);

            // Atualiza o total de despesas
            updateTotal(data.quantity, 'add');

            // Limpa os campos do formulário
            document.getElementById('expenseName').value = '';
            document.getElementById('expenseValue').value = '';
            document.getElementById('expenseDate').value = '';
        })
        .catch(error => {
            console.error('Erro ao adicionar a despesa:', error);
        });
});

function addItemToTable(item) {
    const shoppingList = document.getElementById('shoppingList');
    const newRow = document.createElement('tr');
    newRow.dataset.id = item._id; // ID único do MongoDB
    newRow.innerHTML = `
        <td class="product-name">${item.name}</td>
        <td class="product-value">R$ ${parseFloat(item.quantity).toFixed(2)}</td>
        <td class="product-date">${new Date(item.date).toLocaleDateString('pt-BR')}</td>
        <td>
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
    const expenseNameCell = row.querySelector('.product-name');
    const expenseValueCell = row.querySelector('.product-value');
    const expenseDateCell = row.querySelector('.product-date');

    const currentName = expenseNameCell.textContent;
    const currentValue = parseFloat(expenseValueCell.textContent.replace('R$', '').trim());
    const currentDate = expenseDateCell.textContent;

    const newName = prompt("Digite o novo nome da despesa:", currentName);
    const newValue = parseFloat(prompt("Digite o novo valor da despesa:", currentValue));
    const newDate = prompt("Digite a nova data da despesa (dd/mm/aaaa):", currentDate);

    if (newName && !isNaN(newValue) && newValue > 0 && newDate) {
        // Atualização no MongoDB
        fetch(`/api/item/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newName,
                quantity: newValue,
                date: new Date(newDate).toISOString()
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Despesa atualizada com sucesso:', data);

                // Atualiza os valores na interface
                updateTotal(newValue - currentValue, 'add');
                expenseNameCell.textContent = data.name;
                expenseValueCell.textContent = `R$ ${parseFloat(data.quantity).toFixed(2)}`;
                expenseDateCell.textContent = new Date(data.date).toLocaleDateString('pt-BR');
            })
            .catch(error => {
                console.error('Erro ao atualizar a despesa:', error);
            });
    } else {
        alert("Nome, valor ou data inválidos.");
    }
}

function deleteItem(row, itemId) {
    const expenseValue = parseFloat(row.querySelector('.product-value').textContent.replace('R$', '').trim());

    if (confirm("Tem certeza de que deseja excluir esta despesa?")) {
        // Exclusão do item no MongoDB
        fetch(`/api/item/${itemId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    console.log('Despesa excluída com sucesso');
                    updateTotal(expenseValue, 'subtract');
                    row.remove();
                } else {
                    console.error('Erro ao excluir a despesa');
                }
            })
            .catch(error => {
                console.error('Erro ao excluir a despesa:', error);
            });
    }
}

function updateTotal(amount, operation) {
    totalDespesas = operation === 'add' ? totalDespesas + amount : totalDespesas - amount;
    document.getElementById('totalExpenses').innerText = `Total das Despesas: R$ ${totalDespesas.toFixed(2)}`;
}

async function fetchTotalExpenses() {
    try {
        const response = await fetch('/api/expenses/total');
        const data = await response.json();
        totalDespesas = data.totalAmount;
        document.getElementById('totalExpenses').innerText = `Total das Despesas: R$ ${totalDespesas.toFixed(2)}`;
    } catch (error) {
        console.error('Erro ao buscar o total das despesas:', error);
    }
}

// Inicializa o total de despesas ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    fetchTotalExpenses();
});
