import React from "react"
import TypingTest from "./TypingTest"
import { initializeProgrammingTypingTest, updateProgrammingTestState, getTypingTest } from "../utils/typingtest";
import { requestProgrammingTestText } from "../utils/requestText";
import ProgrammingTestTextContainer from "./ProgrammingTestTextContainer";



export default function ProgrammingTypingTest(props) {

    // const typingTest = getTypingTest();
    // const currentLine = typingTest.currentLine;
    // const currentIndex = typingTest.currentIndex;

    return (
        <TypingTest type="programmer" language={props.language} initFunc={initializeProgrammingTypingTest} updateFunc={updateProgrammingTestState} requestTestTextFunc={requestProgrammingTestText}>
            <ProgrammingTestTextContainer />
            {/* <ProgrammingTTestInput /> */}
        </TypingTest>
    );

}