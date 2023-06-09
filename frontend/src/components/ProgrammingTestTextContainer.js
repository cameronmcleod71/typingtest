import React from "react";
import TestTextContainer from "./TestTextContainer";
import ProgrammingTestTextLineRenderer from "./ProgrammingTestTextLineRenderer";



export default function ProgrammingTestTextContainer(props) {

    return(
        <TestTextContainer testText={props.testText} currentLine={props.currentLine} currentIndex={props.currentIndex} handleKeyPress={props.handleKeyPress} handleKeyDown={props.handleKeyDown}>
            <ProgrammingTestTextLineRenderer />
        </TestTextContainer>
    );
}