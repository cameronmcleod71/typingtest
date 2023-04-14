import React, { useEffect, useState, useRef, useMemo } from 'react'
import { Container, Heading, Text, VStack, Grid, GridItem, Box, Divider, Spacer, HStack } from '@chakra-ui/react'
import SpecialCharTestView from '../components/SpecialCharTestView'
import SpecialCharTestInput from '../components/SpecialCharTestInput'
import TestNavbar from '../components/TestNavbar'
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { testStarted, testCompleted, testReset } from '../redux/testStatus'


// bug to fix: pressing enter during test
export default function SpecialCharTest() {
    const dispatch = useDispatch();
    const isCompleted = useSelector((state) => state.testStatus.isCompleted);

    // The number of lines of text on the screen
    const lineCount = 5;

    // The current line the user is typing on
    let curLine = useRef(1);

    let newLines = useRef(1);

    // The test state that is on the screen
    const [ testText, setTestText ] = useState({});

    // Letters that have been complete
    let completedEntries = useRef([]);

    // The entire remaining typing test that has not been added to the typing test state
    let typingTest = useRef([]);

    // The current position in the line of chars/words (objects)
    let curIndex = useRef(0);

    let testInitialized = useRef(false);

    let timerInitialized = useRef(false);

    // Keap track of the user's current input
    let input = useRef("");

    // The length (or number of characters) on each of the three test lines
    const lineLength = 15;
    
    // The total duration time of a typing test in seconds
    const testDuration = 60;  // *** this will change when we allow the user to choose a time

    useEffect(() => {
            fetch('/api/typingtest')
            .then((response) => 
                response.json()) 
            .then((data) => {
                console.log(data);
                typingTest.current = data.test.map((char) => {
                    return {word:char,value:''};
                });
                initializeTest();      
            });   
            // dispatch(testStarted(false));
            // disptach(testCompleted(false));    
            return () => {
                // setInterval cleared when component unmounts
                dispatch(testReset(false));
              }
        },
        []
    );

    useMemo(() => {
        if (testInitialized.current) {
            completedEntries.current.push({...testText[curLine.current.toString()][curIndex.current]});
            updateTestState();
        }
    },[testText]);

    const handleKeyPress = (e) => {
        // allow the shown chars to begin updating again
        if (!timerInitialized.current) {
            timerInitialized.current = true;
            dispatch(testStarted(true));
        }
        if (!testInitialized.current) testInitialized.current = true;
        if (e.key === " ") {
            if (input.current === testText[curLine.current.toString()][curIndex.current].word) {
                // green text (correct)
                changeCharValue('o');
            } else {
                // red text (wrong)
                changeCharValue('x');
            }
            e.target.value = "";
            input.current = "";
        } else {
            input.current = input.current + e.key;
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Backspace") input.current = input.current.slice(0,-1);
    };

    // need to create an endtimer once timeRemaining === 0

    // change the shown character at the current char index to 'x' or 'o' (wrong or right)
    function changeCharValue(val) {
        setTestText(Object.fromEntries(Object.keys(testText).map((key,index) => {
            if (parseInt(key) === curLine.current) {
                return ([ 
                    key, testText[key].map((obj, index) => {
                        if (index === curIndex.current) {
                            return {...obj, value: val}
                        } else {
                            return obj;
                        }
                    })
                ]);
            } else {
                return [key, [...testText[key]].map((obj) => {return obj})]
            }
        })));
        // curIndex.current++;

    }

    function initializeTest() {
        let newTestObj = {}
        for (let i=1; i<=lineCount; i++){
            newTestObj[i.toString()] = typingTest.current.splice(0,lineLength)
        }
        setTestText(newTestObj);
    }

    function updateTestState() {
        if (curIndex.current === lineLength-1 && curLine.current === (lineCount + newLines.current - 2)) {
            testInitialized.current = false;
            //create a clone of testText
            let tempTestText = Object.fromEntries(Object.keys(testText).map((key,index) => {
                return [key, [...testText[key]].map((obj) => {return obj})]   
            }));
            delete tempTestText[(curLine.current-3).toString()];
            delete tempTestText[(curLine.current-2).toString()];
            tempTestText[(lineCount+newLines.current).toString()] = typingTest.current.splice(0,lineLength);
            tempTestText[(lineCount+newLines.current+1).toString()] = typingTest.current.splice(0,lineLength);
            curLine.current++;
            newLines.current+=2;
            curIndex.current = 0;
            setTestText(tempTestText);
        } else if (curIndex.current === lineLength-1) {
            testInitialized.current = false;
            curLine.current++;
            curIndex.current = 0;
        } else {
            curIndex.current++;
        }
    }

    if (isCompleted === true) {
        // dispatch iscompleted and isstarted to false
        return (<Navigate to="/results" state={{completedEntries:completedEntries, type:'special', duration: testDuration}} />);
    }
    return (
       <Box>
            <Grid templateColumns="repeat(12, 1f)">
                <GridItem colSpan="1" w="100%" minHeight="100%" borderRight="1px" borderColor="#0B1121" minWidth={{base:"140px",lg:"250px"}}>
                   <TestNavbar testDuration={testDuration} />
                </GridItem>
                <GridItem colStart="2" colEnd="13" minHeight="100vh" display="flex" justifyContent="flex-start">
                    <Box>
                        <VStack>
                            <SpecialCharTestView testText={testText} curLine={curLine.current} curIndex={curIndex.current} />
                            <SpecialCharTestInput handleKeyPress={handleKeyPress} handleKeyDown={handleKeyDown} />
                        </VStack>
                    </Box>
                </GridItem>
            </Grid>
       </Box>
    );
}

