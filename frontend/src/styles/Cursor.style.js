import { css, keyframes } from "@emotion/react";

// export const Cursor = {  
//     cursorContainer: css({
//         display: 'inline-block'
//     }),

//     cursorText: css({
//         borderRight: '5px solid',
//         width: '100%',
//     })
// }; animation: ${cursorAnimation};

// const blink = keyframes`
//     50% {
//         border-color: transparent;
//     }
// `;

// const typing = keyframes`
//     0% {
//         border-left: 2px solid;
//     } 

//     100% {
//         border-right: 2px solid;
//     }
// `;

// const cursorAnimation = () => css`
//     animation: ${blink} 4s stepEnd infinite alternate;
// `;

// export const CursorWrapper = css`
//   width: 100%;
//   border-left: 2px solid;
//   border-color: grey;
//   white-space: nowrap;
//   overflow: hidden;
//   animation: ${blink} 1s step-end infinite alternate;
// `;



// export const CursorWrapper = css`
//     border-left: 1px solid;
//     color: blue;
// `;

// export const CursorWrapper = css({
//     borderLeft: '1px solid',
//     width: '100%',
//     whiteSpace: 'nowrap',
//     overflow: 'hidden',
//     color: "blue",
//     transition: ""
// });

const position = 0;

function movePosition() {
    position += 10;
}

const blink = keyframes`
        50% {
            border-color: transparent;
        }
    `;

const move = keyframes`
    to {
        left: ${position+10}px;
    }
`;

const textCursor = css`
        color: white;
        position: relative;
        width: max-content;
        &::before {
            content: '';
            border-left: 2px solid;
            border-color: grey;
            white-space: nowrap;
            overflow: hidden;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: ${position}px;
            animation: 
                ${blink} 0.3s step-end infinite alternate,
                ${move} 0.5s forwards;
        }
    `;
