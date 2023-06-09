import React from "react";
import { Box } from "@chakra-ui/react";
import Highlight, { defaultProps } from "prism-react-renderer";
import dracula from "prism-react-renderer/themes/nightOwl";

const background = {
  background: "customBackground",
};

export default function ProgrammingTestTextLineRenderer(props) {
  const codeToPrint = codeArrayToString(props.testTextLine);
  let lineIndex = 0;

  //need to make a function to remove consecutive spaces before we map
  function removeExtraSpace(s) {
    let prevChar = "";
    let curChar = "";
    let newS = "";
    for (let x = 0; x < s.length; x++) {
      curChar = s.charAt(x);
      if (prevChar === " " && curChar === prevChar) {
      } else {
        newS += curChar;
      }
      prevChar = curChar;
    }
    return newS;
  }

  function codeArrayToString(array) {
    return array
      .map((obj, index) =>
        obj.space ? " ".repeat(parseInt(obj.space)) : obj.expected
      )
      .join("");
  }

  return (
    <Box required={true} fontFamily="Iosevka">
      <Highlight
        {...defaultProps}
        code={codeToPrint}
        language="python"
        theme={dracula}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <Box
                {...getLineProps({ line, key: i })}
                background="customBackground"
                key={i}
              >
                {line.map((token, key) => {
                  if (token.content === "\n") return <span key={key}></span>;
                  return (
                    <span {...getTokenProps({ token, key })} key={key}>
                      <span
                        // style={{
                        //   // "max-width": "max-content",
                        // }}
                      >
                        {token.content === "" ? (
                          <span></span>
                        ) : (
                          //note: newline will just be an empty token
                          removeExtraSpace(token.content)
                            .split("")
                            .map((char, index) => {
                              if (char === "\n") return <span></span>;
                              let curTokenChar = char;
                              // if curLetter is incorrect, make it wrong color, if its correct make opacity 0.6
                              let curCharObj = props.testTextLine[lineIndex];
                              if (lineIndex < props.testTextLine.length - 1)
                                lineIndex += 1;

                              if (curTokenChar === " ") {
                                if (curCharObj.given === "") {
                                  //we havnt reached this yet so just print all spaces
                                  return (
                                    <span style={{ "whiteSpace": "pre" }}>
                                      {" ".repeat(parseInt(curCharObj.space))}
                                    </span>
                                  );
                                } else {
                                  return [...curCharObj.given].map(
                                    (char, index) => {
                                      if (char === " " || char === "\n") {
                                        // return correct character
                                        return (
                                          <span
                                            style={{
                                              filter: "opacity(0.3)",
                                              "white-space": "pre",
                                            }}
                                          >
                                            {" "}
                                          </span>
                                        );
                                      } else {
                                        // return it as wrong
                                        return (
                                          <span
                                            style={{
                                              color: "#F9F871",
                                              "white-space": "pre",
                                            }}
                                          >
                                            {char +
                                              (index ===
                                              curCharObj.given.length - 1
                                                ? " "
                                                : "")}
                                          </span>
                                        );
                                      }
                                    }
                                  );
                                }
                              } else if (curCharObj.given === "") {
                                // proceed as if we havnet reached it yet
                                return (
                                  <span>
                                    {curTokenChar === "\n" ? "" : curTokenChar}
                                  </span>
                                );
                              } else {
                                if (curTokenChar === "\n") {
                                  //print all extra chars that are not newline as wrong
                                  return [...curCharObj.given].map((char) => {
                                    if (char === "\n") {
                                      //may change this to nothing
                                      return (
                                        <span
                                          style={{
                                            color: "#238A84",
                                            "white-space": "pre",
                                          }}
                                        >
                                          {""}
                                        </span>
                                      );
                                    } else {
                                      return (
                                        <span
                                          style={{
                                            color: "#F9F871",
                                            "white-space": "pre",
                                          }}
                                        >
                                          {char}
                                        </span>
                                      );
                                    }
                                  });
                                } else if (
                                  curCharObj.expected === curCharObj.given
                                ) {
                                  return (
                                    <span style={{ filter: "opacity(0.3)" }}>
                                      {curTokenChar}
                                    </span>
                                  );
                                } else if (
                                  curCharObj.expected !== curCharObj.given
                                ) {
                                  return (
                                    <span style={{ color: "#F9F871" }}>
                                      {curTokenChar}
                                    </span>
                                  );
                                }
                              }
                            })
                        )}
                      </span>
                    </span>
                  );
                })}
              </Box>
            ))}
          </pre>
        )}
      </Highlight>
    </Box>
  );
}
