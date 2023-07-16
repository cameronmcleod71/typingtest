import Cookies from 'universal-cookie'

export async function requestProgrammingTestText(language){
    const cookies = new Cookies();
    let typingText = {};
    let leaderboardData = {};

    try {
        const response = await fetch(`/api/getprogrammingttest?language=${language}`);
        const data = await response.json();
        typingText = data["script"];
        leaderboardData = {
            "lowest": data["lowest"],
            "isFull": data["isFull"]
        };
    } catch (err) {
        console.log(err);
    }
    console.log(leaderboardData);
    return [typingText, leaderboardData]
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


