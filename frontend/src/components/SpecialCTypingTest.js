import React from "react"
import TypingTest from "./TypingTest"
import { initializeSpecialCTypingTest, updateSpecialCTestState } from "../utils/typingtest"
import { requestSpecialCTestText } from "../utils/requestText";
import SpecialCTestTextContainer from "./SpecialCTestTextContainer";
import SpecialCharTestInput from "./SpecialCharTestInput";

export default function SpecialCharTest(props) {

    return (
        <TypingTest type="specialc" initFunc={initializeSpecialCTypingTest} updateFunc={updateSpecialCTestState} requestTestTextFunc={requestSpecialCTestText}>
            <SpecialCTestTextContainer />
            <SpecialCharTestInput />
        </TypingTest>
    );
}