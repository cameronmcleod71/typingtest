import React, { useEffect } from 'react'
import { useState } from 'react'
import { Container, Heading } from '@chakra-ui/react'
import SpecialCharTestView from '../components/SpecialCharTestView'
import SpecialCharTestInput from '../components/SpecialCharTestInput'
import { exampleSpecialTest } from '../typingtest/specialchar'




export default function SpecialCharTest() {
    const [typingTest, setTypingTest] = useState([]);

    useEffect(
        () => {
            fetch('/api/typingtest')
            .then((response) => 
                response.json())  //Note for future me: when you have a function with one line, javascript will return whats on that one line
            .then((data) => {
                setTypingTest(data.test)
            });
        },
        []
    )
            
    return (
       <Container>
            <SpecialCharTestView specialCharTest={typingTest} />
            <SpecialCharTestInput />
       </Container>
    )
}

