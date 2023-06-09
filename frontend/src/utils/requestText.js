import Cookies from 'universal-cookie'

// export async function requestProgrammingTestText(language){
//     let typingText = {};
//     try {
//         const response = await fetch('/api/getprogrammingttest');
//         const data = await response.json();
//         typingText = data;
//     } catch (err) {
//         console.log(err);
//     }
//     return typingText
// }
export async function requestProgrammingTestText(language){
    const cookies = new Cookies();
    let typingText = {};
    try {
        const response = await fetch('/api/getprogrammingttest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': cookies.get('csrftoken'),
            },
            // credentials: 'same-orgin',
            body: JSON.stringify({language}),
        });
        const data = await response.json();
        typingText = data;
    } catch (err) {
        console.log(err);
    }
    return typingText
}

export async function requestSpecialCTestText(language){
    let typingText = {};
    try {
        const response = await fetch('/api/typingtest');
        const data = await response.json();
        typingText = data;
    } catch (err) {
        console.log(err);
    }

    return typingText
}


