import { useDispatch, useSelector } from "react-redux"
import { testStarted } from '../redux/testStatus'

let typingTest = {
    testState: {},
    numOfLines: 9,
    currentLine: 1,
    currentIndex: 0,
    typingText: {},
    deleteInterval: 2,
    addedLines: 0,
    testDuration: 60,
    input: "", //to be deleted
}

// will eventually need to store the testDuration in a global store
// for now just give it as it is

export function getTypingTestDuration() {
    return typingTest.testDuration;
}

export function getTypingTest() {
    return typingTest;
}

export function getTestStateClone(typingTest) {
    //return clone
    return JSON.parse(JSON.stringify(typingTest.testState));
}

export function putAwayTestText(typingTest, typingText) {
    typingTest.typingText = typingText;
}

export function initializeProgrammingTypingTest(typingTest) {
    let newTestObj = {};
    for (let i=1; i<=typingTest.numOfLines; i++){
        typingTest.testState[i.toString()] = newLineOfText(typingTest.typingText);
    }
    typingTest.currentIndex = startsWithSpace(typingTest);
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

function getCurrentPosition(typingTest) {
    return (typingTest.testState[typingTest.currentLine.toString()][typingTest.currentIndex])
}

//might make this return a clone
function getTestState(typingTest) {
    return (typingTest.testState);
}

// impure: testText and testState are copied
function addKeyPressToState(typingTest, newValue) {
    if (getCurrentPosition(typingTest).given) {
        typingTest.testState[typingTest.currentLine][typingTest.currentIndex].given += newValue;
    } else {
        typingTest.testState[typingTest.currentLine][typingTest.currentIndex].given = newValue;
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
    if (typingTest.currentIndex !== lineLength(typingTest)-1) typingTest.testState[typingTest.currentLine.toString()].forEach((obj,index) => index >= typingTest.currentIndex ? obj.given='\n' : obj);

}

function deleteOldLinesFromState(typingTest) {
    const keys = Object.keys(typingTest.testState);
    for (let x=0; x<keys.length; x++) {
        if (x<typingTest.numOfLines-typingTest.deleteInterval){ // deleteInterval
            delete typingTest.testState[keys[x]];
        }
    }
}

function addNewLinesToState(typingTest) {
    for (let x=0; x<typingTest.numOfLines-typingTest.deleteInterval*2; x++){ // deleteInterval*2 is what we want to keap from previous lines -- one delete interval for the remaining lines, and on more so we can see some of our previous answers
        typingTest.testState[(typingTest.numOfLines+typingTest.addedLines+x+1).toString()] = newLineOfText(typingTest.typingText);
    }
}

function startsWithSpace(typingTest){
    if(typingTest.testState[typingTest.currentLine.toString()][0].space) return 1;

    return 0;
}

function readyForMoreLines(typingTest) {
    return (typingTest.currentLine === (typingTest.numOfLines + typingTest.addedLines - typingTest.deleteInterval));
}

function handleNewInput(typingTest, newValue, e) { //to be deleted
    if (newValue === " ") {
        typingTest.input = "";
        e.target.value = ""
    } else if (newValue === "Enter" || newValue === "\n") {
        typingTest.input = ""
        e.target.value = ""
    } else {
        typingTest.input += newValue;
    }
}

export function handleBackspace(typingTest) {
    typingTest.input = typingTest.input.slice(0,-1);
}

export function updateProgrammingTestState(typingTest,newValue, e) {
    console.log("Typingtest: ",typingTest, "New value: ", newValue);
    addKeyPressToState(typingTest, newValue);
    handleNewInput(typingTest, newValue, e);
    if (newValue !== "Enter" && newValue !== "\n") { 
        console.log("here321");
        incrementProgrammingTestIndex(typingTest, newValue);
    } else {
        console.log("here123");
        handleEnterKeyPress(typingTest);
        if (readyForMoreLines(typingTest)) { //newLines and deleteInterval
            deleteOldLinesFromState(typingTest);
            addNewLinesToState(typingTest);
            typingTest.addedLines += (typingTest.numOfLines - typingTest.deleteInterval*2);
        }
        typingTest.currentLine++;
        typingTest.currentIndex = startsWithSpace(typingTest);
    }
}

