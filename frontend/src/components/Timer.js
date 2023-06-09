import { Box, Text } from "@chakra-ui/react";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { testCompleted } from "../redux/testStatus";
import { setTime } from "../redux/runtime";
import { getTypingTestDuration, setRuntimeResults } from "../utils/typingtest";

export default function Timer({ timeRemaining, setTimeRemaining, ...props }) {
  const isStarted = useSelector((state) => state.testStatus.isStarted);
  const dispatch = useDispatch();
  let intervalId = useRef(0);
  let timerInitialized = useRef(false);
  let timerEnded = useRef(false);

  if (isStarted && timerInitialized.current === false) {
    timerInitialized.current = true;
    startTimer();
  }

  const minutes = Math.floor(timeRemaining / 60);
  let seconds = timeRemaining % 60;
  seconds = seconds.toString().padStart(2, "0");

  function startTimer() {
    intervalId.current = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
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
    };
  }, []);

  useMemo(() => {
    // dispatch(setTime(timeRemaining));
    setRuntimeResults(timeRemaining);
  }, [timeRemaining]);

  return (
    <Box {...props} display="flex" align="center" textAlign="center">
      <Text
        fontSize={{ base: "xl", md: "2xl", lg: "4xl" }}
        fontWeight="bold"
        width="max-content"
      >
        {minutes} : {seconds}{" "}
      </Text>
    </Box>
  );
}
