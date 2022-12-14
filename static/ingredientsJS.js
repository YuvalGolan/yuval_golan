const allIngredients = [
    {
        name: "פירות וירקות",
        ingredients: ["תותים", "תפוחים", "תפוזים", "עגבניות", "מלפפונים", "בצל"],
    },
    {
        name: "חלבי",
        ingredients: ["חלב", "גבינה צהובה", "גבינה", "קוטג"],
    },
    {
        name: "יבשים",
        ingredients: ["פסטה", "לחם", "ביצים"],
    }
];

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

const createIngredient = (name) => {
    const checkMark = createElement("span", [], ["checkmark"]);
    const checkbox = createElement("input", [], [], {type: "checkbox"});
    const label = createElement('label')
    label.textContent = name;
    const ingredient = createElement("label", [label, checkbox, checkMark], ["ingredients"])
    return ingredient;
};

const createIngredientsSection = (obj) => {
    const ingredientsElements = [];
    for (let item of obj.ingredients) {
        ingredientsElements.push(createIngredient(item));
    };
    const name = createElement("h3", [], ["inTitle"]);
    name.textContent = obj.name;
    const ingredientsInnerSection = createElement("div", [...ingredientsElements], ["inInnerSection"]); 
    const section = createElement("div", [name, ingredientsInnerSection], ["inSection"]);
    return section;
};

const createIngredientsPage = (ingredientsArray) => {
    for (let section of ingredientsArray) {
        document.querySelector(".ingredientsContainer").append(createIngredientsSection(section));
    }
};

createIngredientsPage(allIngredients);