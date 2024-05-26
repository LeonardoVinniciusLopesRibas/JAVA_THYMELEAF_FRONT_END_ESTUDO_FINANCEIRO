//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//DADOS RESPONSÁVEIS POR BUSCAR OS 3 CARDS DE DESPESA, RECEITA E SALDO


fetch('http://localhost:4848/financeiro/transacao/transacoes/despesas')
    .then(response => response.json())
    .then(data => {
        // Arredonda o número para duas casas decimais
        const formattedData = parseFloat(data).toFixed(2);
        document.getElementById('despesasValor').textContent = formattedData;
    });

fetch('http://localhost:4848/financeiro/transacao/transacoes/receitas')
    .then(response => response.json())
    .then(data => {
        // Arredonda o número para duas casas decimais
        const formattedData = parseFloat(data).toFixed(2);
        document.getElementById('receitasValor').textContent = formattedData;
    });

fetch('http://localhost:4848/financeiro/transacao/transacoes/saldo')
    .then(response => response.json())
    .then(data => {
        // Arredonda o número para duas casas decimais
        const formattedData = parseFloat(data).toFixed(2);
        document.getElementById('saldoValor').textContent = formattedData;
    });

//FIM DOS DADOS RESPONSÁVEIS POR BUSCAR OS 3 CARDS DE DESPESA, RECEITA E SALDO

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//INFORMAÇÕES REFERENTE A TABELA DO DASHBOARD


// Declare variáveis globais para controlar a paginação
let paginaAtual = 1;
const itensPorPagina = 10;
let dados; // Variável para armazenar os dados da API

// Função para buscar dados da API e preencher a tabela
function buscarDadosEAtualizarTabela() {
    fetch('http://localhost:4848/financeiro/transacao/getAll')
        .then(response => response.json())
        .then(data => {
            dados = data; // Armazena os dados globalmente
            atualizarTabela();
        });
}

// Função para preencher a tabela com os dados da página atual
function atualizarTabela() {
    let tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const itensPagina = dados.slice(inicio, fim);

    itensPagina.forEach(item => {
        let quantiaFormatada = parseFloat(item.quantia).toFixed(2);
        let row = `
            <tr>
                <td>${item.descricao}</td>
                <td>${item.categoriaNome}</td>
                <td>${quantiaFormatada}</td>
                <td>${item.dtTransacao}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });

    // Atualiza a exibição das informações de página atual e total de páginas
    const totalPaginas = Math.ceil(dados.length / itensPorPagina);
    document.getElementById("paginaAtual").textContent = paginaAtual;
    document.getElementById("totalPaginas").textContent = totalPaginas;
}

// Event listener para o clique no botão de página anterior
document.getElementById("paginaAnterior").addEventListener("click", function() {
    if (paginaAtual > 1) {
        paginaAtual--;
        atualizarTabela();
    }
});

// Event listener para o clique no botão de próxima página
document.getElementById("proximaPagina").addEventListener("click", function() {
    const totalPaginas = Math.ceil(dados.length / itensPorPagina);
    if (paginaAtual < totalPaginas) {
        paginaAtual++;
        atualizarTabela();
    }
});

// Chama a função para buscar dados e preencher a tabela ao carregar a página
document.addEventListener("DOMContentLoaded", buscarDadosEAtualizarTabela);


//FIM DAS INFORMAÇÕES REFERENTE A TABELA DO DASHBOARD

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

//BUSCA AS CATEGORIAS NO FORMULARIO PARA REALIZAR O POST DE UMA NOVA TRANSAÇÃO

document.addEventListener("DOMContentLoaded", function() {
    // Função para carregar categorias da API e preencher o select de categorias
    function carregarCategorias() {
        fetch("http://localhost:4848/financeiro/categoria/getAll")
            .then(response => response.json())
            .then(data => {
                const categoriaSelect = document.getElementById("categoria");
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

        fetch("http://localhost:4848/financeiro/transacao/post", {
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


//FIM ESSE É O CÓDIGO DO MÉTODO POST PARA UMA NOVA TRANSAÇÃO

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

//INICIO DO POST DE NOVA CATEGORIA
/*
document.getElementById("categoriaForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const tipo = document.getElementById("tipo").value.trim();

    const transacao = {
        categoria: nome,
        tipo: tipo
    };

    fetch('http://localhost:4848/financeiro/categoria/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(transacao)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao enviar dados');
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados enviados com sucesso:', data);
            // Faça o que for necessário com a resposta do servidor, se houver
        })
        .catch(error => {
            console.error('Erro:', error);
        });
});

*/
