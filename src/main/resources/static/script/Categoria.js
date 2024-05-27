document.getElementById("categoriaForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const tipo = document.getElementById("tipo").value.trim();

    const categoria = {
        categoria: nome,
        tipo: tipo
    };

    fetch('http://192.168.0.188:4848/financeiro/categoria/post', {
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
            location.reload();
        })
        .catch(error => {
            console.error('Erro:', error);
            alert("Erro ao salvar categoria: " + error.message);
        });
});

document.addEventListener("DOMContentLoaded", function () {
    function buscaDadosEAtualizaTabelaCategorias() {
        fetch('http://192.168.0.188:4848/financeiro/categoria/getAll')
            .then(response => response.json())
            .then(data => {
                dados = data;
                atualizaTabelaCategorias();
            })
    }

    function atualizaTabelaCategorias() {
        let tbody = document.querySelector('tbody');
        tbody.innerHTML = '';

        dados.forEach(categoria => {
            let row = `
            <tr>
                <td>${categoria.id}</td>
                <td>${categoria.categoria}</td>
                <td>${categoria.tipo}</td>
                <td>
                    <button class="btn btn-primary float-end" style="margin-left: 5px" onclick="editarCategoria(${categoria.id})">Editar</button>
                    <button class="btn btn-danger float-end" style="margin-left: 5px" onclick="excluirCategoria(${categoria.id})">Excluir</button>
                </td>
            </tr>
            `;

            tbody.innerHTML += row;
        });
    }



    buscaDadosEAtualizaTabelaCategorias();
});

function excluirCategoria(id) {
    console.log("Excluir categoria com ID:", id);

    if (confirm("Tem certeza que deseja deletar essa categoria?")) {
        fetch(`http://192.168.0.188:4848/financeiro/categoria/delete/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao excluir categoria');
                }
                return response.json();
            })
            .then(data => {
                console.log('Categoria excluída com sucesso:', data);
                alert("Categoria excluída com sucesso!");
                location.reload();
            })
            .catch(error => {
                console.error('Erro:', error);
                alert("Erro ao excluir categoria: " + error.message);
            });
    }
}

function editarCategoria(id) {
    console.log("Editar categoria com ID:", id);
}
