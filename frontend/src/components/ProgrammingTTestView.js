import React, { useState } from 'react'
import { Box, Flex, Heading, HStack, Select, Spacer, Text, VStack } from '@chakra-ui/react'

export default function ProgrammingTTestView(props) {

    const noCopyCSS = {
        'user-Select': 'none',
        '-webkit-user-select': 'none',
    };
    return (
        <Box fontFamily="Iosevka" sx={noCopyCSS} p="15px">
            <Box>
            { 
                Object.keys(props.testText).map((key) => {
                    return <TyperTextContainer testChars={props.testText[key]} text={key} curLine={props.curLine} curIndex={props.curIndex} />
                })
            }
            </Box>
            {/* <Text>{props.testText["1"][3]["char"]}</Text> */}
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
            <Text fontFamily="Iosevka" fontSize={{base:"xl",lg:"3xl"}} mx="10px">
                
                {

                    props.lineChars.length === 0 ? <pre style={{"font-family":"Iosevka"}}>test</pre> :
                    props.lineChars.map((obj,index) => {
                        if (obj.space) {
                            if (obj.given === "") { //we havnt reached this yet so just print all spaces
                                return (<span style={{"white-space":'pre'}}>{" ".repeat(parseInt(obj.space))}</span>);
                            } else {
                                return( [...obj.given].map((char, index) => {
                                    if (char === " " || char === "\n") {// return correct character
                                        return (<span style={{color:'#238A84', "white-space":'pre'}}>{" "}</span>);
                                    } else { // return it as wrong
                                        return (<span style={{color:'#F9F871', "white-space":'pre'}}>{char+(index === obj.given.length-1 ? " " : "")}</span>);
                                    }                        
                                }));
                                
                            }
                        } else if (obj.given === "") { // proceed as if we havnet reached it yet
                            return ( <span style={{color:'#A5ABBD'}}>{obj.expected}</span>);
                        } else {
                            if (obj.expected === "\n") { //print all extra chars that are not newline as wrong
                                return (
                                    [...obj.given].map((char) => { 
                                        if (char === "\n") {
                                            //may change this to nothing
                                            return (<span style={{color:'#238A84', "white-space":'pre'}}>{""}</span>);
                                        } else {
                                            return (<span style={{color:'#F9F871', "white-space":'pre'}}>{char}</span>);
                                        }
                                }));
                            } else if (obj.expected === obj.given) {
                                return (<span style={{color:'#238A84'}}>{obj.expected}</span>);
                            } else if (obj.expected !== obj.given) {
                                return (<span style={{color:'#F9F871'}}>{obj.expected}</span>);
                            }
                        }
                        
                    })
                }
            </Text>

        </Box>
    )
}