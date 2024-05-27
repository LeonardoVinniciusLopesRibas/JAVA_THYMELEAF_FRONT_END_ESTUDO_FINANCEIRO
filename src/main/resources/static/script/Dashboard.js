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
    document.addEventListener("DOMContentLoaded", buscarDadosEAtualizarTabela);
