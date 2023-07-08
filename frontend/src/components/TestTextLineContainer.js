import React, { Children, isValidElement, cloneElement, useRef, useEffect } from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import { css } from "@emotion/react";
import MotionCursor from "./MotionCursor";
import { findDOMNode } from "react-dom";
import {v4} from "uuid";

const lineNumberStyles = {
    fontSize: {base: "sm", lg: "lg"},
    color: "white",
    paddingRight: "30px",
};

const typingTextStyles = {
    fontSize: {base: "sm", sm: "sm", sm: "md",  lg: "lg", xl: "xl"},
};

const testStateReduce = (acc, obj) => {
    if (obj.space) {
        return acc + Math.max(parseInt(obj.space), obj.given.trim().length+1);
    } else if (obj.expected === "\n") {
        return acc + obj.given.length;
    } else {
        return acc +  1;
    }
}

export default function TyperTextContainer(props) {
    return (
        <Box paddingY="10px" flexWrap="wrap">
            <HStack>
                <Text sx={lineNumberStyles} filter={ props.lineNum === props.currentLine.toString() ? "opacity(1)" : "opacity(0.6)" }>{props.lineNum}</Text>
                <Box sx={typingTextStyles}>
                    <MotionCursor isInFocus={props.isInFocus} currentIndex={props.currentIndex} numOfChars={props.testTextLine.reduce(testStateReduce, 0)} isCurrentLine={props.lineNum === props.currentLine.toString()} numOfSpaces={ props.testTextLine[0].space ? props.testTextLine[0].space : 0 } lineNum={props.lineNum}>
                        {Children.map( props.parentChildren, (child) => {
                            if(!isValidElement(child)) return null;

                            return cloneElement(child, { ...child.props, testTextLine: props.testTextLine, currentIndex: props.currentIndex, isCurrentLine: props.currentLine.toString() === props.lineNum});
                        })}
                    </MotionCursor>
                </Box>
            </HStack>
        </Box>
    )
}