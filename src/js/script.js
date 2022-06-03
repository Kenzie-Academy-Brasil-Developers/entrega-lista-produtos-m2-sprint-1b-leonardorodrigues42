const ul = document.querySelector(".containerListaProdutos ul")
const botaoMostrarHortifruti = document.querySelector(".estiloGeralBotoes--filtrarHortifruti")
const botaoMostrarTodos = document.querySelector(".estiloGeralBotoes--mostrarTodos")
const botaoBuscar = document.querySelector(".estiloGeralBotoes--botaoBuscaPorNome")
const precoTotal = document.querySelector("#precoTotal")
const ulCarrinho = document.querySelector(".carrinho ul")

function posicionaCard(produtos) {    
    
    produtos.forEach(produto => {
        const item = criaProduto(produto)
        ul.append(item)
        
    })
    
}

posicionaCard(produtos)

function criaProduto(item) {
    const img = document.createElement("img")
    const nome = document.createElement("h3")
    const preco = document.createElement("p")
    const secao = document.createElement("span")
    const componentes = componentesDoItem(item)
    const addProduto = document.createElement("button")
    
    addProduto.className = `estiloGeralBotoes addProduto`
    addProduto.id = item.id

    img.src = item.img
    nome.innerText = item.nome
    secao.innerText = item.secao
    preco.innerText = `R$ ${parseInt(item.preco)}.00`
    addProduto.innerText = "Comprar"
    
    const produto = document.createElement("li")
    const div = document.createElement("div")
    div.className = "containerListaProdutos__div"
    div.append(preco, addProduto)
    produto.append(img, nome, secao, componentes, div)
    return produto
}

function componentesDoItem(item){
    const componentes = document.createElement("span")
    componentes.className = "componentes"
    const componentsHTML = []
    const listCompenents = item.componentes
    
    listCompenents.forEach((component, index) => componentsHTML.push(`${index+1}. ${component} <br>`))
    componentes.innerHTML = componentsHTML.join("")
    return componentes
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
        const secao = item.secao.toLowerCase()
        const categoria = item.categoria.toLowerCase()
        if (textoTratado == produto) {
            return produto
        }
        else if (textoTratado == secao) {
            return secao
        }
        else if (textoTratado == categoria) {
            return categoria
        }
    })
    ul.innerHTML = ""
    posicionaCard(filtroPorNome)
    input.value = ""
}

function criaCardCarrinho(item){
    const card = document.createElement("li")
    card.className = "cardCarrinho"
    const img = document.createElement("img")
    img.className = "imgCarrinho"
    const info = document.createElement("div")
    info.className = "infoCarrinho"
    const button = document.createElement("img")
    button.className = "buttonRemove"

    const nome = document.createElement("h3")
    const secao = document.createElement("span")
    const preco = document.createElement("p")

    img.src = item.img
    button.src = './src/img/trash.png'
    nome.innerText = item.nome
    secao.innerText = item.secao
    preco.innerText = `R$ ${item.preco}`

    info.append(nome, secao, preco)
    card.append(img, info, button)

    ulCarrinho.appendChild(card)

    return card
}

const addProduto = document.querySelectorAll(".addProduto")
const remove = document.querySelectorAll(".buttonRemove")


let precoContador = 0
function carrinho(){
    
    for (let item of addProduto){
        item.addEventListener("click", () => {
            
            precoContador += parseInt(produtos[item.id-1].preco)
            
            const card = criaCardCarrinho(produtos[item.id-1])
            const buttonRemove = card.querySelector(".buttonRemove")
            
            precoTotal.innerText = `R$ ${precoContador}.00`
            
            buttonRemove.addEventListener("click", () => {
                precoContador -= parseInt(produtos[item.id-1].preco)
                ulCarrinho.removeChild(card)
                precoTotal.innerText = `R$ ${precoContador}.00`
            })
        })       
    }
}

carrinho()


botaoBuscar.addEventListener("click", filtrarPorNome)

botaoMostrarHortifruti.addEventListener("click", filtrarPorHortifruti)

botaoMostrarTodos.addEventListener("click", () => {
    ul.innerHTML = ""
    posicionaCard(produtos)
})

