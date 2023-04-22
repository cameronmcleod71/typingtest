import React, { Children, isValidElement, cloneElement, useState, useEffect } from 'react';
import { Box, VStack } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux"
import { putAwayTestText, getTestStateClone, getTypingTest, handleBackspace, timerStarted } from "../utils/typingtest";

async function initiate(initFunc,requestTestTextFunc,setState) {
    try {
        let typingTest = getTypingTest();
        const testText = await requestTestTextFunc();
        putAwayTestText(typingTest,testText);
        initFunc(typingTest);
        console.log(typingTest.testState);
        setState(getTestStateClone(typingTest));
    } catch (err) {
        console.log(err);
    }
}

function update(updateFunc,setState,newValue, e) {
    let typingTest = getTypingTest();
    updateFunc(typingTest, newValue, e);
    setState(getTestStateClone(typingTest));
}


export default function TypingTest({children, type, initFunc, updateFunc, requestTestTextFunc, ...props}) {

    const [currentText, setCurrentText] = useState({});

    const isCompleted = useSelector((state) => state.testStatus.isCompleted);
    const didTimerStart = useSelector((state) => state.testStatus.isStarted);
    const dispatch = useDispatch();


    useEffect(() => { 
        initiate(initFunc, requestTestTextFunc, setCurrentText);
    }, []);

    const handleKeyPress = (e) => {
        timerStarted(didTimerStart,dispatch);
        update(updateFunc, setCurrentText, e.key, e); //might move timer elsewhere
    }

    const handleKeyDown = (e) => { //to be deleted
        if (e.key === "Backspace") {
            handleBackspace(getTypingTest());
        }

    }

    if (isCompleted === true) {
        // dispatch iscompleted and isstarted to false
        return (<Navigate to="/results" state={{completedEntries:completedEntries, type: type, duration: testDuration}} />);
    }

    return (
        <Box>
            <VStack>
                {Children.map( children, (child) => {
                    if(!isValidElement(child)) return null;

                    return cloneElement(child, { ...child.props, handleKeyPress: handleKeyPress, handleKeyDown: ()=>(console.log()), testText: currentText, currentLine: 3, currentIndex: 3});
                })}
            </VStack>
        </Box>
    );
}