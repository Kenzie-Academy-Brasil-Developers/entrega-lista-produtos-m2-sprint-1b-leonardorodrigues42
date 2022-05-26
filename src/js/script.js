const ul = document.querySelector(".containerListaProdutos ul")
const botaoMostrarHortifruti = document.querySelector(".estiloGeralBotoes--filtrarHortifruti")
const botaoMostrarTodos = document.querySelector(".estiloGeralBotoes--mostrarTodos")
const botaoBuscar = document.querySelector(".estiloGeralBotoes--botaoBuscaPorNome")
const precoTotal = document.querySelector("#precoTotal")

function posicionaCard(produtos) {    
    let precoContador = 0
    produtos.forEach(produto => {
        const item = criaProduto(produto)
        ul.append(item)
        precoContador += produto.preco
    })
    precoTotal.innerText = `R$ ${precoContador}.00`
}

posicionaCard(produtos)

function criaProduto(item) {
    const img = document.createElement("img")
    const nome = document.createElement("h3")
    const preco = document.createElement("p")
    const secao = document.createElement("span")

    img.src = item.img
    nome.innerText = item.nome
    preco.innerText = `R$ ${item.preco}.00`
    secao.innerText = item.secao
    
    const produto = document.createElement("li")
    produto.append(img, nome, preco, secao)
    return produto
}


function filtrarPorHortifruti() {
    const filtrarPorHortifruti = produtos.filter((produto) => produto.secao === "Hortifruti" ? produto : null);
    ul.innerHTML = ""

    posicionaCard(filtrarPorHortifruti)
}


function filtrarPorNome(){
    const input = document.querySelector(".campoBuscaPorNome")
    
    const filtroPorNome = produtos.filter((item) => {
        const texto = input.value 
        const textoTratado = texto.toLowerCase()
        const produto = item.nome.toLowerCase()
        if (textoTratado == produto) {
            return produto
        }
    })
    ul.innerHTML = ""
    posicionaCard(filtroPorNome)
    input.value = ""
}

botaoBuscar.addEventListener("click", filtrarPorNome)

botaoMostrarHortifruti.addEventListener("click", filtrarPorHortifruti)

botaoMostrarTodos.addEventListener("click", () => {
    ul.innerHTML = ""
    posicionaCard(produtos)
})