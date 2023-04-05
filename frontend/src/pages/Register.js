import { Box, FormControl, Heading, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Form } from 'react-router-dom';
import CSRFToken from '../components/CSRFToken'
import { register } from '../utils/auth'

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const {username, password} = formData;

    const onSubmit = e => {
        e.preventDefault();
        register(username, password);
    }

    return (
        <Box color="#abb2bf" >
            <Heading>Register</Heading>
            <Box>
                <Form onSubmit={e => onSubmit(e)}>
                    <CSRFToken />
                    <FormControl isRequired>
                        <Input type='text' placeholder='Username' name='username' onChange={e => onChange(e)} value={username} />
                        <Input type='password' placeholder='Password' name='password' onChange={e => onChange(e)} value={password} minLength='6' />
                    </FormControl>
                    <button type='submit'>Sign in</button>
                </Form>
            </Box>
        </Box>
    )

}