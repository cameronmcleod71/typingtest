import Cookies from 'universal-cookie'
import { useDispatch } from "react-redux"
import { testStarted } from '../redux/testStatus'

export function saveResults(testPackage) {
    const cookies = new Cookies();
    try {
        fetch('api/savespecialchar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': cookies.get('csrftoken'),
            },
            body: JSON.stringify(testPackage),
        })
        .then((response) =>
            response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((err) =>
            console.log(err)
        );
    
    } catch {

    }
}


export function getPastResults() {
    try {
        return (fetch('api/getspecialchartest', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) =>
            response.json())
        .then((data) => {
            console.log(data);
            if (data.success) {
                return (data.success);
            } else {
                return [];
            }
        })
        .catch((err) =>
            console.log(err)
        ));
    } catch {

    }

}

export function initializeTypingTest(setTestState,typingText,numOfLines) {
    let newTestObj = {};
    for (let i=1; i<=numOfLines; i++){
        newTestObj[i.toString()] = newLineOfText(typingText);
    }

    setTestState(newTestObj);
}

// sideeffect: typingText will lose the first line of text it holds
function newLineOfText(typingText) {
    return typingText.splice(0,1)[0];
}

export function lineLength(testState,lineNumber) {
    if (testState === {}) return {"error" : "Please initialize state before accessing lineLength"};
    return testState[lineNumber.toString()].length;
}

function startTimer() {
    const dispatch = useDispatch();
    dispatch(testStarted(true));
}

export function timerStarted(didTimerStart) {
    if (!didTimerStart) {
        didTimerStart = true;
        startTimer();
    }
}
