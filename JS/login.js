$(document).ready(function() {
    $('#btn-login').click(function() {
        var email = $('#login-email').val().trim()
        var pass = $('#login-pass').val()

        var users = JSON.parse(localStorage.getItem("users")) || []

        var user = users.find(u => u.email === email && u.pass === pass)

        if(user) {
            localStorage.setItem("currentUser", JSON.stringify(user))
            alert("Login Successful!")
            window.location.href = "home.html"
        } else {
            alert("Invalid Email or Password.")
        }
    })
})