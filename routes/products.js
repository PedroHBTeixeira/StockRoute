const express = require('express');
const router = express.Router();
const XLSX = require('xlsx');

// Caminho absoluto para a planilha
const workbook = XLSX.readFile('C:/Users/phbte/OneDrive/Documents/ALURA/StockRoute/data/ENDEREÇOS@Hub 16-01-25.xlsx');

function readProductsFromExcel() {
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet);
}

// Função para extrair os 5 dígitos relevantes
function extractRelevantCode(fullBarcode) {
    // Pega os 6 últimos dígitos e remove o último
    return fullBarcode.slice(-6, -1);
}

// Rota para buscar um produto por código de barras completo
router.get('/:code', (req, res) => {
    const fullBarcode = req.params.code.trim();
    const productCode = extractRelevantCode(fullBarcode); // Extrai os 5 dígitos

    console.log(`Código de barras completo: ${fullBarcode}`);
    console.log(`Código relevante extraído: ${productCode}`);

    const products = readProductsFromExcel();
    console.log(`Total de produtos carregados: ${products.length}`);

    // Filtrando o produto pelo código relevante
    const product = products.find(p => p['Codigo Material'] && p['Codigo Material'].toString().trim() === productCode);

    if (product) {
        console.log(`Produto encontrado: ${JSON.stringify(product)}`);
        res.json(product);
    } else {
        console.log('Produto não encontrado');
        res.status(404).json({ message: 'Produto não encontrado' });
    }
});

module.exports = router;
