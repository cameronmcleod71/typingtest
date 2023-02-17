import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'

export default function SpecialCharTestView (props) {
    return (
        <Box>
            <TyperText testChars={props.prevChars} />
            <TyperText testChars={props.curChars} />
            <TyperText testChars={props.approachingChars} />
        </Box>
    )
}

function TyperText(props) {
    return (
        <Box>
            <Text>
                    { props.testChars.map((obj) => {
                        if (obj.value === "x"){
                            return (<span style={{color:'red'}}>{obj.word + " "}</span>);
                        } else if (obj.value === "o") {
                            return (<span style={{color:'green'}}>{obj.word + " "}</span>);
                        } else {
                            return ( <span style={{color:'black'}}>{obj.word + " "}</span> );
                        };

                    }) } 

            </Text>
        </Box>
    )
}