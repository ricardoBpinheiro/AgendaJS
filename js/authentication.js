var btnLogin = document.getElementById('btnLogin');
var inputEmail = document.getElementById('InputEmail');
var inputPassword = document.getElementById('InputPassword');

btnLogin.addEventListener('click', function(){
    firebase.auth().signInWithEmailAndPassword(inputEmail.value, inputPassword.value).then(function (result){  // .value vai capturar o valor dado ao elemento
        alert("Usuario Conectado!");
        console.log("Sucesso!");

        window.location.replace('initial-page.html');  //Redireciona o usuario para a outra pagina

    }).catch(function(error) {   
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...

        alert(errorMessage);
        console.log("Falha na conexao!");
      });
});
