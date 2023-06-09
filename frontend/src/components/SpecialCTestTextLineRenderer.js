import React from "react";
import { Box, Text } from "@chakra-ui/react";
// import { CursorWrapper } from "../styles/Cursor.style";
import { css } from "@emotion/react";

export default function SpecialCTestTextLineRenderer(props) {
  return (
    <Box required="true">
      <Text
        fontFamily="Iosevka"
        fontSize={{ base: "3xl", lg: "5xl" }}
        // mx="10px"
      >
        {props.testTextLine.length === 0 ? (
          <pre style={{ "font-family": "Iosevka" }}></pre>
        ) : (
          props.testTextLine.map((obj, index) => {
            if (obj.given === "") {
              // return ( <span style={{'color':'#A5ABBD'}}><span style={ ( props.isCurrentLine && index === props.currentIndex ) ? {'color':'#1F2430', 'text-decoration': 'underline 4px1', "text-underline-position1": "under", "text-underline-offset1": "4px","border-radius":"6px","background":'#A5ABBD',"text-align":"center"} : {'color':'#A5ABBD'}}>{obj.expected}</span>{" "}</span>);
              return (
                <span style={{ color: "#A5ABBD" }}>
                  <span
                    css={
                      props.isCurrentLine && index === props.currentIndex
                        ? false
                        : css({ color: "#A5ABBD" })
                    }
                  >
                    {obj.expected}
                  </span>{" "}
                </span>
              );
            } else if (obj.expected !== obj.given) {
              return (
                <span style={{ color: "#F9F871" }}>{obj.expected + " "}</span>
              );
            } else if (obj.expected === obj.given) {
              return (
                <span style={{ color: "#238A84" }}>{obj.expected + " "}</span>
              );
            }
          })
        )}
      </Text>
    </Box>
  );
}
