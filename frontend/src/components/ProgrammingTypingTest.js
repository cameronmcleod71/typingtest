import React from "react"
import TypingTest from "./TypingTest"
import { initializeProgrammingTypingTest, updateProgrammingTestState, getTypingTest } from "../utils/typingtest";
import { requestProgrammingTestText } from "../utils/requestText";
import ProgrammingTTestView from "./ProgrammingTTestView";
import ProgrammingTTestInput from "./ProgrammingTTestInput";


export default function ProgrammingTypingTest(props) {

    const typingTest = getTypingTest();
    const currentLine = typingTest.currentLine;
    const currentIndex = typingTest.currentIndex;

    return (
        <TypingTest type="programmer" initFunc={initializeProgrammingTypingTest} updateFunc={updateProgrammingTestState} requestTestTextFunc={requestProgrammingTestText}>
            <ProgrammingTTestView />
            <ProgrammingTTestInput />
        </TypingTest>
    );

}