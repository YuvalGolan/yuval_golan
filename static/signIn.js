//to get the modal
const modal = document.getElementById('id01');

let userName = "";
let password = "";

if (!userName || !password) {
    modal.style.display = "block";
} else {
    modal.style.display = "none";
}

const onLogin = () => {
    const userNameInput = document.getElementById("userNameInput");
    userName = userNameInput.value;
    const passwordInput = document.getElementById("passwordInput");
    password = passwordInput.value;

    if(!userNameInput.value || !passwordInput.value) {
        alert("חסר שם משתמש או סיסמה");
        return;
    }
    userNameInput.value = "";
    passwordInput.value = "";

    modal.style.display = "none";
};

document.getElementById("login").addEventListener("click", onLogin);


/**
 * Creates a new DOM element.
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 * @param {Object} eventListeners - the event listeners on the element
 */
function createElement(tagName, children = [], classes = [], attributes = {}, eventListeners = {}) {
    let newElement = document.createElement(tagName);
    //children
    for (let child of children){
        newElement.append(child);
    }
    //classes
    for (let clas of classes){
        newElement.classList.add(clas);
    }
    //attributes
    const attributesKeys = Object.keys(attributes);
    const attributesValues =Object.values(attributes);
    for (let i = 0; i < attributesKeys.length; i++){
        newElement.setAttribute(attributesKeys[i],attributesValues[i]);
    }
    //eventListeners
    const eventListenersKeys = Object.keys(eventListeners);
    const eventListenersValues =Object.values(eventListeners);
    for (let i = 0; i < eventListenersKeys.length; i++){
        newElement.addEventListener(eventListenersKeys[i],eventListenersValues[i]);
    }
    return newElement;
};


const addIng = () => {
    const inputContainer = document.getElementById("addIng");
    const currentIndex = inputContainer.childNodes?.length + 1; 
    const newInput = createElement("input", [], [], {
        id: `ing${currentIndex}`,
        type: "text",
        placeholder: `מצרך מספר ${currentIndex}`,
        name: `ing${currentIndex}`,
        required: true
      });
  
    inputContainer.appendChild(newInput);
 };
  
document.getElementById("addIngBTN").addEventListener("click", addIng);

const onRecipeSubmit = () => {
    const recipeNameElem = document.getElementById("nameInput");
    const recipeName = recipeNameElem.value;
  
    const makingElem = document.getElementById("makingInput");
    const makingText = makingElem.value;
  
    const imgElem = document.getElementById("imgInput");
    const imgText = imgElem.value;
  
    const inputsContainer = document.getElementById("addIng");
    const ingArray = [];
    // Loop over every input of ingredient
    for(let ingInput of inputsContainer.childNodes) {
      ingArray.push(ingInput.value);
      if(ingInput.id !== "ing1") {
        inputsContainer.removeChild(ingInput);
      } else {
        ingInput.value = "";
      }
    }
  
    // Clean all fields
    recipeNameElem.value = "";
    makingElem.value = "";
    imgElem.value = "";
  
  
    alert(`המתכון ${recipeName} נוסף בהצלחה`);
  
    // For future DB use
    return {
      name: recipeName,
      ingredients: ingArray,
      making: makingText,
      imgLink: imgText
    }
  };
  
  document.getElementById("submit").addEventListener("click", onRecipeSubmit);
  