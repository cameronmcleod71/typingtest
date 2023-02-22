import React, { useEffect, useState, useRef } from 'react'
import { Container, Heading, Text, VStack } from '@chakra-ui/react'
import SpecialCharTestView from '../components/SpecialCharTestView'
import SpecialCharTestInput from '../components/SpecialCharTestInput'
import { exampleSpecialTest } from '../typingtest/specialchar'
import { startOptimizedAppearAnimation } from 'framer-motion'
import { Navigate } from 'react-router-dom'

// BUG: pressing enter while writing makes your answer wrong

export default function SpecialCharTest() {
    // State for the middle row of chars
    const [shownChars, setShownChars] = useState([]);
    // State for the top row of chars
    const [prevChars, setPrevChars] = useState([]); 
    // State for the bottom row of chars
    const [approachingChars, setApproachingChars] = useState([]);
    // State for the current time remaining
    const [timeRemaining, setTimeRemaining] = useState([]);
    // Contains a list of all the answered questions to send to results
    let completedEntries = useRef([]);
    // The remaining typing test (the chars that are not on the screen, but will appear on the screen when the test taker reaches them)
    // this contains a list of objects {word: '&', value: 'x'}
    // in this object, word holds the character, and value holds the clients answer for tha character
    // value can be 'x' for wrong, 'o' for correct, '' or anything else for unanswered
    let typingTest = useRef([]);
    // The current position in the line of chars/words (objects)
    let currentCharIndex = useRef(0);
    let testInitialized = useRef(false);
    let timerInitialized = useRef(false);
    // Keap track of the user's current input
    let input = useRef("");
    let intervalId = useRef(0);
    // The length (or number of characters) on each of the three test lines
    const lineLength = 10;
    // The total duration time of a typing test in seconds
    const testDuration = 60;  // *** this will change when we allow the user to choose a time

   
    useEffect(() => {
            fetch('/api/typingtest')
            .then((response) => 
                response.json()) 
            .then((data) => {
                typingTest.current = data.test.map((char) => {
                    return {word:char,value:''};
                });
                initializeTest();      
            });       
        },
        []
    );

    useEffect(() => {
        if (testInitialized.current) {
            completedEntries.current.push({...shownChars[currentCharIndex.current]});
            updateTestState();
        }
    },[shownChars]);

    const handleKeyPress = (e) => {
        // allow the shown chars to begin updating again
        if (!timerInitialized.current) {
            timerInitialized.current = true;
            startTimer();
        }
        if (!testInitialized.current) testInitialized.current = true;
        if (e.key === " ") {
            if (input.current === shownChars[currentCharIndex.current].word) {
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

    // useEffect(() => {
    //     if (timeRemaining === 0) {
    //         endTimer();
    //     }
    // },[timeRemaining]);

    const handleKeyDown = (e) => {
        if (e.key === "Backspace") input.current = input.current.slice(0,-1);
    };

    function startTimer() {
        intervalId.current = setInterval(() => {
            setTimeRemaining(prev => prev - 1);
        }, 1000);
    }

    function endTimer() {
        clearInterval(intervalId.current);
        intervalId.current = 0;
    }


    // need to create an endtimer once timeRemaining === 0

    // change the shown character at the current char index to 'x' or 'o' (wrong or right)
    function changeCharValue(val) {
        setShownChars(shownChars.map((obj,index) => {
            if (index === currentCharIndex.current) {
                return {...obj, value: val};
            } else {
                return obj;
            }
        }));
    }

    // set the state variables before we begin a test
    function initializeTest() {
        setShownChars(typingTest.current.splice(0,lineLength));
        setApproachingChars(typingTest.current.splice(0,lineLength));
        setTimeRemaining(testDuration);
    }

    // update the state of the typing test every time the user presses space
    function updateTestState() {
        if (currentCharIndex.current === lineLength-1) {
            testInitialized.current = false;
            let tempShownChars = [...shownChars].map((obj) => {return obj});
            let tempApproachingChars = [...approachingChars].map((obj) => {return obj});
            setPrevChars(tempShownChars.splice(0,lineLength))
            setShownChars([...tempShownChars].concat([...tempApproachingChars.splice(0,lineLength)]));
            setApproachingChars([...tempApproachingChars].concat([...typingTest.current.splice(0,lineLength)]));
            currentCharIndex.current = 0;
        } else {
            currentCharIndex.current++;
        }   
    }

    if (timeRemaining === 0) {
        endTimer();
        return (<Navigate to="/results" state={{completedEntries:completedEntries, type:'special', duration: testDuration}} />);
    }

    return (
       <Container>
            <VStack spacing="30px">
                <Text fontSize="8xl" fontWeight="bold">{timeRemaining}</Text>
                <SpecialCharTestView curChars={shownChars} prevChars={prevChars} approachingChars={approachingChars} />
                <SpecialCharTestInput handleKeyPress={handleKeyPress} handleKeyDown={handleKeyDown} />
            </VStack>
       </Container>
    );
}

