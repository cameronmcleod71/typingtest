import React from 'react'
import { Heading, Spacer, Box, Flex, Container, Text, Menu, MenuButton, MenuList, MenuItem, MenuGroup, Button, useRadio } from "@chakra-ui/react"
import { Form, Link, Navigate, useNavigate } from "react-router-dom"
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useSelector, useDispatch } from 'react-redux'
import CSRFToken from './CSRFToken'
import ResultsPage from '../pages/ResultsPage'
import PastResults from '../pages/PastResults'
import { signOut } from '../utils/auth'


export default function Navbar() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const username = useSelector((state) => state.user.username);

    return (
        <Container>
            <Flex as="nav" p="30px" bg="grey.200" justifyContent="space-between" alignItems="center">
                <Menu flex={1}>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        Menu
                    </MenuButton>
                    <MenuList>
                        <MenuItem> Special Chararacter Test</MenuItem>
                        <MenuItem> Leaderboard </MenuItem>
                    </MenuList>
                </Menu>
                <Spacer />
                <Box flex={1}>
                    <Link to="/">
                        <Heading as="h1" textAlign="center">Typer</Heading>
                    </Link>
                </Box>
                <Spacer />
                <Box flex={1}>
                    { 
                    isAuthenticated ?

                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                { username }
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Account</MenuItem>
                                <Link to="/pastresults">
                                    <MenuItem>Results</MenuItem>
                                </Link>
                                <CSRFToken />
                                <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
                            </MenuList>
                        </Menu>
                    :
                        <Link to="/login">
                            <Text textAlign="center" as={Button}>Sign In</Text>
                        </Link>
                    }
                </Box>
            </Flex>
        </Container>
    )
}