import React, { Children, isValidElement, cloneElement } from "react";
import { Box, HStack, Text } from "@chakra-ui/react";

export default function TyperTextContainer(props) {
    console.log(props.testTextLine);
    return (
        <Box paddingY="10px">
            <HStack>
                <Text color="#7f838e" fontSize={{base:"lg",lg:"2xl"}} paddingRight="30px">{props.lineNum}</Text>
                <Box style={ (props.lineNum === props.currentLine.toString()) ? {background: '#2B3A55' } : {}} borderRadius="md">
                    {Children.map( props.parentChildren, (child) => {
                        if(!isValidElement(child)) return null;

                        return cloneElement(child, { ...child.props, testTextLine: props.testTextLine, currentIndex: props.currentIndex, isCurrentLine: props.currentLine.toString() === props.lineNum});
                    })}
                </Box>
            </HStack>
        </Box>
    )
}