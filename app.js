const button = document.getElementById('buttonCalc');


const totalIDs = ['totalCarneBovina', 'totalFrango', 'totalLinguica', 'totalRefri', 'totalCerveja'];
const unitOfMeasurement = ['Kg', 'Kg', 'Kg', 'L', 'L']


// O fluxo a seguir se inicia ao clicar no botão Calcular
button.addEventListener("click", function (e) {
    let mens = document.getElementById('mens');
    let womens = document.getElementById('womens');
    let childrens = document.getElementById('childrens');

    allNumbers = getAllNumbersTable();
    allNumbers = groupArray(allNumbers, 3);
    
    let counter = 0;

    // Percorre todos os arrays dentro do array AllNumbers
    allNumbers.forEach((arrays) => {
        let total = calcTotal(mens.value, womens.value, childrens.value, arrays[0], arrays[1], arrays[2]);
        let totalConverted = 0;
        
        if (isNaN(total)){
            totalConverted = 'Inválido';
        } else {
            totalConverted = (total / 1000) + unitOfMeasurement[counter];
        }
        
        insertValue(totalConverted, document.getElementById(totalIDs[counter]));

        counter++;
    });
});


// Calcula o total de cada comida ou bebeda de acordo com as quantidades determinadas como parâmetro da função
function calcTotal(mens, womens, childrens, quantityPerMens, quantityPerWomens, quantityPerChildrens) {
    totalForMens = mens * quantityPerMens;
    totalForWomens = womens * quantityPerWomens;
    totalForChildrens = childrens * quantityPerChildrens;
    return totalForMens + totalForWomens + totalForChildrens
}


// Insere um valor em um componente HTML
function insertValue(value, componet) {
    componet.innerText = value;
}


// Pegas os números em cada elemento (td) de uma tabela
function getAllNumbersTable() {
    let rows = document.querySelectorAll('table tr');
    let allNumbers = new Array;
    
    rows.forEach(function(row) {
        tds = row.querySelectorAll('td');
        
        for (let td = 0; td < tds.length - 1; td++) {
            let numbers = tds[td].textContent.match(/\d+/g);

            if (numbers) {
                allNumbers.push(numbers);
            }
        }
    });
    return allNumbers;
}


// Agrupa um array em outros arrays de acordo com a quantidade de elementos por cada array que você indicar no *groupSize*
function groupArray(array, groupSize) {
    let result = [];

    for (let index = 0; index < array.length; index += groupSize) {
        let group = array.slice(index, index + groupSize);
        result.push(group);
    }
    return result;
}
