import { useDispatch, useSelector } from "react-redux"
import { testStarted } from '../redux/testStatus';

let typingTest = {
    testState: {},
    numOfLines: 0,
    currentLine: 1, //always starts at 1
    currentIndex: 0,
    typingText: {},
    savedTypingText: {},
    deleteInterval: 0,
    addedLines: 0,
    testDuration: 1,
    input: "", //to be deleted
};

let typingTestResults = {
    second: 0,
    completed: [],
    totalCompleted: 0,
    totalCorrect: 0,
    runtimeResults: {},
};

// will eventually need to store the testDuration in a global store
// for now just give it as it is

export function resetTypingTest() {
    typingTest.testState = {};
    typingTest.numOfLines = 0;
    typingTest.currentLine = 1;
    typingTest.currentIndex = 0;
    typingTest.typingText = {};
    typingTest.deleteInterval = 0;
    typingTest.addedLines = 0;
    typingTest.testDuration = 1;
    typingTest.input = "";

    typingTestResults.second = 0;
    typingTestResults.completed = [];
    typingTestResults.totalCompleted = 0;
    typingTestResults.totalCorrect = 0;
    typingTestResults.runtimeResults = {};

}

export function resetTypingTestResults() {

}

export function endOfTypingText() {
    // console.log("checker");
    // console.log("end of lines?", typingTest.currentLine === typingTest.numOfLines + typingTest.addedLines, "Current line: ,", typingTest.currentLine, "Num of lines: ", typingTest.numOfLines, "Added Lines: ", typingTest.addedLines);
    // console.log("Typing text length 0?", typingTest.typingText.length === 0);
    return (typingTest.currentLine === typingTest.numOfLines + typingTest.addedLines) && (typingTest.typingText.length === 0) && (typingTest.currentIndex === lineLength(typingTest));
}

export function getTypingTestDuration() {
    return typingTest.testDuration;
}

export function setTypingTestDuration(newDuration) {
    typingTest.testDuration = newDuration;
}

export function getTypingTest() {
    return typingTest;
}

export function getTestStateClone() {
    //return clone
    return JSON.parse(JSON.stringify(typingTest.testState));
}

export function getLatestRuntimeResult() {
    const runtimeResultChoices = Object.keys(typingTestResults.runtimeResults);
    return typingTestResults.runtimeResults[runtimeResultChoices[0]];
}

export function putAwayTestText(typingTest, typingText) {
    typingTest.typingText = typingText;
    typingTest.savedTypingText = structuredClone(typingText);
}

function addInitialLinesToState() {
    for (let i=1; i<=typingTest.numOfLines; i++){
        const text = newLineOfText(typingTest.typingText);
        if (text) typingTest.testState[i.toString()] = text;
    }
    typingTest.numOfLines = Object.keys(typingTest.testState).length;
}

function calculateProgrammingTypingTestLineCount() {
    return Math.floor((window.innerHeight*0.70)/55);
}

function setInitialValues(numOfLines, deleteInterval) { //maybe set testDuration here too in the future
    typingTest.numOfLines = numOfLines;
    typingTest.deleteInterval = deleteInterval;
    typingTest.currentIndex = 0;
    typingTest.currentLine = 1;
}

export function initializeProgrammingTypingTest() {
    typingTest.typingText = structuredClone(typingTest.savedTypingText);
    typingTest.testState = {};
    const initValues = {
        numOfLines: calculateProgrammingTypingTestLineCount(),
        deleteInterval: Math.ceil(calculateProgrammingTypingTestLineCount()/4),
    };
    setInitialValues(initValues.numOfLines, initValues.deleteInterval);
    addInitialLinesToState();
    typingTest.currentIndex = startsWithSpace();
}

export function initializeSpecialCTypingTest() {
    typingTest.typingText = structuredClone(typingTest.savedTypingText);
    typingTest.testState = {};
    const initValues = {
        numOfLines: 5,
        deleteInterval: 2,
    };
    setInitialValues(initValues.numOfLines, initValues.deleteInterval);
    addInitialLinesToState();
}

// sideeffect: typingText will lose the first line of text it holds
function newLineOfText(typingText) {
    return typingText.splice(0,1)[0];
}

function lineLength(typingTest) {
    if (typingTest.testState === {}) return {"error" : "Please initialize state before accessing lineLength"};
    return typingTest.testState[typingTest.currentLine.toString()].length;
}

function startTimer(dispatch) {
    dispatch(testStarted(true));
}

export function timerStarted(isStarted, dispatch) {
    if (!isStarted) {
        startTimer(dispatch);
    }
}

export function setRuntimeResults(time) { 
    if (typingTestResults.completed.length === 0) {
        typingTestResults.runtimeResults[time.toString()] = [ 0, 100]
        return
    }
    const totalSeconds = typingTest.testDuration - time;
    const [correctChars, completedChars] = typingTestResults.completed.reduce(([totalCorrect, totalCompleted],currentObj) => {
        if (currentObj.given === "" || currentObj.space || currentObj.expected === "\n") return ([totalCorrect, totalCompleted]); //currently not counting space or enter as a char
        if (currentObj.given === currentObj.expected) return ([totalCorrect+1, totalCompleted+1]);
        return ([totalCorrect, totalCompleted+1]);
    }, [0,0]);
    const speed = Math.round(((correctChars/5) / totalSeconds) * 60);
    const accuracy = Math.round((correctChars / completedChars) * 100);
    typingTestResults.runtimeResults[time.toString()] = [ speed, accuracy ]
    return
}

function getCurrentPosition(typingTest) {
    return (typingTest.testState[typingTest.currentLine.toString()][typingTest.currentIndex]);
}

//might make this return a clone
function getTestState(typingTest) {
    return (typingTest.testState);
}

// impure: testText and testState are copied
function addKeyPressToState(typingTest, newValue) {
    if (newValue === "Enter") newValue = "\n";
    if (getCurrentPosition(typingTest).given) {
        typingTest.testState[typingTest.currentLine][typingTest.currentIndex].given += newValue;
    } else {
        typingTest.testState[typingTest.currentLine][typingTest.currentIndex].given = (getCurrentPosition(typingTest).expected === "\n" ? "" : newValue);
    }
    //return ({...typingTest, testState});
}

function incrementProgrammingTestIndex(typingTest, newValue) {
    if (getCurrentPosition(typingTest).space && newValue !== " " || getCurrentPosition(typingTest).expected === "\n" && newValue != "\n") return (typingTest);
    else {
        typingTest.currentIndex += 1;
        return typingTest;
    }
}

function handleEnterKeyPress(typingTest) {
    if (typingTest.currentIndex !== lineLength(typingTest)-1) typingTest.testState[typingTest.currentLine.toString()].forEach((obj,index) => {
        if (index >= typingTest.currentIndex + 1){
            obj.given='\n';
            
            typingTestResults.completed.push(obj);
        } 
    });
}

function deleteOldLinesFromState(typingTest) {
    const keys = Object.keys(typingTest.testState);
    for (let x=0; x<keys.length; x++) {
        if (x<typingTest.numOfLines-typingTest.deleteInterval*2){ // deleteInterval
            delete typingTest.testState[keys[x]];
        }
    }
}

function addNewLinesToState(typingTest) {
    for (let x=0; x<typingTest.numOfLines-typingTest.deleteInterval*2; x++){ // deleteInterval*2 is what we want to keap from previous lines -- one delete interval for the remaining lines, and on more so we can see some of our previous answers
        const text = newLineOfText(typingTest.typingText);
        if (text) {
            typingTest.testState[(typingTest.numOfLines+typingTest.addedLines+1).toString()] = text;
            typingTest.addedLines += 1;
        }
    }
    // typingTest.addedLines += (typingTest.numOfLines - typingTest.deleteInterval*2);
}

function startsWithSpace(){
    if(typingTest.testState[typingTest.currentLine.toString()][0].space) return 1;
    return 0;
}

function readyForMoreLines(typingTest) {
    return (typingTest.currentLine === (typingTest.numOfLines + typingTest.addedLines - typingTest.deleteInterval) && newLineOfText(typingTest.typingText));
}

function saveKeyPressResult(typingTest) {
    typingTestResults.completed.push(getCurrentPosition(typingTest));
}

export function exportFinishedResults() {
    return ([typingTestResults.completed, typingTest.testDuration])
}

export function handleBackspace(typingTest) {
    if (typingTest.currentIndex > startsWithSpace(typingTest)) {
        if (getCurrentPosition(typingTest).given && getCurrentPosition(typingTest).given.length > 0) {
            const curIndexGiven = getCurrentPosition(typingTest).given;
            typingTest.testState[typingTest.currentLine][typingTest.currentIndex].given = curIndexGiven.substring(0,curIndexGiven.length-1);
            typingTestResults.completed[typingTestResults.completed.length-1].given = typingTestResults.completed[typingTestResults.completed.length-1].given.substring(0, typingTestResults.completed[typingTestResults.completed.length-1].given.length-1);
        }
        else {
            typingTest.currentIndex-=1;
            const curIndexGiven = getCurrentPosition(typingTest).given;
            typingTest.testState[typingTest.currentLine][typingTest.currentIndex].given = curIndexGiven.substring(0,curIndexGiven.length-1);
            typingTestResults.completed.pop();
        }
    }
}

export function updateProgrammingTestState(typingTest,newValue, e) {
    addKeyPressToState(typingTest, newValue);
    saveKeyPressResult(typingTest);
    if (newValue !== "Enter" && newValue !== "\n") { 
        incrementProgrammingTestIndex(typingTest, newValue);
    } else {
        handleEnterKeyPress(typingTest);
        if (readyForMoreLines(typingTest)) { //newLines and deleteInterval
            deleteOldLinesFromState(typingTest);
            addNewLinesToState(typingTest);
        }
        if (typingTest.currentLine < (typingTest.numOfLines + typingTest.addedLines)){ //for handling the end of a typing Test
            typingTest.currentLine++;
            typingTest.currentIndex = startsWithSpace(typingTest);
        } else {
            typingTest.currentIndex = lineLength(typingTest);
        }
    }
}

export function updateSpecialCTestState(typingTest, newValue, e) {
    addKeyPressToState(typingTest, newValue);
    saveKeyPressResult(typingTest);
    if (typingTest.currentIndex < lineLength(typingTest)-1) {
        typingTest.currentIndex++;
    } else {
        if (readyForMoreLines(typingTest)) {
            deleteOldLinesFromState(typingTest);
            addNewLinesToState(typingTest);
        }
        typingTest.currentLine++;
        typingTest.currentIndex = 0;
    }
}