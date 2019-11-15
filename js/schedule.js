//import { create } from "domain";

var inputAgenda = document.getElementById("InputAgenda");
var btnDados = document.getElementById("btnDados");
var dataList = document.getElementById("dataList");

btnDados.addEventListener('click', function(){
    create(inputAgenda.value);  //Recebe o valor do inputAgenda
});

function create(dados){
    var data = {
        dados: dados
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