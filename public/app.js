// Função para buscar um produto pelo código
function fetchProduct() {
    const code = document.getElementById('product-code').value;
    fetch(`/api/products/${code}`)
        .then(response => response.json())
        .then(data => displayProductInfo(data))
        .catch(error => console.error('Erro ao buscar produto:', error));
}

// Função para listar todos os produtos
function fetchAllProducts() {
    fetch('/api/products')
        .then(response => response.json())
        .then(data => displayProductList(data))
        .catch(error => console.error('Erro ao listar produtos:', error));
}

// Exibir informações de um produto
function displayProductInfo(product) {
    const productInfo = document.getElementById('product-info');
    if (product.message) {
        productInfo.innerHTML = `<p>${product.message}</p>`;
    } else {
        productInfo.innerHTML = `
            <h2>Detalhes do Produto</h2>
            <p><strong>Código:</strong> ${product['Código do Produto']}</p>
            <p><strong>Nome:</strong> ${product['Nome do Produto']}</p>
            <p><strong>Rua:</strong> ${product.Rua}</p>
            <p><strong>Rack:</strong> ${product.Rack}</p>
            <p><strong>Prateleira:</strong> ${product.Prateleira}</p>
            <p><strong>Posição:</strong> ${product.Posicao}</p>
        `;
    }
}

// Exibir a lista de todos os produtos
function displayProductList(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '<h2>Lista de Produtos</h2>';
    products.forEach(product => {
        productList.innerHTML += `
            <p><strong>Código:</strong> ${product['Código do Produto']} - 
            <strong>Nome:</strong> ${product['Nome do Produto']}</p>
        `;
    });
}
