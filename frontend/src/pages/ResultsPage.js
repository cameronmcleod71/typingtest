import React, { useEffect } from 'react'
import { Heading, Container, Text } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { calculateStats } from '../utils/results'
import { saveResults } from '../utils/typingtest'
import { testReset } from '../redux/testStatus'


export default function ResultsPage() {
    const dispatch = useDispatch();
    const { state } = useLocation();
    const testResults = state.completedEntries.current;
    const testType = state.type;
    const testDuration = state.duration;
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    // useEffect(() => {
    //     dispatch(testReset(false));
    // }, []);

    const calculatedResults = calculateStats(testResults,'special');
    const testPackage = {'test':testResults, 'duration': testDuration, 'results': calculatedResults};
    if (isAuthenticated) {
       saveResults(testPackage);
    }

    return (
        <Container>
            <Heading>Your Results</Heading>
            { testType === 'special' ? <Text>CPM: { calculatedResults.cpm }</Text> : null }
            <Text>Accuracy: { calculatedResults.accuracy }%</Text>
        </Container>
        
    )
}