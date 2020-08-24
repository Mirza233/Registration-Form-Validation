const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const gender = document.getElementById("gender");
const date = document.getElementById("date");

function showError(input,message) {
	const formControl = input.parentElement;
	formControl.className = formControl.className+" error";
	const small = formControl.querySelector("small");
	small.innerText = message;
}



function showSuccess(input){
	const formControl = input.parentElement;
	formControl.className = "form-control success";
}

function getID(element){
	return element.id.charAt(0).toUpperCase()+element.id.slice(1);
}

function calculate_age(dob) { 
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
  	if (age_dt.getUTCFullYear() - 1970>0){
    return Math.abs(age_dt.getUTCFullYear() - 1970);
	}
	else{
		return 0;
	}
}





function validate(inputArr){
	var b
	var i;
	for (i = 0; i<inputArr.length;i++){
		b = true
		if (inputArr[i].value === ""){
			b = false
			showError(inputArr[i],getID(inputArr[i])+" is required");
		}
		if(getID(inputArr[i]) === "Email" && b){
			if (!validateEmail(inputArr[i].value)){
				b = false
				showError(email,"Invalid format")
			}
		}

		if(["Password","Password2"].includes(getID(inputArr[i])) && b){
			if (inputArr[i].value.length<6){
				b = false;
				showError(inputArr[i],"Password must be at least 6 characters long");
			}
		}

		if(inputArr[i].id === "password2" && password.value!=password2.value && b){
				b = false;
				showError(password,"Passwords don't match");
				showError(password2,"Passwords don't match");
			}

		if(inputArr[i].id === "date"){
			const birthday = date.value;
			const age = calculate_age(new Date(birthday.slice(0,4),birthday.slice(5,7),birthday.slice(8)));
			if (parseInt(age)<18){
				b = false;
				if (age>5){
					showError(date,"Only for 18+");
				}
				else{
					showError(date,"Please enter the real date!")
				}

			}
		}

		if (b){
			showSuccess(inputArr[i])
		}
	}
}



function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


//event listeners
form.addEventListener("submit",function(e){

	e.preventDefault();
	validate([username,email,password,password2,date])



});