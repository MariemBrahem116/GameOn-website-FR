function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements

  const modalBtn = document.querySelectorAll(".modal-btn");
  const modalClose = document.querySelectorAll(".close-btn");
  
  const myTopnav = document.getElementById("myTopnav");
  const modalbg = document.querySelector(".bground");
  const formData = document.querySelector("formData");
  const confirmMessage = document.querySelector(".confirm-message");
  const form = document.querySelector(".register");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  confirmMessage.style.display = "none";
}
//fermer le Formulaire
document.getElementById("closeForm").addEventListener("click" , function(){
  modalbg.style.display = "none";
  form.style.display = "block";
})
document.getElementById("closeButton").addEventListener("click",function(){
  modalbg.style.display = "none";
  form.style.display = "block";
})
//Accéder à toutes les entrées et paramétrer la validation
const inputs = {
  firstname: {
      element: document.querySelector("#first"),
      regex : /^[a-zA-Z\-éëàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇÆæœ]{2,}$/
  }, 
  lastname: {
      element: document.querySelector("#last"),
      regex : /^[a-zA-Z\-éëàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇÆæœ\s]{2,}$/,
  },
  email: {
      element: document.querySelector("#email"),
      regex : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  birthdate: {
      element: document.querySelector('#birthdate'),
      regex : /^([123]0|[012][1-9]|31)\/(0[1-9]|1[012])\/(19[0-9]{2}|2[0-9]{3})$/
  }, 
  contest: {
      element: document.querySelector("#quantity"),
      regex : /^\d$/
  },
  location: {
      element: document.querySelectorAll("input[name='location']"),
      icons: document.querySelectorAll(".checkbox-label .checkbox-icon")
  },
  checkbox: {
      element: document.querySelector('#checkbox1'), 
  }
};

// pour atteindre tous les éléments qui affichent des messages d'erreur pour la validation du formulaire
const containerInput = document.querySelectorAll(".formData");

 class validate {
    
  constructor(inputs, containerInput) {
      this.inputs = inputs;
      this.containerInput = containerInput;
  }
  valid = true;

  // Les méthodes de validation

      //vérifier si le nom et le prénom ne sont pas vide et ils comportent  au minimum 2 lettres 
      nameValidation = (element, regex) => element.value == "" || element.value.length < 2 || !regex.test(element.value) ? false : true;

      // vérifier si le mail est valide
      emailValidation = (element, regex) => !regex.test(element.value) ? false : true;

      // vérifier si la date de naissance est correcte et qu'elle n'est pa vide
      birthdateValidation = (element, regex) =>  element.value == "" || regex.test(element.value)  ? false : true;

      // vérifier si le nombre de tournoi est un nombre et qu'il n'est pas vide
      contestValidation = (element, regex) => !regex.test(element.value) || element.value == "" ? false : true;

      //pour vérifier si un emplacement est sélectionné
      locationValidation = (elements) => {
          for (let element of elements) if (element.checked) return true;
      };

      // vérifier si la case des conditions générales est cochée
      checkboxValidation = (element) => element.checked;

  //supprimer les messages d'erreur
  removeErrorMessage = () => {
      this.valid = true;
      Array.from(this.containerInput).map((field) => {
          field.removeAttribute("data-error-visible");
      });
  };

  launchValidation = () => {

      this.removeErrorMessage();
      
      for (const input in this.inputs) {
          switch (input) {
              case "firstname":
                  if (!this.nameValidation(this.inputs[input].element, this.inputs[input].regex)) {
                      console.log(this.inputs[input].regex)
                      this.inputs[input].element.parentNode.setAttribute("data-error-visible", true);
                      this.valid = false;
                  }
                  break;

              case "lastname":
                  if (!this.nameValidation(this.inputs[input].element, this.inputs[input].regex)) {
                      this.inputs[input].element.parentNode.setAttribute("data-error-visible", true);
                      this.valid = false;
                  }
                  break;

              case "email":
                  if (!this.emailValidation(this.inputs[input].element, this.inputs[input].regex)) {
                      this.inputs[input].element.parentNode.setAttribute("data-error-visible", true);
                      this.valid = false;
                  }
                  break;

              case "birthdate":
                  if (!this.birthdateValidation(this.inputs[input].element, this.inputs[input].regex)) {
                      this.inputs[input].element.parentNode.setAttribute("data-error-visible", true);
                      this.valid = false;
                  }
                  break;

              case "contest":
                  if (!this.contestValidation(this.inputs[input].element, this.inputs[input].regex)) {
                      this.inputs[input].element.parentNode.setAttribute("data-error-visible", true);
                      this.valid = false;
                  }
                  break;

              case "location":
                  if (!this.locationValidation(this.inputs[input].element)) {
                      this.inputs[input].element[0].parentNode.setAttribute("data-error-visible", true);
                      this.valid = false;
                  }
                  break;

              case "checkbox":
                  if (!this.checkboxValidation(this.inputs[input].element)) {
                      this.inputs[input].element.parentNode.setAttribute("data-error-visible", true);
                      this.valid = false;
                  }
                  break;

              default : 
                  break;
          }
      }
      return this.valid;
  }
}


// Valider le formulaire
const validator = new validate(inputs, containerInput);

form.onsubmit = (e) => {
    e.preventDefault();
    if (validator.launchValidation()) {
        form.reset();
        form.style.display ="none";
        confirmMessage.style.display ="flex";

    }
}




