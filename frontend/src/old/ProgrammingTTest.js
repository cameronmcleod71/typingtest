import React, { useEffect, useState, useRef, useMemo } from 'react'
import { VStack, Grid, GridItem, Box } from '@chakra-ui/react'
import ProgrammingTTestView from '../components/ProgrammingTTestView'
import ProgrammingTTestInput from '../components/ProgrammingTTestInput'
import TestNavbar from '../components/TestNavbar'
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { testStarted, testCompleted, testReset } from '../redux/testStatus'

export default function ProgrammingTTest() {

    const dispatch = useDispatch();
    const isCompleted = useSelector((state) => state.testStatus.isCompleted);
    // The entire remaining typing test that has not been added to the typing test state
    let typingTest = useRef([]);

    const lineCount = useRef(Math.floor((window.innerHeight-200)/65));
    const deleteInterval = useRef(Math.ceil(lineCount.current/4))

    let curLine = useRef(1);

    let curLineLength = useRef(10);

    let testInitialized = useRef(false);

    let timerInitialized = useRef(false);

    let enterKeyPress = useRef(false);

    const [ testText, setTestText ] = useState({});

    let newLines = useRef(0);

    // if expected is space or \n and they are not given, then dont incrrease index on state change
    let increaseIndex = useRef(true);

    let curIndex = useRef(0);

    let input = useRef("");

    let completedEntries = useRef([]);

    const testDuration = 60;  // *** this will change when we allow the user to choose a time


    useEffect(() => {
        fetch('/api/getprogrammingttest')
        .then((response) => 
            response.json()) 
        .then((data) => {
            console.log(data);
            typingTest.current = data;
            initializeTest();
        });    
    }, []);

    function initializeTest() {
        let newTestObj = {};
        for (let i=1; i<=lineCount.current; i++){
            newTestObj[i.toString()] = typingTest.current.splice(0,1)[0];
        }
        setTestText(newTestObj);
        curLineLength = newTestObj[curLine.current.toString()].length; //might trigger before state changes
        curIndex = startsWithSpace(newTestObj);
    }

    function startsWithSpace(testState){
        if(testState[curLine.current.toString()][0].space) return 1;

        return 0;
    }

    useMemo(() => {
        if (testInitialized.current) {
            completedEntries.current.push({...testText[curLine.current.toString()][curIndex.current]});
            updateTestState();
        }
    },[testText]);

    const handleKeyPress = (e) => {
        if (!timerInitialized.current) {
            timerInitialized.current = true;
            dispatch(testStarted(true));
        }

        if (!testInitialized.current) testInitialized.current = true;

        let new_input = (e.key === "Enter" ? "\n" : e.key);

        addInputToState(new_input);

        if (testText[curLine.current.toString()][curIndex.current].space && new_input !== " ")
            increaseIndex.current = false;

        if (testText[curLine.current.toString()][curIndex.current].expected === "\n" && new_input !== "\n")
            increaseIndex.current = false;

        if (e.key === " ") {
            input.current = "";
        } else if (e.key === "Enter") {
            input.current = "";
            enterKeyPress.current = true;
            // if the current index is newline, then do nothing, but if its not,
        } else {
            input.current += e.key;
        }
        e.target.value = "";
    };

    const handleKeyDown = (e) => {  //might need to handle enter key press
        if (e.key === "Backspace") input.current = input.current.slice(0,-1);
        // remove last char in given, if given is empty, then reduce index by one
    };

    function updateTestState() {
        if (enterKeyPress.current && curLine.current === (lineCount.current + newLines.current - deleteInterval.current)) {
            testInitialized.current = false;
            enterKeyPress.current = false;
            let tempTestText = Object.fromEntries(Object.keys(testText).map((key,index) => {
                return [key, [...testText[key]].map((obj) => {return obj})]   
            }));
                        //if there is any remaining expected values in the line, set them to wrong
            if (curIndex.current !== curLineLength.current-1) tempTestText[curLine.current.toString()].forEach((obj,index) => index >= curIndex.current ? obj.given='\n' : obj);
            const keys = Object.keys(tempTestText);
            for (let x=0; x<keys.length; x++) {
                if (x<lineCount.current-deleteInterval.current*2){
                    delete tempTestText[keys[x]];
                }
            }

            for (let x=0; x<lineCount.current-deleteInterval.current*2; x++){
                tempTestText[(lineCount.current+newLines.current+x+1).toString()] = typingTest.current.splice(0,1)[0];
            }
            curLine.current++;
            curLineLength = testText[curLine.current.toString()].length;
            newLines.current += lineCount.current - deleteInterval.current*2;
            curIndex.current = startsWithSpace(testText);
            setTestText(tempTestText);

        } else if (enterKeyPress.current) {
            testInitialized.current = false;
            enterKeyPress.current = false;
            let tempTestText = Object.fromEntries(Object.keys(testText).map((key,index) => {
                return [key, [...testText[key]].map((obj) => {return obj})]   
            }));
            if (curIndex.current !== curLineLength.current-1) tempTestText[curLine.current.toString()].forEach((obj,index) => index >= curIndex.current ? obj.given='\n' : obj);
            setTestText(tempTestText);
            curLine.current++;
            curLineLength = testText[curLine.current.toString()].length;
            curIndex.current = startsWithSpace(testText);
        } else {
            if (increaseIndex.current) curIndex.current++;
            increaseIndex.current = true;
        }
    }

    function addInputToState(val) {
        setTestText(Object.fromEntries(Object.keys(testText).map((key,index) => {
            if (parseInt(key) === curLine.current) {
                return ([ 
                    key, testText[key].map((obj, index) => {
                        if (index === curIndex.current) {
                            if (obj.given) {
                                return {...obj, given: obj.given+val}
                            } else {
                                return {...obj, given: val}
                            }
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
                             <ProgrammingTTestView testText={testText} curLine={curLine.current} curIndex={curIndex.current} />
                             <ProgrammingTTestInput handleKeyPress={handleKeyPress} handleKeyDown={handleKeyDown} />
                         </VStack>
                     </Box>
                 </GridItem>
             </Grid>
        </Box>
     );

}