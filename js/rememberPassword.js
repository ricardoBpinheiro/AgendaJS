var checkboxPassword = document.getElementById('checkboxPassword');
var InputEmail = document.getElementById('InputEmail');
var InputPassword = document.getElementById('InputPassword');

if (localStorage.checkbox && localStorage.checkbox != "") {
    checkboxPassword.setAttribute("checked", "checked");
    InputEmail.value = localStorage.username;
} else {
    checkboxPassword.removeAttribute("checked");
    InputEmail.value = "";
}

function lsRememberMe() {
    if (checkboxPassword.checked && InputEmail.value != "") {
        localStorage.username = InputEmail.value;
        localStorage.checkbox = checkboxPassword.value;
    } else {
        localStorage.username = "";
        localStorage.checkbox = "";
    }
}