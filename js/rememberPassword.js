var checkboxPassword = document.getElementById('customCheck');
var InputEmail = document.getElementById('InputEmail');
var InputPassword = document.getElementById('InputPassword');

if (localStorage.checkbox && localStorage.checkbox != "") {
    checkboxPassword.setAttribute("checked", "checked");
    InputEmail.value = localStorage.username;
    //localStorage.password = InputPassword.value;
} else {
    checkboxPassword.removeAttribute("checked");
    InputEmail.value = "";
   //InputPassword.value = "";
}

function lsRememberMe() {
    if (checkboxPassword.checked && InputEmail.value != "") {
        localStorage.username = InputEmail.value;
        //localStorage.password = InputPassword.value;
        localStorage.checkbox = checkboxPassword.value;
    } else {
        localStorage.username = "";
        localStorage.password = "";
        localStorage.checkbox = "";
    }
}