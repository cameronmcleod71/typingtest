import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'


export default function CSRFToken() {
    const cookies = new Cookies();
    
    const [CSRFToken, setCSRFToken] = useState('');

    useEffect(() => {
        try {
            fetch('/api/csrf_token')
            .then((response) => 
                response.json())
            .then((data) => {
                console.log(data);
                setCSRFToken(cookies.get('csrftoken'));
            })
        } catch {
            console.log('something went wrong when fetching the csrf token');
        }
    }, []);

    return (
        <input type='hidden' name='csrfmiddlewaretoken' value={CSRFToken} />
    );
}