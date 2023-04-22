import React from "react";
import TestTextContainer from "./TestTextContainer";
import TestTextLineContainer from "./TestTextLineContainer";
import SpecialCTestTextLineRenderer from "./SpecialCTestTextLineRenderer";



export default function SpecialCTestTextContainer(props) {

    return(
        <TestTextContainer testText={props.testText} currentLine={props.currentLine} currentIndex={props.currentIndex}>
            <SpecialCTestTextLineRenderer />
        </TestTextContainer>
    );
}