const name = document.querySelector('[data-user="name"]');

const email = document.querySelector('[data-user="email"]');
const emailConfirm = document.getElementById('emailConfirm');

const password = document.querySelector('[data-user="password"]');
const passwordConfirm = document.getElementById('passwordConfirm');

const postalCode = document.querySelector('[data-address="postal-code"]');
const street = document.querySelector('[data-address="address"]');
const hood = document.querySelector('[data-address="hood"]');
const city = document.querySelector('[data-address="city"]');
const state = document.querySelector('[data-address="state"]');
const number = document.querySelector('[data-address="number"]');

const register = document.getElementById('register');

function clearPostalCodeForm() {
    postalCode.value=("");
    street.value=("");
    hood.value=("");
    city.value=("");
    state.value=("");
};

function callback(content) {
    if (!("erro" in content)) {
        street.value=(content.logradouro);
        hood.value=(content.bairro);
        city.value=(content.localidade);
        state.value=(content.uf);
    }
};

function searchPostalCode(value) {

    let postalCode = value.replace(/\D/g, '');
    
    if (postalCode !== null && postalCode !== "" ) {
        let validatePostalCode = /^[0-9]{8}$/;
        
        if(validatePostalCode.test(postalCode)) {
            let script = document.createElement('script');
            script.src = 'https://viacep.com.br/ws/'+ postalCode + '/json/?callback=callback';
            document.body.appendChild(script);            
        }
        else {
            clearPostalCodeForm();
            alert("CEP Inválido!");
        }
    }
    else {
        clearPostalCodeForm();
        alert("CEP Inválido!");
    }
};

function verifyClearFields(event) {
    
    const elements = document.querySelectorAll('input');
    let haveEmptyFields = false;
    
    elements.forEach((element) => {
        if( element.value === "") {
            haveEmptyFields = true;
        }
    });
    
    if(haveEmptyFields) {
        event.preventDefault();
        alert("Todos campos devem ser preenchidos corretamente!")
    }
};

function verifyConfirmFields(str, confirmStr, errorElementId) {
    const errorSpan = document.getElementById(errorElementId);
    
    if( str !== null && confirmStr !== null ) {
        if( str === confirmStr ) {
            errorSpan.style.opacity = '1';
        }

        if( str !== confirmStr ) {
            errorSpan.style.opacity = '0';
        }
    }
    else
    {
        errorSpan.style.opacity = '0';
    }
};

register.addEventListener('click', verifyClearFields);

emailConfirm.onkeydown = () => {
    verifyConfirmFields(email.value, emailConfirm.value, 'email_error_span');
};

email.onkeydown = () => {
    verifyConfirmFields(email.value, emailConfirm.value, 'email_error_span');
};

passwordConfirm.onkeydown = () => {
    verifyConfirmFields(password.value, passwordConfirm.value, 'password_error_span');
};

password.onkeydown = () => {
    verifyConfirmFields(password.value, passwordConfirm.value, 'password_error_span');
};