import { createElement } from './domOperations.js';
const BASE_URL = 'http://localhost:3000';

const addIng = () => {
  const inputContainer = document.getElementById('addIng');
  const currentIndex = inputContainer.children?.length + 1;
  const newInput = createElement('input', [], [], {
    id: `ing${currentIndex}`,
    type: 'text',
    placeholder: `מצרך מספר ${currentIndex}`,
    name: `ing${currentIndex}`,
  });

  inputContainer.appendChild(newInput);
};

document.getElementById('addIngBTN').addEventListener('click', addIng);

const onRecipeSubmit = async () => {
  const recipeNameElem = document.getElementById('nameInput');
  const recipeName = recipeNameElem.value;

  const makingElem = document.getElementById('makingInput');
  const makingText = makingElem.value;

  const imgElem = document.getElementById('imgInput');
  const imgText = imgElem.value;

  const inputsContainer = document.getElementById('addIng');
  const ingArray = [];
  // Loop over every input of ingredient
  for (let ingInput of inputsContainer.children) {
    ingArray.push(ingInput.value);
  }

  const recipeType = document.querySelector('input[name="type"]:checked').value || 'Breakfast';

  const recipe = {
    recipeName: recipeName,
    ingridents: ingArray?.filter(Boolean)?.join(', '),
    instructions: makingText,
    dishImg: imgText,
    recipeType,
  };

  try {
    const response = await fetch(`${BASE_URL}/addRecipe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipe }),
    });

    // Clean all fields
    recipeNameElem.value = '';
    makingElem.value = '';
    imgElem.value = '';

    // Loop over every input of ingredient
    for (let ingInput of inputsContainer.children) {
      ingArray.push(ingInput.value);
      if (ingInput.id !== 'ing1') {
        inputsContainer.removeChild(ingInput);
      } else {
        ingInput.value = '';
      }
    }

    document.location = `/${recipeName}`;
  } catch (error) {
    console.log(error);
  }
};

document.getElementById('submit').addEventListener('click', onRecipeSubmit);
