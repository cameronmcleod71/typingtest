import React from "react";
import TestTextContainer from "./TestTextContainer";
import TestTextLineContainer from "./TestTextLineContainer";
import SpecialCTestTextLineRenderer from "./SpecialCTestTextLineRenderer";
import { Container } from "@chakra-ui/react";

export default function SpecialCTestTextContainer(props) {
    console.log(props.testText);

    return(
        <Container>
            <TestTextContainer testText={props.testText} currentLine={props.currentLine} currentIndex={props.currentIndex} handleKeyPress={props.handleKeyPress} handleKeyDown={props.handleKeyDown}>
                <SpecialCTestTextLineRenderer />
            </TestTextContainer>
        </Container>
    );
}