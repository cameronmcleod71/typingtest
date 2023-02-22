import React from 'react'
import { Heading, Spacer, Box, Flex, Container, Text, Menu, MenuButton, MenuList, MenuItem, MenuGroup, Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { ChevronDownIcon } from '@chakra-ui/icons'


export default function Navbar() {
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
                    <Link to="/" onClick={() => window.location.reload()}>
                        <Heading as="h1" textAlign="center">Typer</Heading>
                    </Link>
                </Box>
                <Spacer />
                <Box flex={1}>
                    <Link to="/login">
                        <Text textAlign="center" as={Button}>Sign In</Text>
                    </Link>
                </Box>
            </Flex>
        </Container>
    )
}