import { Box, Container, Select, Heading, Text, Tabs, TabList, Tab, TabPanels, TabPanel, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { getPastResults } from '../utils/typingtestresults'
import ResultCard from "../components/ResultCard"

export default function PastResults() {
    const [ results, setResults ] = useState([]);
    const [ count, setCount] = useState(25);
    useEffect(()=> {
        try { 
            getPastResults().then((pastResults) => {
                setResults(pastResults);
            });
        } catch {
            console.log("something went wrong grabbing past results");
        }
    }, []);

    return (
        <Box padding="20px" display="flex" justifyContent="center" width="100%">
            <VStack width="100%">
                <Heading>Past Results</Heading>
                <Tabs colorScheme="red" width="100%">
                    <TabList>
                        <Tab width="100%">Programmer Mode</Tab>
                        <Tab width="100%">Special Character Mode</Tab>
                        <Box display="flex" justifyContent="flex-end" width="100%" marginRight="20px">
                            <Select colorScheme="red" placeholder='Count' width="100px" size="sm">
                                <option value='10'>10</option>
                                <option value='25'>25</option>
                                <option value='50'>50</option>
                                <option value='100'>50</option>
                            </Select>
                        </Box>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            {
                                results.filter((obj) => obj.test_type==="programmer").reverse().slice(0,count).map((item,index) => {
                                    return (
                                        <ResultCard accuracy={JSON.parse(item.results)["accuracy"]} wpm={JSON.parse(item.results)["wpm"]} cpm={JSON.parse(item.results)["cpm"]} type={item.test_type} duration={item.duration} timestamp={item.time_taken} />
                                    )
                                })
                            }
                        </TabPanel>
                        <TabPanel>
                            {
                                results.filter((obj) => obj.test_type==="specialc").reverse().slice(0,count).map((item,index) => {
                                    return (
                                        <ResultCard accuracy={JSON.parse(item.results)["accuracy"]} wpm={JSON.parse(item.results)["wpm"]} cpm={JSON.parse(item.results)["cpm"]} type={item.test_type} duration={item.duration} timestamp={item.time_taken} />
                                    )
                                })
                            }

                        </TabPanel>

                    </TabPanels>
                </Tabs>
            </VStack>
        </Box>
    )
}