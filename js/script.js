const name = document.querySelector('[data-user="name"]');

const email = document.querySelector('[data-user="email"]');
const emailConfirm = document.querySelector('[data-user="emailConfirm]');

const password = document.querySelector('[data-user="password"]');
const passwordConfirm = document.querySelector('[data-user="passwordConfirm"]');

const postalCode = document.querySelector('[data-address="cep"]');
const street = document.querySelector('[data-address="address"]');
const hood = document.querySelector('[data-address="hood"]');
const city = document.querySelector('[data-address="city"]');
const state = document.querySelector('[data-address="state"]');
const number = document.querySelector('[data-address="number"]');

function verifyClearFields(event) {
    event.preventDefault();

    const elements = document.querySelectorAll('input');
    let haveEmptyFields = false;

    elements.forEach((element) => {
        if( element.value === "") {
            haveEmptyFields = true;
        }
    });

    haveEmptyFields ? alert("Todos campos devem ser preenchidos!") : null;
}

function clearPostalCodeForm() {
    postalCode.value=("");
    street.value=("");
    hood.value=("");
    city.value=("");
    state.value=("");
}

function callback(conteudo) {
    if (!("erro" in conteudo)) {
        street.value=(conteudo.logradouro);
        hood.value=(conteudo.bairro);
        city.value=(conteudo.localidade);
        state.value=(conteudo.uf);
    }
    
}

function searchPostalCode(value) {
    let postalCode = value.replace(/\D/g, '');

    if (postalCode != null && postalCode != "" ) {
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
        console.log("else")
        clearPostalCodeForm();
        alert("CEP Inválido!");
    }
};

const register = document.getElementById('register');

register.addEventListener('click', verifyClearFields);