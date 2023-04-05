import { Heading, HStack, VStack, Box, Container, Button } from '@chakra-ui/react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteAccount } from '../utils/auth'



export default function Profile() {
    const navigate = useNavigate();

    function handleButtonPress() {
        deleteAccount();
        navigate("/");
        window.location.reload();
    }


    return (
        <Box bg="#1F2430" color="#abb2bf" h="100vh">
            <Container>
                <Heading>Account</Heading>
                <VStack>
                    <HStack></HStack>
                    <Button onClick={() => handleButtonPress()} bg="red">Delete Account</Button>
                </VStack>
            </Container>
        </Box>

    )

}