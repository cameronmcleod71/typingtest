import React from "react";
import { Box } from "@chakra-ui/react";
import TestTextLineContainer from "./TestTextLineContainer";


export default function TestTextContainer(props) {

    const noCopyCSS = {
        'user-Select': 'none',
        '-webkit-user-select': 'none',
    };
    console.log(props.testText);
    return (
        <Box fontFamily="Iosevka" sx={noCopyCSS} p="15px">
            <Box>
            { 
                Object.keys(props.testText).map((key) => {
                    return <TestTextLineContainer testTextLine={props.testText[key]} lineNum={key} currentLine={props.currentLine} currentIndex={props.currentIndex} parentChildren={props.children} />
                })
            }
            </Box>
        </Box>
    )
}