/* função main */
/* 
-Ordenar o arduino a começar a registar dados 
-parar o arduino 
-apagar records 
-consultar records 
*/
//xhr-> XMLHttpRequest 
// --  Função para Escondero btão de HTML -- 

//document.getElementById("stopButton").style.display = "none";





function xhrSuccess() {
    this.callback.apply(this, this.arguments);
}

function xhrError() {
    console.error(this.statusText);
}


//url vai ser o do localhost 
//value 1 pra começar 0 para parar
//callback secalhar não é preciso 
/**
 * É o url da rota 
 * @param {*} url 
 * Value é decidido pelo butão Start- 1 Stop-0
 * @param {*} value 
 * Callback é o alerta
 * @param {*} callback
 * Parque vai ser o valor passado pelo select do input  
 * @param {*} parque 
 */
function order(url, value, callback, parque) {
    console.log(url)
    console.log(value)
    console.log(callback)
    console.log(parque)
    console.log(arguments)
    var data = {};
    data.action = value;
    data.parque = parque;
    var json = JSON.stringify(data);
    var xhr = new XMLHttpRequest();
    xhr.callback = callback;
    xhr.arguments = Array.prototype.slice.call(arguments, 2);
    xhr.onload = xhrSuccess;
    xhr.onerror = xhrError;
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(json);
}

/* funções secundárias*/
/*
Função envia dois dados para o controller 
se o value da função for 1 ele assume que está "ligado"
se o value da função for 0 ele assume que está "desligado"

*/
function ard_start() {
    var parque = document.getElementById('parqueSel').value;

    order('http://localhost:3000/configs/', 1, alertStart, parque)
    document.getElementById("startButton").style.display = "none";
    document.getElementById("stopButton").style.display = "inline";
}

function ard_stop() {
    var parque = document.getElementById('parqueSel').value;

    order('http://localhost:3000/configs/', 0, alertStop,parque)
    document.getElementById("startButton").style.display = "inline";
    document.getElementById("stopButton").style.display = "none";
}



function alertStart() {
    alert(JSON.parse(this.responseText).message);
}

function alertStop() {
    alert(JSON.parse(this.responseText).message);
}