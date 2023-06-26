import React, {
  Children,
  isValidElement,
  cloneElement,
  useState,
  useEffect,
  useContext,
} from "react";
import { Box, Spinner, VStack, Container } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import {
  putAwayTestText,
  getTestStateClone,
  getTypingTest,
  handleBackspace,
  timerStarted,
  resetTypingTest,
  exportFinishedResults,
  endOfTypingText,
} from "../utils/typingtest";
import { Navigate } from "react-router-dom";
import { FlipTextContext } from "../context/Context";
import { testReset } from "../redux/testStatus";

async function initiate(initFunc, requestTestTextFunc, setState, language) {
  try {
    let typingTest = getTypingTest();
    const testText = await requestTestTextFunc(language);
    putAwayTestText(typingTest, testText);
    initFunc();
    setState(getTestStateClone());
  } catch (err) {
    console.log(err);
  }
}

function update(updateFunc, setState, newValue, e) {
  let typingTest = getTypingTest();
  updateFunc(typingTest, newValue, e);
  setState(getTestStateClone(typingTest));
}

export default function TypingTest({
  children,
  type,
  language,
  initFunc,
  updateFunc,
  requestTestTextFunc,
  ...props
}) {
  const [currentText, setCurrentText] = useState({});
  const [height, setHeight] = useState(window.innerHeight);

  const { flipText, setFlipText } = useContext(FlipTextContext);

  const isCompleted = useSelector((state) => state.testStatus.isCompleted);
  const didTimerStart = useSelector((state) => state.testStatus.isStarted);
  const dispatch = useDispatch();

  const setWindowHeight = () => {
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    initiate(initFunc, requestTestTextFunc, setCurrentText, language);
    window.addEventListener("resize", setWindowHeight);
    return () => {
      resetTypingTest();
      dispatch(testReset(false));
      window.removeEventListener("resize", setWindowHeight);
    };
  }, []);

  useEffect(() => {
    if (
      type === "programmer" &&
      !didTimerStart &&
      Object.keys(currentText).length !== 0
    ) {
      initFunc();
      setCurrentText(getTestStateClone());
    }
  }, [height]);

  const handleKeyPress = (e) => {
    e.preventDefault();
    timerStarted(didTimerStart, dispatch);
    update(updateFunc, setCurrentText, e.key, e); //might move timer elsewhere
  };

  const handleKeyDown = (e) => {
    //to be deleted
    if (e.key === "Backspace") {
      let typingTest = getTypingTest();
      handleBackspace(typingTest);
      setCurrentText(getTestStateClone(typingTest));
    }

    if (e.key === "Tab") {
      e.preventDefault();
      document.getElementById("repeatAutoFocus").focus();
    }

    if (e.key === "Enter") {
      setFlipText((prev) => false);
    }

    if (e.key === "ArrowRight") {
      setFlipText((prev) => true);
    }
    if (e.key === "ArrowLeft") {
      setFlipText((prev) => false);
    }
  };

  if (isCompleted === true || endOfTypingText()) {
    // dispatch iscompleted and isstarted to false
    const results = exportFinishedResults();
    return (
      <Navigate
        to="/results"
        state={{
          completedEntries: results[0],
          type: type,
          duration: results[1],
          language: language,
        }}
      />
    );
  }

  return (
    <>
      {Object.keys(currentText).length === 0 ? (
        <Box width="100%" display="flex" justifyContent="center" height="30vh" alignItems="center">
            <Spinner size="xl" color="customForeground"
              thickness='6px'
              speed='0.65s'
            />
        </ Box>
      ) : (
        
        <VStack>
          {Children.map(children, (child) => {
            if (!isValidElement(child)) return null;

            return cloneElement(child, {
              ...child.props,
              handleKeyPress: handleKeyPress,
              handleKeyDown: handleKeyDown,
              testText: currentText,
              currentLine: getTypingTest().currentLine,
              currentIndex: getTypingTest().currentIndex,
            });
          })}
        </VStack>
      )}
    </>
  );
}
