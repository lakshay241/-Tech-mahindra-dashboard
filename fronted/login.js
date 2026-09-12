"use strict";


/* =========================================
   LOGIN CREDENTIALS
========================================= */

const VALID_USERNAME = "Lakshay";
const VALID_PASSWORD = "Lakshay@25";


/* =========================================
   ELEMENTS
========================================= */

const loginForm =
    document.getElementById("loginForm");

const usernameInput =
    document.getElementById("username");

const passwordInput =
    document.getElementById("password");

const loginError =
    document.getElementById("loginError");

const showPassword =
    document.getElementById("showPassword");


/* =========================================
   SHOW / HIDE PASSWORD
========================================= */

if (showPassword) {

    showPassword.addEventListener(
        "click",
        function () {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                showPassword.textContent = "HIDE";

            } else {

                passwordInput.type = "password";

                showPassword.textContent = "SHOW";

            }

        }
    );

}


/* =========================================
   CLEAR ERROR WHEN USER TYPES
========================================= */

usernameInput.addEventListener(
    "input",
    function () {

        loginError.textContent = "";

    }
);


passwordInput.addEventListener(
    "input",
    function () {

        loginError.textContent = "";

    }
);


/* =========================================
   LOGIN
========================================= */

loginForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const username =
            usernameInput.value.trim();

        const password =
            passwordInput.value;


        /* ==============================
           USERNAME CHECK
        ============================== */

        if (username !== VALID_USERNAME) {

            loginError.textContent =
                "Invalid username.";

            usernameInput.focus();

            return;

        }


        /* ==============================
           PASSWORD CHECK
        ============================== */

        if (password !== VALID_PASSWORD) {

            loginError.textContent =
                "Invalid password.";

            passwordInput.focus();

            return;

        }


        /* ==============================
           SUCCESS
        ============================== */

        loginError.textContent = "";


        // Save authenticated user
        loginUser(username);


        // Go to dashboard
        window.location.replace("index.html");

    }
);