var inputEmail = document.getElementById('InputEmail');
var inputPassword = document.getElementById('InputPassword');
var btnRegister = document.getElementById('btnRegister');

btnRegister.addEventListener('click', function(){
    firebase.auth().createUserWithEmailAndPassword(inputEmail.value, inputPassword.value).then(function (result){
        alert("Usuario Cadastrado com Sucesso!");
        console.log("Sucesso");
        window.location.replace('agenda.html');

    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        alert(errorMessage);
        console.log("Falha no cadastro!");
      });
});
