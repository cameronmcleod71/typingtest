import { Box, Button, FormControl, Heading, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Form, Link } from 'react-router-dom';
import Cookies from 'universal-cookie'
import CSRFToken from '../components/CSRFToken'

function login(username, password) {
    const cookies = new Cookies();

    fetch('/api/login', {
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
        console.log(data);
        //SET THE isAuthenticated STATE here
    })
    .catch((err) => {
        console.log(err);
    });
}


export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const {username, password} = formData;

    const onSubmit = e => {
        e.preventDefault();
        login(username, password);
    }

    return (
        <Box>
            <Heading>Sign In</Heading>
            <Box>
                <Form onSubmit={e => onSubmit(e)}>
                    <CSRFToken />
                    <FormControl isRequired>
                        <Input type='text' placeholder='Username' name='username' onChange={e => onChange(e)} value={username} />
                        <Input type='password' placeholder='Password' name='password' onChange={e => onChange(e)} value={password} minLength='6' />
                    </FormControl>
                    <Button type='submit'>Sign in</Button>
                </Form>
            </Box>
            <Text>Havn't made an account? </Text>
            <Link to='/register'>Register Here!</Link>
        </Box>
    )

}