import Cookies from 'universal-cookie'
import { useDispatch } from "react-redux"
import { changeAuth } from '../redux/auth'
import { setUsername } from '../redux/user'
import { Link } from 'react-router-dom';

export async function getAuth() {
    const dispatch = useDispatch();

    fetch('api/auth', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) =>
        response.json())
    .then((data) => {
        // console.log(data);
        // if data is succes, set isauth to true else false
        if (data.isAuthenticated && data.isAuthenticated === 'success' && data.username !== null) {
            dispatch(changeAuth(true));
            dispatch(setUsername(data.username));
        }
    })
    .catch((err) =>
        console.log(err)
    );
}

export async function register(username, password) {
    const cookies = new Cookies();

    let authResponse = {};

    await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': cookies.get('csrftoken'),
        },
        //credentials: 'same-orgin',
        body: JSON.stringify({username, password}),
    })
    .then((response) =>
        response.json())
    .then((data) => {
        // console.log(data);
        authResponse = data
    })
    .catch((err) => {
        console.log(err);
        authResponse = err;
    });
    return authResponse;
}

// this function is async so that we can wait for the auth status, and change it if necissary once the login is finished
export async function login(username, password) {
    const cookies = new Cookies();
    let wasAuthSuccessful = false;
    await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': cookies.get('csrftoken'),
        },
        // credentials: 'same-orgin',
        body: JSON.stringify({username, password}),
    })
    .then((response) =>
        response.json())
    .then((data) => {
        // console.log(data);
        if (data.success) wasAuthSuccessful = true;
    })
    .catch((err) => {
        console.log(err);
    });
    return wasAuthSuccessful;
}

export function signOut() {
    const cookies = new Cookies();
    fetch('/api/logout', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': cookies.get('csrftoken')
        },
        body: JSON.stringify({'withCredentials': true}),
    })
    .then((response) => {
        response.json()})
    .then((data) => {
        // console.log(data);
        window.location.reload();
    })
    .catch((err) =>
        console.log(err)
    );
}

export function deleteAccount() {
    const cookies = new Cookies();
    fetch('/api/deleteaccount', {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': cookies.get('csrftoken')
        },
        body: JSON.stringify({'withCredentials': true}),
    })
    .then((response) => 
        response.json())
    .then((data) => {
        // console.log(data);
        //need to send user to '/'
        
    })
    .catch((err) =>
    console.log(err)
    );
}