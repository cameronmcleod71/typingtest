import React, { useRef, useState, useEffect } from 'react'
import { Box, Text, Container, Button } from '@chakra-ui/react'
import { render } from "react-dom";
import Highlight, { defaultProps } from "prism-react-renderer";
import dracula from 'prism-react-renderer/themes/nightOwl'
import { CursorWrapper } from '../styles/Cursor.style';
import { css, keyframes } from "@emotion/react";
// export const CursorWrapper = css`
//   width: 100%;
//   border-left: 2px solid;
//   border-color: grey;
//   white-space: nowrap;
//   overflow: hidden;
//   animation: ${blink} 1s step-end infinite alternate;
// `;



/*
        border-left: 2px solid;
        border-color: grey;
        white-space: nowrap;
        overflow: hidden;
         animation: ${blink} 1s step-end infinite alternate; */



export default function Leaderboard() {
    const [position, setPosition] = useState(0);
    const myText = "This will be a test for the caret.";
    const charWidth = useRef(0);
    const blinkInterval = useRef("infinite");

    
    const blink = keyframes`
        50% {
            border-color: transparent;
        }
    `;

    const move = keyframes`
        to {
            left: ${position+10}px;
        }
    `;

    const [length, setLength] = useState(0);
    useEffect(() => {
        setLength(document.getElementById("textlength").clientWidth);
    });

    const textCursor = css`
        color: white;
        position: relative;
        width: max-content;
        &::before {
            content: '';
            border-left: 2px solid;
            border-color: grey;
            white-space: nowrap;
            overflow: hidden;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: ${position}px;
            animation: 
                ${blink} 0.3s step-end infinite alternate,
                ${move} 0.5s forwards;
        }
    `;

    function setCharLength() {
        const textWidth = document.getElementById("textlength").clientWidth;
        charWidth.current = textWidth / myText.length;


    }

    function handleButtonPress(e) {
        blinkInterval.current = "";
        setCharLength();
        setPosition(position+charWidth.current);

    }
    
    return (
        <Box>
           
            <Box>
                <div style={{width: "max-content"}}>
                    <p css={textCursor} id="textlength" onAnimationEnd={() => (blinkInterval.current = "infinite")}>{myText}</p>
                </div>
                <Text style={{color: "white"}}>
                    { length } and { length / myText.length } 
                </Text>
                <Button onClick={(e) => handleButtonPress(e)}>
                    Move Caret
                </Button>
            </Box>
        </Box>
      ); 

}