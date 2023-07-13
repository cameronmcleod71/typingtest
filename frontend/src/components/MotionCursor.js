import React, {useEffect, useState, useRef} from "react";
import { motion, isValidMotionProp, useAnimation } from "framer-motion";
import { chakra, shouldForwardProp, Box } from "@chakra-ui/react";

const Cursor = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

export default function MotionCursor({isInFocus, currentIndex, numOfChars, isCurrentLine, numOfSpaces, lineNum, children, ...props }) {
  const [position, setPosition] = useState([0, 0]);
  const [charWidth, setCharWidth] = useState(0);
  const ref = useRef();
  const firstCall = useRef(true);
  const prevPosition = useRef(0);
  const prevNumOfChars = useRef(0);
  const controls = useAnimation();
  

  function setCharLength() {
    const textWidth = ref.current.clientWidth;
    const tempCharWidth = textWidth / numOfChars;
    setCharWidth(tempCharWidth);
  }


  useEffect(() => {
    if (isCurrentLine) {
      if(firstCall.current){
        firstCall.current = false;
      } else {
        if (prevNumOfChars.current > numOfChars || prevPosition.current > currentIndex) {
          setPosition(prev => [prev[1], prev[1] - charWidth]);
        } else {
          setPosition(prev => [prev[1], prev[1] + charWidth]);
        }
      }
      prevPosition.current = currentIndex;
      prevNumOfChars.current = numOfChars;
    }
  },[currentIndex, numOfChars, isCurrentLine]);

  useEffect(() => {
    setCharLength();
    prevPosition.current = currentIndex;
    prevNumOfChars.current = numOfChars;
  }, [lineNum, charWidth]);

  useEffect(() => {
    setPosition([parseInt(numOfSpaces)*charWidth, parseInt(numOfSpaces)*charWidth]);
  }, [charWidth]);

  useEffect(() => {
    controls.set({opacity: 1});
    controls.start("end");
  }, [position]);

  const variants = {
    start: {
      x: position[0],
    },
    end: {
      x: position[1],
      opacity: 0,
      transition: { duration: 0.11, opacity: { delay: 1.5, duration: 0.75, repeat: Infinity, ease: "backIn" } }, 
    },
  };

  return (
    <Box height="max-content" width="max-content" position="relative">
      <Cursor
        height="100%"
        width="100%"
        opacity={1}
        variants={variants}
        initial="start"
        animate={controls}
        position="absolute"
        borderLeft="2px"
        borderColor={isCurrentLine ? "gray" : "transparent"}
        {...props}
      />
      <Box ref={ref}>
        {children}
      </Box>
    </Box>
  );
}
