import { Box } from "@chakra-ui/react";
import { css, keyframes } from "@emotion/react";
import { useState, useRef, useEffect } from "react";

let caret = {
  buttonPressCount: 0,
  charWidth: 0,
  curPosition: 0,
};

// function setCharLength() {
//   const textWidth = caret.compRef.clientWidth;
//   caret.charWidth = textWidth / caret.numOfChars;
// }

function stopCaret(setBackground) {
  const currentPresses = caret.buttonPressCount;
  setBackground("grey");
  setTimeout(() => {
    if (currentPresses === caret.buttonPressCount)
      setBackground("transparent");
    else setBackground("grey");
  }, 1000);
}

export default function Cursor({currentIndex, numOfChars, children, isCurrentLine, numOfSpaces, isInFocus, lineNum, ...props}) {
  const ref = useRef();
  const savePosition = useRef(0);
  const firstPress = useRef(false);
  const savedNumOfChars = useRef(0);
  const savedLineNum = useRef(0);
  const [position, setPosition] = useState(0);
  const [background, setBackground] = useState("transparent");
  const [charWidth, setCharWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  function setCharLength() {
    const textWidth = ref.current.clientWidth;
    const tempCharWidth = textWidth / numOfChars;
    setCharWidth(tempCharWidth);
  }
  
  function setWidth() {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    // savePosition.current = parseInt(numOfSpaces);
    // setPosition(prevState => (savePosition.current * (ref.current.clientWidth / numOfChars)));
    // savedNumOfChars.current = numOfChars;
    window.addEventListener('resize', setWidth);
    return () => {
      window.removeEventListener('resize', setWidth);
    }
  },[]);

  useEffect(() => {

    setPosition(prevState => (savePosition.current * (ref.current.clientWidth / numOfChars)));
  }, [windowWidth]);


  useEffect(() => {
    savePosition.current = parseInt(numOfSpaces);
    firstPress.current = false;
    setPosition(prevState => (savePosition.current * (ref.current.clientWidth / numOfChars)));
    savedNumOfChars.current = numOfChars;
    savedLineNum.current = lineNum;
  },[lineNum]);

  const blink = keyframes`
    from , to { border-color: ${isInFocus ? background : "transparent"} }
    50% { border-color: ${isInFocus ? "grey" : "transparent"} }
  `;


  const move = keyframes`
      to {
          left: ${position + charWidth}px;
      }
  `;

  const textCursor = css`
    color: grey;
    position: relative;
    width: max-content;
    &::before {
      content: "";
      border-left: 2px solid;
      border-color: grey;
      white-space: nowrap;
      overflow: hidden;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0px;
      left: ${position}px;
      animation: ${move} 0.15s forwards,
        ${blink} 0.3s step-end infinite alternate;
    }
  `;

  useEffect(() => {
    caret.curPosition = currentIndex;
  }, [isCurrentLine]);

  useEffect(() => {
    if (isCurrentLine) {
      if ((currentIndex > caret.curPosition || savedNumOfChars.current < numOfChars) && savedLineNum.current === lineNum) {
        caret.buttonPressCount++;
        stopCaret(setBackground);
        caret.curPosition = currentIndex;
        !firstPress.current ? null : savePosition.current+=1;
        firstPress.current = true;
        setCharLength();
      } else if (currentIndex < caret.curPosition || savedNumOfChars.current > numOfChars) {
        caret.buttonPressCount++;
        stopCaret(setBackground);
        caret.curPosition = currentIndex;
        savePosition.current-=1;
        setCharLength();
      }
    }
  }, [currentIndex, numOfChars]);

  useEffect(() => {
    if (isCurrentLine && firstPress.current && (ref.current.clientWidth / numOfChars) === charWidth) {
      caret.curPosition = currentIndex;
      setPosition(savePosition.current*charWidth);
    }
  });

  return (
    <Box height="max-content" width="max-content" ref={ref} css={isCurrentLine ? textCursor : {}} flexWrap="wrap" {...props}>
      {children}
    </Box>
  );
}
