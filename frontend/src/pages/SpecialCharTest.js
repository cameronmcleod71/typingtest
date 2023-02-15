import React, { useEffect, useState, useRef } from 'react'
import { Container, Heading } from '@chakra-ui/react'
import SpecialCharTestView from '../components/SpecialCharTestView'
import SpecialCharTestInput from '../components/SpecialCharTestInput'
import { exampleSpecialTest } from '../typingtest/specialchar'

//TODO: make a length constant for the chars on a line
//semi colons, clean code, comments

export default function SpecialCharTest() {
    const [shownChars, setShownChars] = useState([]); //these are the characters that will appear in the bottom two rows
    const [prevChars, setPrevChars] = useState([]); //this keaps track of the chars in the top row (the previously typed chars)
    const [approachingChars, setApproachingChars] = useState([]);
    //NOTE: might seperate the bottom two rows into seperate rows ( the exchange between rows would be alot cleaner

    let typingTest = useRef([]);
    let currentCharIndex = useRef(0);
    let testInitialized = useRef(false);
    let input = "";

    const lineLength = 10; //this is a constant to set the number of characters in each line

    useEffect(() => {
            fetch('/api/typingtest')
            .then((response) => 
                response.json())  //Note for future me: when you have a function with one line, javascript will return whats on that one line
            .then((data) => {
                typingTest.current = data.test.map((char) => { 
                    return {word:char,state:''};
                });
                initializeTest();      
            });
            
            
            
        },
        []
    );
    useEffect(() => {
        if (testInitialized.current) {
            updateTestState();
        }
    },[shownChars]);


    

    const handleKeyPress = (e) => {
        if (!testInitialized.current){
            testInitialized.current = true;
        }
        //need to update currentChar, shownChars, prevChars (prevChars and shownChars will only change once every 10 spaces
        if (e.key === " ") {
            if (input === shownChars[currentCharIndex.current].word) {
                // green text
                console.log(shownChars[currentCharIndex.current]);

                setShownChars(shownChars.map((obj,index) => {
                    if (index === currentCharIndex.current) {
                        return {...obj,state:'o'};
                    } else {
                        return obj;
                    }
                }));
                    


            } else {
                // red text
                setShownChars(shownChars.map((obj,index) => {
                    if (index === currentCharIndex.current) {
                        return {...obj,state:'x'};
                    } else {
                        return obj;                 // could be made into one function
                    }
                }));


            }
            e.target.value = "";
            
        } else {
            input = input + e.key;
        }
        

    }

    function initializeTest() {
        //sets the currentChar and the shown chars
        //grab the first 20 chars from typingTest
        setShownChars(typingTest.current.splice(0,lineLength));
        setApproachingChars(typingTest.current.splice(0,lineLength));
    }
    function updateTestState() {
        // if keypress matches the current, current turns green, if not then red
        // currentChar moves to next char in shown chars - shownChars is updated with color
        // if count is 10, prevChars is updated with the next 10 chars of shown chars, shown chars grabs the next 10 chars from typingTest
        if (currentCharIndex.current === lineLength-1) {
            testInitialized.current = false;
            // update prevshownchars, shown chars
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

    return (
       <Container>
            <SpecialCharTestView curChars={shownChars} prevChars={prevChars} approachingChars={approachingChars} />
            <SpecialCharTestInput handleKeyPress={handleKeyPress}/>
       </Container>
    );
}

