var inputEmail = document.getElementById('InputEmail');
var btnReset = document.getElementById('btnReset');

btnReset.addEventListener('click', function(){
    firebase.auth().sendPasswordResetEmail(inputEmail.value).then(function(result) {

      alert("Email enviado");
      console.log("Sucesso");
      window.location.replace('index.html');

    }).catch(function(error) {

      alert("Ocorreu um erro");
      console.log("Error");

    });
});
