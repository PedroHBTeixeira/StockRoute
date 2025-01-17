const express = require('express');
const cors = require('cors');
const XLSX = require('xlsx');

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use('/api/products', router);

const workbook = XLSX.readFile('C:/Users/phbte/OneDrive/Documents/ALURA/StockRoute/data/ENDEREÇOS@Hub 16-01-25.xlsx');

function readProductsFromExcel() {
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet);
}

function extractRelevantCode(fullBarcode) {
    if (fullBarcode.length >= 6) {
        return fullBarcode.slice(-6, -1);
    }
    return fullBarcode;
}

router.get('/:code', (req, res) => {
    const fullBarcode = req.params.code.trim();
    const productCode = extractRelevantCode(fullBarcode);

    console.log(`Código de barras completo: ${fullBarcode}`);
    console.log(`Código relevante extraído: ${productCode}`);

    const products = readProductsFromExcel();
    console.log(`Total de produtos carregados: ${products.length}`);

    const product = products.find(p => p['Codigo Material'] && p['Codigo Material'].toString().trim() === productCode);

    if (product) {
        console.log(`Produto encontrado: ${JSON.stringify(product)}`);
        res.json({
            Rua: product['Nome estacao'] || 'Não encontrado',
            Rack: product['Nr Rack'] || 'Não encontrado',
            Linha: product['Linha'] || 'Não encontrado',
            Coluna: product['Coluna'] || 'Não encontrado',
        });
    } else {
        console.log('Produto não encontrado');
        res.status(404).json({ message: 'Produto não encontrado' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
