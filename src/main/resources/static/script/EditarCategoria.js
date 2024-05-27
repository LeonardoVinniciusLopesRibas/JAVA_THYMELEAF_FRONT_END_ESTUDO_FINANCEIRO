document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    // Função para carregar os detalhes da categoria
    function carregarDetalhesCategoria() {
        fetch(`http://192.168.0.188:4848/financeiro/categoria/getById/${id}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById("nome").value = data.categoria;
                document.getElementById("tipo").value = data.tipo;
            })
            .catch(error => console.error('Erro ao carregar detalhes da categoria:', error));
    }

    carregarDetalhesCategoria();

    // Modificar o evento de envio do formulário para enviar uma requisição PUT
    document.getElementById("categoriaForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const tipo = document.getElementById("tipo").value.trim();

        const categoria = {
            categoria: nome,
            tipo: tipo
        };

        fetch(`http://192.168.0.188:4848/financeiro/categoria/put/${id}`, {
            method: 'PUT',
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
                alert("Categoria atualizada com sucesso!");
                window.location.href = '/categoria'; // Redirecionar para a página de categorias após a atualização
            })
            .catch(error => {
                console.error('Erro:', error);
                //
                alert("Erro ao atualizar categoria: " + error.message);
            });
    });
});
