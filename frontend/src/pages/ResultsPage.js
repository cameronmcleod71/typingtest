import React from 'react'
import { Heading, Container, Text } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'

// Returns the Chars per minute
// Takes an array of objects corresponding to the test
function calculateCPM(testResults) {
    return countAnswers(testResults,true);
}

// Counts the correct or false answers within a given array of results
// Takes testResults, an array of objects containing the results of a taken test
// isCorrect is a boolean value which is true if you want to count correct answers or 'o', and false if you want to count wrong answers or 'x'
function countAnswers(testResults, isCorrect) {
    return testResults.reduce((totalCorrect, obj) => (
        obj.value === (isCorrect ? 'o' : 'x') ? totalCorrect + 1 : totalCorrect), 0);
}

function calculateWPM() {
}

// given an array of previous test results (objects), calculate the test accuracy
// correct answers / all answers * 100
function calculateAccuracy(testResults) {
    return Math.round((countAnswers(testResults, true) / (countAnswers(testResults, true) + countAnswers(testResults, false))) * 100);
}

export default function ResultsPage() {

    const { state } = useLocation();
    const testResults = state.completedEntries.current;
    const testType = state.type;
    const testDuration = state.duration;

    const calculatedResults = {
        wmp: 0,
        cpm: 0,
        accuracy: 0
    }

    if (testType === 'special') calculatedResults.cpm = calculateCPM(testResults);
    calculatedResults.accuracy = calculateAccuracy(testResults);

    return (
        <Container>
            <Heading>Your Results</Heading>
            { testType === 'special' ? <Text>WPM: { calculatedResults.cpm }</Text> : null }
            <Text>Accuracy: { calculatedResults.accuracy }%</Text>
        </Container>
        
    )
}