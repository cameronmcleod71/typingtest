import React from 'react'
import { Box, Flex, Heading, HStack, Select, Spacer, Text, VStack } from '@chakra-ui/react'

export default function SpecialCharTestView (props) {

    const noCopyCSS = {
        'user-Select': 'none',
        '-webkit-user-select': 'none',
    };
    return (
        <Box fontSize="2xl" fontFamily="Iosevka" sx={noCopyCSS}>
            {/* <HStack>
                <VStack>
                    <Text whiteSpace="pre">Prev: </Text>
                    <Text whiteSpace="pre">Curr: </Text>
                    <Text whiteSpace="pre">Next: </Text>
                </VStack>
                <VStack>
                    <TyperText testChars={props.prevChars} />
                    <TyperText testChars={props.curChars} />
                    <TyperText testChars={props.approachingChars} />
                </VStack>
                <pre >      </pre>  
            </HStack> */}
            <Flex justifyContent="center" alignItems="center">
                <Text flex={1}>Prev: </Text>
                <TyperText testChars={props.prevChars} />
                <Spacer w="200px" flex={1} />
            </Flex>
            <Flex justifyContent="center" alignItems="center">
                <Text flex={1}>Curr: </Text>
                <TyperText testChars={props.curChars} />
                <Spacer w="200px" flex={1} />
            </Flex>
            <Flex justifyContent="center" alignItems="center">
                <Text flex={1}>Next: </Text>
                <TyperText testChars={props.approachingChars} />
                <Spacer w="200px" flex={1} />
            </Flex>
        </Box>
    )
}

function TyperText(props) {
    return (
        <Box p="5px"  my="10px" bg="gray.200" borderRadius="2xl" required="true">
            <Text fontFamily="Iosevka" fontSize="4xl" mx="10px">
                
                {
                props.testChars.length === 0 ? <pre style={{"font-family":"Iosevka"}}>                   </pre> :
                    props.testChars.map((obj) => {
                        if (obj.value === "x"){
                            return (<span style={{color:'red'}}>{obj.word + " "}</span>);
                        } else if (obj.value === "o") {
                            return (<span style={{color:'green'}}>{obj.word + " "}</span>);
                        } else {
                            return ( <span style={{color:'black'}}>{obj.word + " "}</span> );
                        };

                    })
                }
            </Text>
        </Box>
    )
}