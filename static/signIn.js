//to get the modal
const modal = document.getElementById('id01');
const userNameInput = document.getElementById('userNameInput');
const passwordInput = document.getElementById('passwordInput');
const BASE_URL = 'http://localhost:3000';

console.log(window.sessionStorage.getItem("userName"));
if (!window.sessionStorage.getItem("userName")) {
  modal.style.display = 'block';
} else {
  modal.style.display = 'none';
}

const onLogin = async () => {
  const requestBody = {
    UserAddress: userNameInput.value,
    UserPassword: passwordInput.value
  }
  const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (response?.status === 200) {
      window.sessionStorage.setItem("userName", requestBody.UserAddress);

      userNameInput.value = '';
      passwordInput.value = '';

    } else {
      const data = await response.json();
      alert(data?.message);
    }
}

const signIn = async () => {
  const requestBody = {
    UserAddress: userNameInput.value,
    UserPassword: passwordInput.value
  }

  // try{
    const response = await fetch(`${BASE_URL}/signIn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      if(response?.status === 200) {
        userNameInput.value = '';
        passwordInput.value = '';
        alert("נרשמת בהצלחה לאתר, עכשיו תתחבר");
      } else {
        const data = await response.json();
        alert(data?.message);
      }
  }
 

document.getElementById('login').addEventListener('click', () => {
  onLogin();
});
document.getElementById('signIn').addEventListener('click', () => {
  signIn();
});
