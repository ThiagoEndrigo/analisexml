// script.js

document.getElementById('xmlForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const xmlString = document.getElementById('xmlInput').value;

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

    const detElements = xmlDoc.getElementsByTagName('det');
    const pagElements = xmlDoc.getElementsByTagName('detPag');
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    let somatorioVProd = 0;
    let somatorioVDesc = 0;
    let somatorioVPag = 0;

    for (let i = 0; i < pagElements.length; i++) {
        const vPagElement = pagElements[i].getElementsByTagName('vPag')[0];
        const vPag = parseFloat(vPagElement.textContent);
        somatorioVPag += vPag;
    }

    for (let i = 0; i < detElements.length; i++) {
        const det = detElements[i];
        const nItem = det.getAttribute('nItem');
        const cProd = det.getElementsByTagName('cProd')[0].textContent;
        const vUnCom = det.getElementsByTagName('vUnCom')[0].textContent;
        const vProd = parseFloat(det.getElementsByTagName('vProd')[0].textContent);
        const vDescElement = det.getElementsByTagName('vDesc')[0];
        const vDesc = vDescElement ? parseFloat(vDescElement.textContent) : 0;

        somatorioVProd += vProd;
        somatorioVDesc += vDesc;

        resultDiv.innerHTML += `
            <div style="display: inline-block; margin-right: 20px; margin-top:5px; border:1px solid black;">
                <strong>Item ${nItem}:</strong><br>
                det nItem: ${nItem}<br>
                cProd: ${cProd}<br>
                vUnCom: ${Number(vUnCom).toFixed(2)}<br>
                vProd: ${vProd}<br>
                vDesc: ${vDesc}<br>
            </div  style="margin-top:20px;">
        `;
    }

    resultDiv.innerHTML += `
        <div style="margin-top:30px;">
            <strong>Soma das tags "vProd" e "vDesc" Geral:</strong><br>
            <div style="margin-top:5px;">
                Total vProd: ${somatorioVProd.toFixed(2)}<br>
                Total vDesc: ${somatorioVDesc.toFixed(2)}<br>
                Total NFE: ${(somatorioVProd - somatorioVDesc).toFixed(2)}<br> 
                Valor Pago: ${somatorioVPag.toFixed(2)}<br> 
            </div>
        </div>
    `;
});
