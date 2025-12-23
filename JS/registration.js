$(document).ready(function() {
    $('#btn-register').click(function() {
        var name = $('#reg-name').val().trim();
        var email = $('#reg-email').val().trim();
        var pass = $('#reg-pass').val();
        var pref = $('input[name="pref"]:checked').val();
        var agree = $('#agree').is(':checked');

        if(name === "" || email === "" || pass === "" || !pref) {
            alert("Please fill in all fields.");
            return;
        }
        if(!agree) {
            alert("You must agree to the terms.");
            return;
        }

        if(confirm("Confirm registration details?")) {
            var users = JSON.parse(localStorage.getItem("users")) || [];

            var exists = users.some(u => u.email === email);
            if(exists) {
                alert("Email already registered! Please login.");
                return;
            }

            var newUser = {
                id: Date.now(),
                name: name,
                email: email,
                pass: pass,
                pref: pref,
                tasks: [] 
            };

            // Save
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));
            
            alert("Registration Successful!");
            window.location.href = "login.html";
        }
    });
});