

export function calculateStats(testResults, type, duration) {
    let results = {
        'wpm': 0,
        'cpm': 0,
        'accuracy': 0
    };
    const [totalCorrect, totalCompleted] = countAnswers(testResults);
    results.cpm = calculateCPM(totalCorrect, duration);
    results.wpm = calculateWPM(totalCorrect, duration);
    results.accuracy = calculateAccuracy(totalCorrect, totalCompleted);
    return results;
}

function calculateCPM(totalCorrect, duration) {
    return Math.round((totalCorrect / duration) * 60);
}

// Counts the correct or false answers within a given array of results
// Takes testResults, an array of objects containing the results of a taken test
// isCorrect is a boolean value which is true if you want to count correct answers or 'o', and false if you want to count wrong answers or 'x'
function countAnswers(testResults) {
    const [correctChars, completedChars] = testResults.reduce(([totalCorrect, totalCompleted],currentObj) => {
        if (currentObj.given === "" || currentObj.space || currentObj.expected === "\n") return ([totalCorrect, totalCompleted]); //currently not counting space or enter as a char
        if (currentObj.given === currentObj.expected) return ([totalCorrect+1, totalCompleted+1]);
        return ([totalCorrect, totalCompleted+1]);
    }, [0,0]);

    return([correctChars,completedChars]);
    
}

function calculateWPM(totalCorrect, duration) {
    return Math.round(((totalCorrect/5) / duration) * 60);
}

function calculateAccuracy(totalCorrect, totalCompleted) {
    return Math.round((totalCorrect / totalCompleted) * 100);
}

