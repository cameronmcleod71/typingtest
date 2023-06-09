import Cookies from 'universal-cookie'

export function saveResults(testPackage) {
    const cookies = new Cookies();
    console.log(testPackage);
    try {
        fetch('api/savecompletedtypingtest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': cookies.get('csrftoken'),
            },
            body: JSON.stringify(testPackage),
        })
        .then((response) =>
            response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((err) =>
            console.log(err)
        );
    
    } catch {

    }
}


export function getPastResults() {
    try {
        return (fetch('api/getcompletedtypingtest', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) =>
            response.json())
        .then((data) => {
            console.log(data);
            if (data.success) {
                return (data.success);
            } else {
                return [];
            }
        })
        .catch((err) =>
            console.log(err)
        ));
    } catch {

    }

}



