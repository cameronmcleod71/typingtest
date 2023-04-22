import React, { useState } from 'react'
import { Box, Flex, Heading, HStack, Select, Spacer, Text, VStack } from '@chakra-ui/react'
import Highlight, { defaultProps } from "prism-react-renderer";
import dracula from 'prism-react-renderer/themes/nightOwl'



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
        </Box>
    )
}

function TyperTextContainer(props) {
    return (
        <Box paddingY="10px">
            <HStack>
                <Text color="#7f838e" fontSize={{base:"lg",lg:"2xl"}} paddingRight="30px">{props.text}</Text>
                <Box style={ (props.text === props.curLine.toString()) ? {background: '#2B3A55' } : {}} borderRadius="md">
                    <HighlightLine lineChars={props.testChars} curLine={ props.text === props.curLine.toString() } curIndex={props.curIndex}/>
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

function HighlightLine(props) {

    function codeArrayToString(array) {
        return (array.map((obj,index) => (obj.space ? " ".repeat(parseInt(obj.space)) : obj.expected)).join(""));
    }
    const codeToPrint = codeArrayToString(props.lineChars);
    let lineIndex = 0;

    // console.log("Token", codeToPrint, "Object", props.lineChars);

    //need to make a function to remove consecutive spaces before we map
    function removeExtraSpace(s) {
        let prevChar = "";
        let curChar = "";
        let newS = "";
        for (let x = 0; x<s.length; x++) {
            curChar = s.charAt(x);
            if (prevChar === " " && curChar === prevChar) {
            } else {
                newS += curChar;
            }
            prevChar = curChar;       
        }
        return newS;
    }

    return (
    <Box required="true" fontFamily="Iosevka" fontSize={{base:"xl",lg:"3xl"}} mx="10px">
        <Highlight {...defaultProps} code={codeToPrint} language="python" theme={dracula}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={style}>
                {tokens.map((line, i) => (
                    <div  {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => {
                        if (token.content === "\n") return (<span></span>);
                        return (<span {...getTokenProps({ token, key })}>
                            <span>
                            {
                                token.content === "" ? <span></span> :
                                //note: newline will just be an empty token
                                removeExtraSpace(token.content).split("").map((char,index) => {
                                    if (char === "\n") return (<span></span>);
                                    // let curTokenChar = char === "" ? "\n" : char;
                                    let curTokenChar = char;
                                    // if curLetter is incorrect, make it wrong color, if its correct make opacity 0.6
                                    let curCharObj = props.lineChars[lineIndex];
                                    if (lineIndex<props.lineChars.length-1) lineIndex+=1;


                                    if (curTokenChar === " ") {
                                        if (curCharObj.given === "") { //we havnt reached this yet so just print all spaces
                                            return (<span style={{"white-space":'pre'}}>{" ".repeat(parseInt(curCharObj.space))}</span>);
                                        } else {
                                            return( [...curCharObj.given].map((char, index) => {
                                                if (char === " " || char === "\n") {// return correct character
                                                    return (<span style={{filter:"opacity(0.3)", "white-space":'pre'}}>{" "}</span>);
                                                } else { // return it as wrong
                                                    return (<span style={{color:'#F9F871', "white-space":'pre'}}>{char+(index === curCharObj.given.length-1 ? " " : "")}</span>);
                                                }                        
                                            }));
                                            
                                        }
                                    } else if (curCharObj.given === "") { // proceed as if we havnet reached it yet
                                        return ( <span>{curTokenChar === "\n" ? "" : curTokenChar}</span>);
                                    } else {
                                        if (curTokenChar === "\n") { //print all extra chars that are not newline as wrong
                                            return (
                                                [...curCharObj.given].map((char) => { 
                                                    if (char === "\n") {
                                                        //may change this to nothing
                                                        return (<span style={{color:'#238A84', "white-space":'pre'}}>{""}</span>);
                                                    } else {
                                                        return (<span style={{color:'#F9F871', "white-space":'pre'}}>{char}</span>);
                                                    }
                                            }));
                                        } else if (curCharObj.expected === curCharObj.given) {
                                            return (<span style={{filter:'opacity(0.3)'}}>{curTokenChar}</span>);
                                        } else if (curCharObj.expected !== curCharObj.given) {
                                            return (<span style={{color:'#F9F871'}}>{curTokenChar}</span>);
                                        }
                                    }
                                }
                                )
                            }
                            </span>
                        </span>);

                        // console.log("The token: ", token.content);
                        // if(token.content === "in") {
                        //     console.log("herehere");
                        //     return (<span {...getTokenProps({ token, key })}>{["i",<span style={{color: "#E91111"}}>n</span>]}</span>);
                        // } else {
                        //     return (<span {...getTokenProps({ token, key })} style={{filter: "opacity(0.5)"}} />);
                        // }
                    })}
                    </div>
                ))}
                </pre>
            )}
        </Highlight>
    </Box>
    );
}