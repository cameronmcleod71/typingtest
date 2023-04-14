import React from 'react'
import { Box, Text, Container } from '@chakra-ui/react'
import { render } from "react-dom";
import Highlight, { defaultProps } from "prism-react-renderer";
import dracula from 'prism-react-renderer/themes/nightOwl'



export default function Leaderboard() {
    const exampleCode = `
    (function someDemo() {
      var test = "Hello World!";
      console.log(test);
    })();
    
    return () => <App />;
    `;

    const exampleLine0 = [
        {
            "expected": "i",
            "given": ""
        },
        {
            "expected": "m",
            "given": ""
        },
        {
            "expected": "p",
            "given": ""
        },
        {
            "expected": "o",
            "given": ""
        },
        {
            "expected": "r",
            "given": ""
        },
        {
            "expected": "t",
            "given": ""
        },
        {
            "space": "1",
            "given": ""
        },
        {
            "expected": "r",
            "given": ""
        },
        {
            "expected": "a",
            "given": ""
        },
        {
            "expected": "n",
            "given": ""
        },
        {
            "expected": "d",
            "given": ""
        },
        {
            "expected": "o",
            "given": ""
        },
        {
            "expected": "m",
            "given": ""
        },
        {
            "expected": "\n",
            "given": ""
        }
    ];

    const exampleLine1 = [
        {
            "expected": "c",
            "given": ""
        },
        {
            "expected": "l",
            "given": ""
        },
        {
            "expected": "a",
            "given": ""
        },
        {
            "expected": "s",
            "given": ""
        },
        {
            "expected": "s",
            "given": ""
        },
        {
            "space": "1",
            "given": ""
        },
        {
            "expected": "M",
            "given": ""
        },
        {
            "expected": "a",
            "given": ""
        },
        {
            "expected": "z",
            "given": ""
        },
        {
            "expected": "e",
            "given": ""
        },
        {
            "expected": ":",
            "given": ""
        },
        {
            "expected": "\n",
            "given": ""
        }
    ];

    const exampleLine2 = [
        {
            "space": "4",
            "given": ""
        },
        {
            "expected": "d",
            "given": ""
        },
        {
            "expected": "e",
            "given": ""
        },
        {
            "expected": "f",
            "given": ""
        },
        {
            "space": "1",
            "given": ""
        },
        {
            "expected": "_",
            "given": ""
        },
        {
            "expected": "_",
            "given": ""
        },
        {
            "expected": "i",
            "given": ""
        },
        {
            "expected": "n",
            "given": ""
        },
        {
            "expected": "i",
            "given": ""
        },
        {
            "expected": "t",
            "given": ""
        },
        {
            "expected": "_",
            "given": ""
        },
        {
            "expected": "_",
            "given": ""
        },
        {
            "expected": "(",
            "given": ""
        },
        {
            "expected": "s",
            "given": ""
        },
        {
            "expected": "e",
            "given": ""
        },
        {
            "expected": "l",
            "given": ""
        },
        {
            "expected": "f",
            "given": ""
        },
        {
            "expected": ",",
            "given": ""
        },
        {
            "space": "1",
            "given": ""
        },
        {
            "expected": "w",
            "given": ""
        },
        {
            "expected": "i",
            "given": ""
        },
        {
            "expected": "d",
            "given": ""
        },
        {
            "expected": "t",
            "given": ""
        },
        {
            "expected": "h",
            "given": ""
        },
        {
            "expected": ",",
            "given": ""
        },
        {
            "space": "1",
            "given": ""
        },
        {
            "expected": "h",
            "given": ""
        },
        {
            "expected": "e",
            "given": ""
        },
        {
            "expected": "i",
            "given": ""
        },
        {
            "expected": "g",
            "given": ""
        },
        {
            "expected": "h",
            "given": ""
        },
        {
            "expected": "t",
            "given": ""
        },
        {
            "expected": ")",
            "given": ""
        },
        {
            "expected": ":",
            "given": ""
        },
        {
            "expected": "\n",
            "given": ""
        }
    ]

    const exampleLine3 = [
        {
            "space": "8",
            "given": ""
        },
        {
            "expected": "s",
            "given": ""
        },
        {
            "expected": "e",
            "given": ""
        },
        {
            "expected": "l",
            "given": ""
        },
        {
            "expected": "f",
            "given": ""
        },
        {
            "expected": ".",
            "given": ""
        },
        {
            "expected": "w",
            "given": ""
        },
        {
            "expected": "i",
            "given": ""
        },
        {
            "expected": "d",
            "given": ""
        },
        {
            "expected": "t",
            "given": ""
        },
        {
            "expected": "h",
            "given": ""
        },
        {
            "space": "1",
            "given": ""
        },
        {
            "expected": "=",
            "given": ""
        },
        {
            "space": "1",
            "given": ""
        },
        {
            "expected": "w",
            "given": ""
        },
        {
            "expected": "i",
            "given": ""
        },
        {
            "expected": "d",
            "given": ""
        },
        {
            "expected": "t",
            "given": ""
        },
        {
            "expected": "h",
            "given": ""
        },
        {
            "expected": "\n",
            "given": ""
        }
    ]

   
    const exampleLine = [
        {
            "expected": "f",
            "given": ""
        },
        {
            "expected": "o",
            "given": ""
        },
        {
            "expected": "r",
            "given": ""
        },
        {
            "space": "1",
            "given": ""
        },
        {
            "expected": "y",
            "given": ""
        },
        {
            "space": "1",
            "given": ""
        },
        {
            "expected": "i",
            "given": ""
        },
        {
            "expected": "n",
            "given": ""
        },
        {
            "space": "1",
            "given": ""
        },
        {
            "expected": "r",
            "given": ""
        },
        {
            "expected": "a",
            "given": ""
        },
        {
            "expected": "n",
            "given": ""
        },
        {
            "expected": "g",
            "given": ""
        },
        {
            "expected": "e",
            "given": ""
        },
        {
            "expected": "(",
            "given": ""
        },
        {
            "expected": "s",
            "given": ""
        },
        {
            "expected": "e",
            "given": ""
        },
        {
            "expected": "l",
            "given": ""
        },
        {
            "expected": "f",
            "given": ""
        },
        {
            "expected": ".",
            "given": ""
        },
        {
            "expected": "h",
            "given": ""
        },
        {
            "expected": "e",
            "given": ""
        },
        {
            "expected": "i",
            "given": ""
        },
        {
            "expected": "g",
            "given": ""
        },
        {
            "expected": "h",
            "given": ""
        },
        {
            "expected": "t",
            "given": ""
        },
        {
            "expected": ")",
            "given": ""
        },
        {
            "expected": ":",
            "given": ""
        },
        {
            "expected": "\n",
            "given": ""
        }
    ];

    

    const test123 = <span>test</span>;
    console.log(test123);
    // exampleLine.map((obj,index) => (obj.space ? " ".repeat(parseInt(obj.space)) : obj.expected)).join("")

    function codeArrayToString(array) {
        return (array.map((obj,index) => (obj.space ? " ".repeat(parseInt(obj.space)) : obj.expected)).join(""));
    }

    function removeExtraSpace(s) {
        let prevChar = "";
        let curChar = "";
        let newS = "";
        for (let x = 0; x<s.length; x++) {
            curChar = s.charAt(x);
            if (prevChar === " " && curChar === prevChar) {
            } else {
                newS += curChar;
            }
            prevChar = curChar;       
        }
        return newS;
    }

    console.log(removeExtraSpace(codeArrayToString(exampleLine3)));
    
    return (
        <Box>
            <CodeBlock code={exampleLine0.map((obj,index) => (obj.space ? " ".repeat(parseInt(obj.space)) : obj.expected)).join("")} />
            <CodeBlock code={exampleLine1.map((obj,index) => (obj.space ? " ".repeat(parseInt(obj.space)) : obj.expected)).join("")} />
            <CodeBlock code={exampleLine2.map((obj,index) => (obj.space ? " ".repeat(parseInt(obj.space)) : obj.expected)).join("")} />
            <CodeBlock code={exampleLine.map((obj,index) => (obj.space ? " ".repeat(parseInt(obj.space)) : obj.expected)).join("")} />
            <CodeBlock code={codeArrayToString(exampleLine0)+codeArrayToString(exampleLine1)+codeArrayToString(exampleLine2)+codeArrayToString(exampleLine3)} />
            <Highlight {...defaultProps} code={"test"} language="python" theme={dracula}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={style}>
                {tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => {
                        console.log("Token's value:",token.content, "The Token:", token);
                        return (<span {...getTokenProps({ token, key })}></span>);
                        // console.log("The token: ", token.content);
                        // if(token.content === "in") {
                        //     console.log("herehere");
                        //     return (<span {...getTokenProps({ token, key })}>{["i",<span style={{color: "#E91111"}}>n</span>]}</span>);
                        // } else {
                        //     return (<span {...getTokenProps({ token, key })} style={{filter: "opacity(0.5)"}} />);
                        // }
                    })}
                    </div>
                ))}
                </pre>
            )}
            </Highlight>
            <CodeBlock code={exampleLine.map((obj,index) => (obj.space ? " ".repeat(parseInt(obj.space)) : obj.expected)).join("")} />

        </Box>
      ); 

}



function CodeBlock(props) {

    return (
        <div color="black" bg="purple">
            <Highlight {...defaultProps} code={props.code} language="python" theme={dracula}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={style}>
                {tokens.map((line, i) => (
                    <div style={{background:"black"}}{...getLineProps({ line, key: i })}>
                    {line.map((token, key) => {
                        console.log("Token's value:",token.content, "The Token:", token);
                        if (token.content === "\n") return (<span></span>);
                        return (<span {...getTokenProps({ token, key })}>
                            <span>{token.content.split("")}</span>
                        </span>);
                        // console.log("The token: ", token.content);
                        // if(token.content === "in") {
                        //     console.log("herehere");
                        //     return (<span {...getTokenProps({ token, key })}>{["i",<span style={{color: "#E91111"}}>n</span>]}</span>);
                        // } else {
                        //     return (<span {...getTokenProps({ token, key })} style={{filter: "opacity(0.5)"}} />);
                        // }
                    })}
                    </div>
                ))}
                </pre>
            )}
            </Highlight>

        </div>
      );
}
