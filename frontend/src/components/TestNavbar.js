import React, { useState, useRef, useEffect } from 'react';
import { Grid, GridItem, Box, Text, Divider } from '@chakra-ui/react';
import { useSelector, useDispatch } from "react-redux";
import { testCompleted } from '../redux/testStatus';
import { getTypingTestDuration } from '../utils/typingtest';

export default function TestNavbar(props) {
    const [timeRemaining, setTimeRemaining] = useState(getTypingTestDuration());
    const isStarted = useSelector((state) => state.testStatus.isStarted);
    const dispatch = useDispatch();
    let intervalId = useRef(0);
    let testInitialized = useRef(false);
    let timerEnded = useRef(false);

    if (isStarted && (testInitialized.current === false)) {
        testInitialized.current = true;
        startTimer();
    }

    const minutes = Math.floor(timeRemaining/60);
    let seconds = timeRemaining % 60;
    seconds = seconds.toString().padStart(2,'0');

    //make a use effect to turn testCompleted to false on destruction of this component

    function startTimer() {
        intervalId.current = setInterval(() => {
            setTimeRemaining(prev => prev - 1);
        }, 1000);
    }

    function endTimer() {
        clearInterval(intervalId.current);
        intervalId.current = 0;
    }

    if (timeRemaining === 0) {
        endTimer();
        timerEnded.current = true;
        dispatch(testCompleted(true));
    }

    useEffect(() => { 
        return () => {
          // setInterval cleared when component unmounts
          if (!timerEnded) {
            clearInterval(intervalId.current);
            intervalId.current = 0;
          }
        }
      }, []);
    

    return (
        <Box>
            <Box display="flex" justifyContent="center">
                <Box paddingY="15px" color="#abb2bf" marginX="20px">
                    <Text fontSize={{base:"3xl",lg:"6xl"}} fontWeight="bold">{ minutes } : { seconds } </Text>
                </Box>
            </Box>
        </Box>
    )
}













