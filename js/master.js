window.onload = function () {
    // Create click function to status items
    var listItems = document.querySelectorAll("ul.progressbar li");
    listItems.forEach(item => {
        //Create method for click item
        item.onclick = changeColor;

        //Change this; Creating charts for items
        var size1 = Math.floor(Math.random() * 10);
        var size2 = Math.floor(Math.random() * 10);
        var elem = item.children[0];
        this.createChart(elem, size1, size2);
    });

    //Set info for the first item in panel
    this.updateInfo(listItems[0]);

    //CREATE CHART
    this.createChart();
}

/**
 * Método usado para alterar cor (classe) quando item for clicado
 * @param {MouseEvent} event 
 */
function changeColor(event) {
    var className = event.target.className;
    var listItem = event.target;

    //Se a classe conter fas o clique foi no icone
    //É necessário alterar classe parent
    if (className.includes("fas") || className.includes("chart")) {
        listItem = event.target.parentElement;
    }
    if (className != "selected") {
        removeSelectedClass();
        listItem.className = "selected";
        updateInfo(listItem);
    }
}

/**
 * Método que remove a classe de todos os itens de status
 */
function removeSelectedClass() {
    var status = document.querySelectorAll("ul.progressbar li");
    status.forEach(item => {
        item.className = "";
    });
}

/**
 * Altera o conteúdo da panel de informação
 * @param {HtmlObject} item Status clicado
 */
function updateInfo(item) {
    var head = document.getElementById("panelHeading");
    var cont = document.getElementById("panelContent");

    //Substituir isso por um retorno do bd
    var arr = [
        {
            ov: 1234,
            data: '12/12/12',
            vendedor: 'Mmontalvao'
        },{
            ov: 1234,
            data: '12/12/12',
            vendedor: 'Mmontalvao'
        },{
            ov: 1234,
            data: '12/12/12',
            vendedor: 'Mmontalvao'
        }
    ];

    head.innerHTML = item.innerText +
        " <span class='badge sap-button'>"+ arr.length +"</span>";
    cont.innerHTML = this.createList(arr, item.Id);
}

function createList(items, status){
    var list =  "<ul class='list-group'>";
                    // "<li class='list-group-item'>"+item.innerText+"</li>" +
                    // "<li class='list-group-item'>"+item.innerText+"</li>" +
                    // "<li class='list-group-item'>"+item.innerText+"</li>" +
                    // "<li class='list-group-item'>"+item.innerText+"</li>" +
                    // "<li class='list-group-item'>"+item.innerText+"</li>" ;
        items.forEach(el => {
            list += "<li class='list-group-item'>"+el.ov + el.data + el.vendedor+"</li>" ;
        });
    list += "</ul>";
    return list;
}

/**
 * Método usado para criação de gráfico do tipo rosca
 * @param {HtmlObject} elem Objeto html em que ficará o gráfico
 * @param {Number} vl1 Valor exibido no gráfico com a cor verde
 * @param {Number} vl2 Valor exibido no gráfico com a cor cinza
 */
function createChart(elem, vl1, vl2) {
    //validar se está recebendo elemento para criação do grafico
    var ctx = elem != undefined ? elem.getContext('2d') : "";
    if(ctx == ""){return;}

    //Create Chart
    var chart = new Chart(ctx, {
        type: 'doughnut', //tipo do grafico
        data: {
            datasets: [{
                data: [
                    vl1, //valor principal 'cor verde'
                    vl2  //valor secundario 'cor cinza'
                ],
                backgroundColor: [
                    '#07e30a', //verde
                    '#aaa', //cinza
                ],
                borderWidth: 0, //tamanho da borda
                weight: 1
            }]
            /*,
            labels: [
                'Completo',
                'Pendente'
            ]*/
        },
        options: {
            cutoutPercentage: 70, //Quanto maior o valor menor a largura do grafico
            responsive: false, //Não responsivo pois o tamanho é feito com CSS
            tooltips: {
                enabled: false //Desativa tooltips pois não são necessários
            }
        }
    });
}