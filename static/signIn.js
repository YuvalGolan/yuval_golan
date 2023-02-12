//to get the modal
const modal = document.getElementById('id01');
const userNameInput = document.getElementById('userNameInput');
const passwordInput = document.getElementById('passwordInput');
const BASE_URL = 'http://localhost:8080';

if (!window.sessionStorage.getItem("userName")) {
  modal.style.display = 'block';
} else {
  modal.style.display = 'none';
}

const onLogin = async () => {
  console.log("HEREEEE");
  const requestBody = {
    UserAddress: userNameInput.value,
    UserPassword: passwordInput.value
  }
  console.log({requestBody});

  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

  } catch(err) {
    console.log(err)
    alert(err.mesasge);
    return;
  }

  
  window.sessionStorage.setItem("userName", requestBody.UserAddress);

  userNameInput.value = '';
  passwordInput.value = '';
};

const signIn = async () => {
  const requestBody = {
    UserAddress: userNameInput.value,
    UserPassword: passwordInput.value
  }

  try {
    const response = await fetch(`${BASE_URL}/signIn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

  } catch(err) {
    alert(err.mesasge);
    return;
  }

  userNameInput.value = '';
  passwordInput.value = '';
  alert("נרשמת בהצלחה לאתר");
};

document.getElementById('login').addEventListener('click', () => {
  onLogin();
});
document.getElementById('signIn').addEventListener('click', () => {
  signIn();
});
