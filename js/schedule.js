//import { create } from "domain";

var inputAgenda = document.getElementById("InputAgenda");
var btnDados = document.getElementById("btnDados");
var inputDelete = document.getElementById("InputDelete");
var btnDelete = document.getElementById("btnDelete");
var dataList = document.getElementById("dataList");
var data_id = false;

btnDados.addEventListener('click', function(){
    create(inputAgenda.value);  //Recebe o valor do inputAgenda
});

btnDelete.addEventListener('click', function(){
    deleta(inputDelete.value);
});

function create(dados){
    var data = {
        dados: dados,
        createdat: firebase.database.ServerValue.TIMESTAMP,
    };

    return firebase.database().ref().child('dados').push(data);
}

function deleta(dados){
    var data = {
        dados: dados,
        createdat: firebase.database.ServerValue.TIMESTAMP,
    };

    return firebase.database().ref().child('dados').push(data);
}

firebase.database().ref('dados').on('value', function(snapshot){
    dataList.innerHTML = '';
    snapshot.forEach(function (item){
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(item.val().dados));
        dataList.appendChild(li);
    });
});
