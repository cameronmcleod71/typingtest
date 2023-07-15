import React, { useEffect, useRef, useState } from "react";
import { Box } from "@chakra-ui/react";
import TestTextLineContainer from "./TestTextLineContainer";

export default function TestTextContainer(props) {
    const [isFocused, setIsFocused] = useState(false);
    const ref = useRef();

    const noCopyCSS = {
        'user-Select': 'none',
        '-webkit-user-select': 'none',
    };

    useEffect(() => {
        document.getElementById("typingTestAutoFocus").focus();
    },[]);

    return (
        <Box fontFamily="Iosevka" sx={noCopyCSS} paddingY="10px">
            <Box onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} id="typingTestAutoFocus" tabIndex="0" outline="none" onKeyPress={(e) => props.handleKeyPress(e)} onKeyDown={(e) => props.handleKeyDown(e)}>
            { 
                Object.keys(props.testText).map((key) => {
                    return <TestTextLineContainer key={key} isInFocus={isFocused} testTextLine={props.testText[key]} lineNum={key} currentLine={props.currentLine} currentIndex={props.currentIndex} parentChildren={props.children} />
                })
            }
            </Box>
        </Box>
    )
}