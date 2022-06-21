//Functional Paradigm

//When you write functional code you need to strive 
//your functions to be pure, and all their input to be received as parameters,
//so that your functions are as predictable, side-effect free, and as reusable as possible. 

//here we can copy the same logic as in the object-oriented paradigm here, and just adjust it a bit: 

const REQUIRED = 'REQUIRED';
const MIN_LENGTH = 'MIN_LENGTH';

function validate(value, flag, validatorValue) {
  if (flag === REQUIRED) {
    return value.trim().length > 0;
  }
  if (flag === MIN_LENGTH) {
    return value.trim().length > validatorValue;
  }
}

//here we make the function getting user input reusable
function getUserInput(inputElementId) {
  return document.getElementById(inputElementId).value;
}

//we could add the validation logic in the signupHandler function, but here we want 
//to separate our logic in reusable functions
//we create function createUser which will hold the validation logic. 
function createUser(userName, userPassword) {
  if (!validate(userName, REQUIRED) || !validate(userPassword, MIN_LENGTH, 5)) {
    throw new Error(
      'Invalid input - username or password is wrong (password should be at least six characters).'
    );
  }
  return {
    userName: userName,
    password: userPassword
  };
}

function greetUser(user) {
  console.log('Hi, I am ' + user.userName);
}

function signupHandler(event) {
  event.preventDefault();
  //we apply the reusable getUserInput here:
  const enteredUsername = getUserInput('username');
  const enteredPassword = getUserInput('password');

  try {
    const newUser = createUser(enteredUsername, enteredPassword);
    console.log(newUser);
    greetUser(newUser);
  } catch (err) {
    alert(err.message);
  }
}

function connectForm(formId, formSubmitHandler) {
  const form = document.getElementById(formId);
  form.addEventListener('submit', formSubmitHandler);
}

connectForm('user-input', signupHandler);
