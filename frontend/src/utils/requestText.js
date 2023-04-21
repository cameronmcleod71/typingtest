


export async function requestProgrammingTestText(){
    let typingText = {};
    try {
        const response = await fetch('/api/getprogrammingttest');
        const data = await response.json();
        console.log(data);
        typingText = data;
    } catch (err) {
        console.log(err);
    }
    return typingText
}