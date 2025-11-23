let cardContainer = document.querySelector(".card-container");
let dados= [];

// Inicia o carregamento dos dados assim que o script é lido.
iniciarBusca();

async function iniciarBusca(){
    let resposta= await fetch("data.json");
    dados = await resposta.json();

    // Adiciona o "escutador" para o evento de clique no botão de busca
    const campoBusca = document.getElementById("campo-busca");
    const botaoBusca = document.getElementById("botao-busca");

    if (botaoBusca && campoBusca) {
        botaoBusca.addEventListener("click", () => {
            const termoBusca = campoBusca.value.toLowerCase();
            let dadosFiltrados = [];

            if (termoBusca.length > 0) {
                dadosFiltrados = dados.filter(dado =>
                    dado.nome.toLowerCase().includes(termoBusca)||
                    dado.informacoes.toLowerCase().includes(termoBusca)||
                    dado.descricao.toLowerCase().includes(termoBusca)
                );
            }
            reinderizarCards(dadosFiltrados);
        });
    }
}

function reinderizarCards(dados){
    cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar os novos
    for(let dado of dados){
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `<h2>${dado.nome}</h2>
                <p>${dado.informacoes}</p>
                 <p>${dado.descricao} </p> 
                <a href="${dado.link}" target="_blank">Saiba mais</a>`
                cardContainer.appendChild(article);
    }

}
