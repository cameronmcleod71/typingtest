import React, { useState } from 'react'
import { Box, Flex, Heading, HStack, Select, Spacer, Text, VStack } from '@chakra-ui/react'

export default function SpecialCharTestView(props) {

    const noCopyCSS = {
        'user-Select': 'none',
        '-webkit-user-select': 'none',
    };
    return (
        <Box fontFamily="Iosevka" sx={noCopyCSS} p="15px">
            { 
                Object.keys(props.testText).map((key) => {
                    return <TyperTextContainer testChars={props.testText[key]} text={key} curLine={props.curLine} curIndex={props.curIndex} />
                })
            }
        </Box>
    )
}

function TyperTextContainer(props) {
    return (
        <Box paddingY="10px">
            <HStack>
                <Text color="#7f838e" fontSize={{base:"lg",lg:"2xl"}} paddingRight="30px">{props.text}</Text>
                <Box style={ (props.text === props.curLine.toString()) ? {background: '#2B3A55' } : {}} borderRadius="md">
                    <TyperText lineChars={props.testChars} curLine={ props.text === props.curLine.toString() } curIndex={props.curIndex}/>
                </Box>
            </HStack>
        </Box>
    )
}

function TyperText(props) {
    return (
        <Box required="true">
            <Text fontFamily="Iosevka" fontSize={{base:"3xl",lg:"5xl"}} mx="10px">
                
                {
                props.lineChars.length === 0 ? <pre style={{"font-family":"Iosevka"}}>                   </pre> :
                    props.lineChars.map((obj,index) => {
                        
                        if (obj.value === "x"){
                            return (<span style={{color:'#F9F871'}}>{obj.word + " "}</span>);
                        } else if (obj.value === "o") {
                            return (<span style={{color:'#238A84'}}>{obj.word + " "}</span>);
                        } else {
                            return ( <span style={{'color':'#A5ABBD'}}><span style={ ( props.curLine && index === props.curIndex ) ? {'color':'#1F2430', 'text-decoration': 'underline 4px1', "text-underline-position1": "under", "text-underline-offset1": "4px","border-radius":"6px","background":'#A5ABBD',"text-align":"center"} : {'color':'#A5ABBD'}}>{obj.word}</span>{" "}</span>);
                        };

                    })
                }
            </Text>
        </Box>
    )
}