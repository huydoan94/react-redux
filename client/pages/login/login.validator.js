export default function validateInput(data) {
    let username = data.username;
    let password = data.password;
    let errors = {};
    let isValid = true;

    if (username === null || username.trim() === '') {
        errors.username = 'This field is required';
        isValid = false;
    }

    if (password === null || password.trim() === '') {
        errors.password = 'This field is required';
        isValid = false;
    }

    return {
        errors,
        isValidated: isValid
    };
}