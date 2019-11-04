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
        "<span class='badge sap-button' style='margin-left:5px'>"+ arr.filter(
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
    var listItem;
    var arrStatus = [
        'criado',
        'validacao',
        'separacao',
        'faturado',
        'transito',
        'entregue'
    ];

    var thisStatus = arrStatus[arrStatus.findIndex(function(el){return el == status})];

    if(thisStatus == "criado" || thisStatus == "validacao"){
        listItem = detailForStatusCriado(item);
    }
    if(thisStatus == "separacao"){
        listItem = detailForStatusSeparacao(item);
    }
    if(thisStatus == "faturado"){
        listItem = detailForStatusFaturamento(item);
    }
    if(thisStatus == "transito"){
        listItem = detailForStatusTransito(item);
    }
    if(thisStatus == "entregue"){
        listItem = detailForStatusEntregue(item);
    }

    return listItem;
}

function detailForStatusEntregue(item){
    return "<li class='list-group-item row'>" +
    "<h4 class='mb-1'>"+ item.material +"</h4>" +
    "<div class='col-sm-6 col-lg-6 col-md-6 col-xs-12'>" +
        "<div class='d-flex w-100 justify-content-between'>" +
            //"<p class='text-muted'>Status: "+ item.sts +"</p>" +
            "<p class='text-muted'>Data Separação: "+ item.dataSep +"</p>" +
            "<p class='text-muted'>Número NF-e: "+ item.numNFE +"</p>" +
            "<p class='text-muted'>Data aprovação NF-e: "+ item.dataNFE +"</p>" +
        "</div>" +
    "</div>" +
    "<div class='col-sm-6 col-lg-6 col-md-6 col-xs-12'>" +
        "<div class='d-flex w-100 justify-content-between'>" +
            "<p class='text-muted'>Saiu p/ Entrega: "+ item.dataMinuta +"</p>" +
            "<p class='text-muted'>Recebimento: "+ item.dataRecebimento +"</p>" +
        "</div>" +
    "</div>" +
    "</li>";
}

function detailForStatusTransito(item){
    return "<li class='list-group-item row'>" +
    "<h4 class='mb-1'>"+ item.material +"</h4>" +
    "<div class='col-sm-6 col-lg-6 col-md-6 col-xs-12'>" +
        "<div class='d-flex w-100 justify-content-between'>" +
            //"<p class='text-muted'>Status: "+ item.sts +"</p>" +
            "<p class='text-muted'>Data Separação: "+ item.dataSep +"</p>" +
            "<p class='text-muted'>Número NF-e: "+ item.numNFE +"</p>" +
            "<p class='text-muted'>Data aprovação NF-e: "+ item.dataNFE +"</p>" +
        "</div>" +
    "</div>" +
    "<div class='col-sm-6 col-lg-6 col-md-6 col-xs-12'>" +
        "<div class='d-flex w-100 justify-content-between'>" +
            "<p class='text-muted'>Saiu p/ Entrega: "+ item.dataMinuta +"</p>" +
        "</div>" +
    "</div>" +
    "</li>";
}

function detailForStatusFaturamento(item){
    return "<li class='list-group-item row'>" +
    "<h4 class='mb-1'>"+ item.material +"</h4>" +
    "<div class='col-sm-6 col-lg-6 col-md-6 col-xs-12'>" +
        "<div class='d-flex w-100 justify-content-between'>" +
            //"<p class='text-muted'>Status: "+ item.sts +"</p>" +
            "<p class='text-muted'>Data Separação: "+ item.dataSep +"</p>" +
            "<p class='text-muted'>Número NF-e: "+ item.numNFE +"</p>" +
            "<p class='text-muted'>Data aprovação NF-e: "+ item.dataNFE +"</p>" +
        "</div>" +
    "</div>" +
    "</li>";
}

function detailForStatusSeparacao(item){
    return "<li class='list-group-item row'>" +
    "<h4 class='mb-1'>"+ item.material +"</h4>" +
    "<div class='col-sm-6 col-lg-6 col-md-6 col-xs-12'>" +
        "<div class='d-flex w-100 justify-content-between'>" +
            //"<p class='text-muted'>Status: "+ item.sts +"</p>" +
            "<p class='text-muted'>Data Separação: "+ item.dataSep +"</p>" +
        "</div>" +
    "</div>" +
    "</li>";
}

function detailForStatusCriado(item){
    return "<li class='list-group-item row'>" +
    "<h4 class='mb-1'>"+ item.material +"</h4>" +
    "<div class='col-sm-6 col-lg-6 col-md-6 col-xs-12'>" +
        "<div class='d-flex w-100 justify-content-between'>" +
            "<p class='text-muted'>Status: "+ item.sts +"</p>" +
        "</div>" +
    "</div>" +
    "</li>";
}

/**
 * Metodo chamado durante clique no botão pesquisar
 * Será substituido por um método c# para consulta ao banco de dados
 * Criar método que chame uma função c# pode ser a melhor solução
 */
function updateChart(){
    var cnpj = document.getElementById("cnpj");
    if(cnpj.value == ""){
        cnpj.style.border = '1px solid red';
        //return;
    }
    else {
        cnpj.style.border = '1px solid #ccc';
    }
    var listItems = document.querySelectorAll("ul.progressbar li");
    var items = getItems();
    listItems.forEach(item => {
        //Change this; Creating charts for ; Cor verde
        var size1 = items.filter(
            function(el){
                // var arrStatus = ['criado','validacao','separacao','faturado','transito','entregue'];
                // var stsIndex = arrStatus.findIndex(function(elem){return elem == el.status});
                // var stsIndex2 = arrStatus.findIndex(function(elem){return elem == item.id});
                // debugger;
                // if(stsIndex2 <= stsIndex){
                //     return el.status;
                // }
                
                if(el.status == item.id){
                    return el.status
                }
            }).length;
        //Verifica se há algum item recusado para exibição
        var recusados = items.filter(
            function(el){
                if(el.sts == "recusado"){
                    return el.sts
                }
            }
        );
        
        //Cor Vermelha
        var size3 = recusados.length;
        //Caso não for status criado remove os itens de cor vermelha
        if(item.id != "criado"){
            size3 = 0
        }else{
            size1 -= size3;
        }

        //Cor Cinza
        var size2 = items.length - (size1 + size3);

        //Verificação de grafico, apos a primeira chamada o grafica passa a ficar depois
        //de uma div para verificação de tamanho
        var elem = item.children[0].tagName == "DIV" ? item.children[1] : item.children[0];
        
        createChart(elem, size1, size2, size3);
    });
    //Seleciona o primeiro item da lista
    changeColor(listItems[0]);
}

/**
 * Método usado para criação de gráfico do tipo rosca
 * @param {HtmlObject} elem Objeto html em que ficará o gráfico
 * @param {Number} vl1 Valor exibido no gráfico com a cor verde
 * @param {Number} vl2 Valor exibido no gráfico com a cor cinza
 */
function createChart(elem, valorVerde, valorCinza, valorVermelho) {
    //Verifica se ha valor vermelho
    if(!valorVermelho){valorVermelho = 0}
    //validar se está recebendo elemento para criação do grafico
    var ctx = elem != undefined ? elem.getContext('2d') : "";
    if(ctx == ""){return;}

    //Create Chart
    var chart = new Chart(ctx, {
        type: 'doughnut', //tipo do grafico
        data: {
            datasets: [{
                data: [
                    valorVerde, //Quantidade de itens de cor verde
                    valorCinza, //Quantidade de itens de cor cinza
                    valorVermelho  //Quantidade de itens de cor vermelha
                ],
                backgroundColor: [
                    '#3ada3a', //verde
                    '#aaa', //cinza
                    '#f02929' //Vermelho
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
            responsive: true, //Ajustar automaticamente ao tamanho do elemento pai
            tooltips: {
                enabled: false //Desativa tooltips pois não são necessários
            }
        }
    });
}

function getItems(){
    return [
        {
            material: 'material 001',
            sts: 'ativo',
            dataSep: '12/12/2018 12:00:00',
            vendedor: 'Marcelo Montalvão',
            numNFE: 12345,
            dataNFE: '13/12/2018 15:00:00',
            dataMinuta: '15/12/2018 09:30:00',
            dataRecebimento: '15/12/2018 11:30:00',
            status: 'criado'
        },{
            material: 'material 002',
            sts: 'ativo',
            dataSep: '12/12/2018 12:00:00',
            vendedor: 'Marcelo Montalvão',
            numNFE: 12345,
            dataNFE: '13/12/2018 15:00:00',
            dataMinuta: '15/12/2018 09:30:00',
            dataRecebimento: '15/12/2018 11:30:00',
            status: 'validacao'
        },{
            material: 'material 003',
            sts: 'ativo',
            dataSep: '12/12/2018 12:00:00',
            vendedor: 'Marcelo Montalvão',
            numNFE: 12345,
            dataNFE: '13/12/2018 15:00:00',
            dataMinuta: '15/12/2018 09:30:00',
            dataRecebimento: '15/12/2018 11:30:00',
            status: 'faturado'
        },{
            material: 'material 004',
            sts: 'ativo',
            dataSep: '12/12/2018 12:00:00',
            vendedor: 'Marcelo Montalvão',
            numNFE: 12345,
            dataNFE: '13/12/2018 15:00:00',
            dataMinuta: '15/12/2018 09:30:00',
            dataRecebimento: '15/12/2018 11:30:00',
            status: 'validacao'
        },{
            material: 'material 005',
            sts: 'ativo',
            dataSep: '12/12/2018 12:00:00',
            vendedor: 'Marcelo Montalvão',
            numNFE: 12345,
            dataNFE: '13/12/2018 15:00:00',
            dataMinuta: '15/12/2018 09:30:00',
            dataRecebimento: '15/12/2018 11:30:00',
            status: 'separacao'
        },{
            material: 'material 006',
            sts: 'recusado',
            dataSep: '',
            vendedor: 'Marcelo Montalvão',
            dataMinuta: '',
            dataRecebimento: '',
            numNFE: '',
            dataNFE: '',
            status: 'criado'
        }
    ];
}