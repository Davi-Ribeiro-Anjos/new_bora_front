const genUsers = () => {
    let users = [];

    for (let i = 1; i <= 300; i++) {
        let id = i;
        let firstName = generateRandomString(5);
        let lastName = generateRandomString(7);
        let gender = generateRandomGender();
        let age = generateRandomAge();
        let postcode = generateRandomPostcode();
        let email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;

        let user = {
            id: id,
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            age: age,
            postcode: postcode,
            email: email,
        };

        users.push(user);
    }

    return users
}


function generateRandomString(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function generateRandomGender() {
    return Math.random() < 0.5 ? 'Male' : 'Female';
}

function generateRandomAge() {
    return Math.floor(Math.random() * (70 - 18 + 1) + 18);
}

function generateRandomPostcode() {
    let randomNumbers = Math.floor(Math.random() * 90000) + 10000;
    let randomLetters = generateRandomString(2);
    return `${randomNumbers}-${randomLetters}`;
}

export default genUsers;