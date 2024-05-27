
document.getElementById("categoriaForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const tipo = document.getElementById("tipo").value.trim();

    const categoria = {
        categoria: nome,
        tipo: tipo
    };

    fetch('http://localhost:4848/financeiro/categoria/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoria)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao enviar dados');
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados enviados com sucesso:', data);
            alert("Categoria salva com sucesso!");
        })
        .catch(error => {
            console.error('Erro:', error);
            alert("Erro ao salvar categoria: " + error.message);
        });
});


//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=




document.addEventListener("DOMContentLoaded", function (){
    function buscaDadosEAtualizaTabelaCategorias(){
        fetch('http://localhost:4848/financeiro/categoria/getAll')
            .then(response => response.json())
            .then(data => {
                dados = data;
                console.log(data);
                console.log(dados);
                atualizaTabelaCategorias();
            })
    }
    function atualizaTabelaCategorias(){
        let tbody = document.querySelector('tbody');
        tbody.innerHTML = '';

        dados.forEach(categoria => {
            let row = `
            <tr>
                <td>${categoria.id}</td>
                <td>${categoria.categoria}</td>
                <td>${categoria.tipo}</td>
                <td>
                    <button class="btn btn-primary" onclick="editarCategoria(${categoria.id})">Editar</button>
                    <button class="btn btn-danger" onclick="excluirCategoria(${categoria.id})">Excluir</button>
                </td>
            </tr>
        `;
            tbody.innerHTML += row;
        });
    }

    function editarCategoria(id) {
        // Lógica para editar a categoria com o ID fornecido
        console.log("Editar categoria com ID:", id);
    }

    function excluirCategoria(id) {
        // Lógica para excluir a categoria com o ID fornecido
        console.log("Excluir categoria com ID:", id);
    }
    buscaDadosEAtualizaTabelaCategorias();
})

