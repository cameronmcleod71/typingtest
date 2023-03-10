import { Box, Container, Heading, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { getPastResults } from '../utils/typingtest'

export default function PastResults() {
    const [ results, setResults ] = useState([]);
    useEffect(()=> {
        try { 
            getPastResults().then((pastResults) => {
                setResults(pastResults);
            });
        } catch {
            console.log("something went wrong grabbing past results");
        }
    }, []);
    console.log(results);

    return (
        <Container>
            <Heading>Past Results</Heading>
            { 
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