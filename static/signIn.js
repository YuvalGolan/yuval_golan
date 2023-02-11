//to get the modal
const modal = document.getElementById('id01');

let userName = '';
let password = '';

if (!userName || !password) {
  modal.style.display = 'block';
} else {
  modal.style.display = 'none';
}

const onLogin = () => {
  const userNameInput = document.getElementById('userNameInput');
  userName = userNameInput.value;
  const passwordInput = document.getElementById('passwordInput');
  password = passwordInput.value;

  if (!userNameInput.value || !passwordInput.value) {
    alert('חסר שם משתמש או סיסמה');
    return;
  }
  userNameInput.value = '';
  passwordInput.value = '';

  modal.style.display = 'none';
};

document.getElementById('login').addEventListener('click', onLogin);
