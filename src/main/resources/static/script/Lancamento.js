document.addEventListener("DOMContentLoaded", function() {
    // Função para carregar categorias da API e preencher o select de categorias
    function carregarCategorias() {
        fetch("http://192.168.0.188:4848/financeiro/categoria/getAll")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao carregar categorias: " + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Verifique os dados recebidos
                const categoriaSelect = document.getElementById("categoria");
                categoriaSelect.innerHTML = ''; // Limpa qualquer opção anterior
                data.forEach(categoria => {
                    const option = document.createElement("option");
                    option.value = categoria.id;
                    option.text = `${categoria.categoria} (${categoria.tipo})`;
                    categoriaSelect.appendChild(option);
                });
            })
            .catch(error => console.error("Erro ao carregar categorias:", error));
    }

    // Carregar categorias ao carregar a página
    carregarCategorias();

    // Manipular o envio do formulário
    document.getElementById("transacaoForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const quantia = document.getElementById("quantia").value.trim();
        const dtTransacao = document.getElementById("dtTransacao").value;
        const categoria = document.getElementById("categoria").value;
        const descricao = document.getElementById("descricao").value.trim();

        // Verificar se quantia é um número válido
        if (isNaN(quantia) || quantia === "") {
            alert("Por favor, insira um valor numérico válido para a quantia.");
            return;
        }

        const transacao = {
            quantia: parseFloat(quantia),
            dtTransacao: dtTransacao,
            categoria: parseInt(categoria),
            descricao: descricao
        };

        console.log("Transação a ser enviada:", transacao); // Para depuração

        fetch("http://192.168.0.188:4848/financeiro/transacao/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(transacao)
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw err; });
                }
                return response.json();
            })
            .then(data => {
                console.log("Transação salva com sucesso:", data);
                alert("Transação salva com sucesso!");
            })
            .catch(error => {
                console.error("Erro ao salvar transação:", error);
                alert("Erro ao salvar transação: " + error.message);
            });
    });
});