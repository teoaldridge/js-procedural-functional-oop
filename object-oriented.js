//Object-Oriented Paradigm

class Validator {
    //static methods allow us to call them without extentiating this class. 
    //i.e. outside this class we can just call Validator.validate()

    static REQUIRED = 'REQUIRED';
    static MIN_LENGTH = 'MIN_LENGTH'; 
    //the parameter flag will be set so it allows us to choose which validation we want to perform
    //validatorValue will be optional, allowing us to configure the validation-
    //(for example specify that we want 5 letters as min in the password).
    //This way we make this a re-usable validate function.
    static validate(value, flag, validatorValue) {
        if (flag === this.REQUIRED) {
            return value.trim().length; 
        }
        if (flag === this.MIN_LENGTH) {
            return value.trim().length > validatorValue; 
        }
    }
}

class User {
    constructor(uName, uPassword) {
        this.userName = uName;
        this.password = uPassword; 
    }

    greet() {
        console.log('Hi, I am ' + this.userName); 
    }
}

class userInputForm {
    constructor() {
        //what we stored in constants in the Procedural style, now we are storing as 
        //properties of this class, and more precicely, 
        //the concrete objects, created based on this class
        this.form = document.getElementById('user-input');
        this.userNameInput = document.getElementById('username');
        this.passwordInput = document.getElementById('password');

        //we add an event listener to trigger the function signupHandler
        //when submit is pressed
        //.bind(this) here ensures that the 'this' keyword inside of singnupHandler
        //will point at the exact same thing 'this' points in the constructor. 
        this.form.addEventListener('submit', this.signupHandler.bind(this))
    }

    signupHandler(event){
        event.preventDefault();
        //if we don't call 'bind' above, this won't work
        const enteredUsername = this.userNameInput.value;
        const enteredPassword = this.passwordInput.value; 

        //here we use our reusable validator function from our validator class
        if(
            !Validator.validate(enteredUsername, Validator.REQUIRED) 
            || !Validator.validate(enteredPassword, Validator.MIN_LENGTH, 5)
        ) {
            alert(
                'Invalid input- username or password is wrong. Password should be at least 6 characters.'
            );
            //we 'return' here to not continue with this method execution
            return;
        }
        
        const newUser = new User(enteredUsername, enteredPassword);
        console.log(newUser);
        newUser.greet();
    }
}

//We need to extentiate the class, by creating a new instance of this class,
//to bring it to life
new userInputForm(); 