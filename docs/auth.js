"use strict";


/* =========================================
   AUTH STORAGE KEYS
========================================= */

const AUTH_KEY = "tmAuthenticated";
const USER_KEY = "tmUser";


/* =========================================
   CHECK LOGIN
========================================= */

function isAuthenticated() {

    return sessionStorage.getItem(AUTH_KEY) === "true";

}


/* =========================================
   PROTECT DASHBOARD
========================================= */

function protectPage() {

    if (!isAuthenticated()) {

        window.location.replace("login.html");

    }

}


/* =========================================
   LOGIN USER
========================================= */

function loginUser(username) {

    sessionStorage.setItem(
        AUTH_KEY,
        "true"
    );


    sessionStorage.setItem(
        USER_KEY,
        JSON.stringify({
            name: username
        })
    );

}


/* =========================================
   GET LOGGED-IN USER
========================================= */

function getLoggedInUser() {

    const user =
        sessionStorage.getItem(USER_KEY);


    if (!user) {

        return null;

    }


    try {

        return JSON.parse(user);

    } catch (error) {

        return null;

    }

}


/* =========================================
   LOGOUT
========================================= */

function logoutUser() {

    sessionStorage.removeItem(
        AUTH_KEY
    );


    sessionStorage.removeItem(
        USER_KEY
    );


    window.location.replace(
        "login.html"
    );

}