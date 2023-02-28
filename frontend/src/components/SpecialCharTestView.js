import React from 'react'
import { Box, Flex, Heading, HStack, Select, Spacer, Text, VStack } from '@chakra-ui/react'

export default function SpecialCharTestView(props) {

    const noCopyCSS = {
        'user-Select': 'none',
        '-webkit-user-select': 'none',
    };
    return (
        <Box fontSize="2xl" fontFamily="Iosevka" sx={noCopyCSS}>
            <TyperTextContainer testChars={props.prevChars} text="Prev: " />
            <TyperTextContainer testChars={props.curChars} text="Curr: " />
            <TyperTextContainer testChars={props.approachingChars} text="Next: " />
        </Box>
    )
}

function TyperTextContainer(props) {
    return (
        <Flex justifyContent="center" alignItems="center">
            <Text flex={1}>{props.text}</Text>
            <TyperText lineChars={props.testChars} />
            <Spacer w="200px" flex={1} />
        </Flex>
    )
}

function TyperText(props) {
    return (
        <Box p="5px"  my="10px" bg="gray.200" borderRadius="2xl" required="true">
            <Text fontFamily="Iosevka" fontSize="4xl" mx="10px">
                
                {
                props.lineChars.length === 0 ? <pre style={{"font-family":"Iosevka"}}>                   </pre> :
                    props.lineChars.map((obj) => {
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