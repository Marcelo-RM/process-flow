'use strict';

window.onload = function () {
    // Create click function to status items
    var listItems = document.querySelectorAll("ul.progressbar li");
    listItems.forEach(item => {
        //Create method for click item
        item.onclick = changeColor;
    });

    //Set info for the first item in panel
    //this.updateInfo(listItems[0]);
}

/**
 * Método usado para alterar cor (classe) quando item for clicado
 * @param {MouseEvent} event 
 */
function changeColor(event) {
    if(event.className !== undefined){
        var className = event.className;
        var listItem = event;
    } else {
        className = event.target.className;
        listItem = event.target;
    }

    //Se a classe conter fas o clique foi no icone
    //É necessário alterar classe parent
    if (className.includes("fas") || className.includes("chart")) {
        listItem = event.target.parentElement;
    }
    removeSelectedClass();
    listItem.className = "selected";
    updateInfo(listItem);
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

    var arr = getItems();
    head.innerHTML = item.innerText +
        "<span class='badge sap-button'>"+ arr.filter(
            function(el){
                if(el.status == item.id){
                    return el.status
                }
            }).length +
        "</span>";
    cont.innerHTML = createList(arr, item.id);
}

/**
 * 
 * @param {Array} items array de objetos contendo todos os dados da OV
 * @param {String} status status do item clicado
 * @returns {HtmlObject} list Lista com todos os itens já montado em detalhes
 */
function createList(items, status){
    var list =  "<ul class='list-group'>";
                    // "<li class='list-group-item'>"+item.innerText+"</li>" +
                    // "<li class='list-group-item'>"+item.innerText+"</li>" +
                    // "<li class='list-group-item'>"+item.innerText+"</li>" +
                    // "<li class='list-group-item'>"+item.innerText+"</li>" +
                    // "<li class='list-group-item'>"+item.innerText+"</li>" ;
        items.forEach(el => {
            if(el.status == status){
                list += createListItem(el, status);//"<li class='list-group-item'>"+el.ov + el.data + el.vendedor+"</li>" ;
            }
        });
    list += "</ul>";
    return list;
}

function createListItem(item, status){
    var listItem =
    "<li class='list-group-item row'>" +
    "<h5 class='mb-1'>Ordem de venda: "+ item.ov +"</h5>" +
    "<div class='col-sm-6 col-lg-6 col-md-6 col-xs-6'>" +
        "<div class='d-flex w-100 justify-content-between'>" +
            "<p class='text-muted'>Vendedor: "+ item.vendedor +"</p>" +
            "<p class='text-muted'>Data venda: "+ item.data +"</p>" +
        "</div>" +
    "</div>" +
    "<div class='col-sm-6 col-lg-6 col-md-6 col-xs-6'>" +
        "<div class='d-flex w-100 justify-content-between'>" +
            "<p class='text-muted'>N° NFe: "+ item.numNFE +"</p>" +
            "<p class='text-muted'>Info 00004</p>" +
        "</div>" +
    "</div>" +
    "</li>"

    return listItem;

}

/**
 * Metodo chamado durante clique no botão pesquisar
 * Será substituido por um método c# para consulta ao banco de dados
 * Criar método que chame uma função c# pode ser a melhor solução
 */
function updateChart(){
    var listItems = document.querySelectorAll("ul.progressbar li");
    var items = getItems();
    listItems.forEach(item => {
        //Change this; Creating charts for items
        var size1 = items.filter(
            function(el){
                if(el.status == item.id){
                    return el.status
                }
            }).length;
        
        var size2 = items.length - size1;

        var elem = item.children[0];
        debugger;
        createChart(elem, size1, size2);
    });
    changeColor(listItems[0]);
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
            responsive: true, //Não responsivo pois o tamanho é feito com CSS
            tooltips: {
                enabled: false //Desativa tooltips pois não são necessários
            }
        }
    });
}

function getItems(){
    return [
        {
            ov: 43434329,
            data: '12/12/2018',
            vendedor: 'Andre luiz Wiering',
            numNFE: 12345,
            status: 'criado'
        },{
            ov: 90843217,
            data: '12/12/2018',
            vendedor: 'Andre luiz Wiering',
            numNFE: 12345,
            status: 'validacao'
        },{
            ov: 12987334,
            data: '12/12/2018',
            vendedor: 'Andre luiz Wiering',
            numNFE: 12345,
            status: 'faturado'
        }
    ];
}