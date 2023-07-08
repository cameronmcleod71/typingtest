import React, {useEffect} from "react";
import { motion, isValidMotionProp, useAnimation } from "framer-motion";
import { chakra, shouldForwardProp } from "@chakra-ui/react";

const ChakraBox = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

export default function MotionCursor({isInFocus, currentIndex, numOfChars, isCurrentLine, numOfSpaces, lineNum, children, ...props }) {
  // const variants = {
  //   start: {
  //     "&::before": {
  //       transform: "translateX(0px)",
  //     },
  //   },
  //   end: {
  //     "&::before": {
  //       transform: "translateX(100px)",
  //     },
  //   },
  // };
  const variants = {
    start: {
      "--before-x": "translateX(0)"
    },
    end: {
      "--before-x": "translateX(100)"
    },
  };

  const move = useAnimation();
  useEffect(() => {
    move.start("end");
  }, [move]);

  return (
    <ChakraBox
      height="max-content" 
      width="max-content"
      variants={variants}
      initial="start"
      animate="move"
      transition={{ duration: 1}}
      sx={{
        position: "relative",
        width: "max-content",
        height: "max-content",
        display: "flex",
        "flex-wrap": "wrap",
        // "background-color": "red",
        "&::before": {
          content: '""',
          "border-left": "2px solid",
          "border-color": "grey",
          "white-space": "nowrap",
          overflow: "hidden",
          position: "absolute",
          top: "0",
          // right: "0",
          bottom: "0",
          // left: "0"
        },
      }}
      {...props}
    >
      {children}
    </ChakraBox>
  );
}
