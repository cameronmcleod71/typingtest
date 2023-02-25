import { Box, Container, Heading, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import ResultsPage from './ResultsPage';

export default function PastResults() {
    const [ results, setResults ] = useState([]);
    useEffect(()=> {
        try {
            fetch('api/getspecialchartest', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) =>
                response.json())
            .then((data) => {
                console.log(data);
                if (data.success) {
                    setResults(data.success);
                }
            })
            .catch((err) =>
                console.log(err)
            );
        } catch {
    
        }
    }, []);
    console.log(results);

    return (
        <Container>
            <Heading>Past Results</Heading>
            { 
            // results !== undefined ?
            //     results.forEach((item,index) => {
            //         return (
            //             <Box>
            //                 <Heading as="h3">Test {index+1}</Heading>
            //                 <Heading as="h3">Duration: {item.duration}</Heading>
            //                 <Text>{ item.results }</Text>
            //             </Box>
            //         )
            //     })
            // :
            // <Text></Text>
            results.map((item,index) => {
                return (
                    <Box>
                        <Text fontSize="md" fontWeight="bold">Test {index+1}</Text>
                        <Text as="h3">Duration: {item.duration}</Text>
                        <Text>{ item.results }</Text>
                        <br />
                    </Box>
                )
            })
            }
        </Container>
    )



}