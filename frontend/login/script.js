const form = document.querySelector("form"),
  nameField = form.querySelector(".name-field"),
  nameInput = nameField.querySelector(".name"),
  usernameField = form.querySelector(".username-field"),
  usernameInput = usernameField.querySelector(".username"),
  emailField = form.querySelector(".email-field"),
  emailInput = emailField.querySelector(".email"),
  passField = form.querySelector(".create-password"),
  passInput = passField.querySelector(".password"),
  cPassField = form.querySelector(".confirm-password"),
  cPassInput = cPassField.querySelector(".cPassword");

function checkEmail() {
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailInput.value.match(emailPattern)) {
      return emailField.classList.add("invalid");
    }
    emailField.classList.remove("invalid");
  }

function createPass() {
    const passPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passInput.value.match(passPattern)) {
      return passField.classList.add("invalid");
    }
    passField.classList.remove("invalid");
  }

  function confirmPass() {
    if (passInput.value !== cPassInput.value || cPassInput.value === "") {
      return cPassField.classList.add("invalid");
    }
    cPassField.classList.remove("invalid");
  }
  
  // رویداد ارسال فرم
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkName();
    checkUsername();
    checkEmail();
    createPass();
    confirmPass();
  
    if (
      !nameField.classList.contains("invalid") &&
      !usernameField.classList.contains("invalid") &&
      !emailField.classList.contains("invalid") &&
      !passField.classList.contains("invalid") &&
      !cPassField.classList.contains("invalid")
    ) {
      alert("ثبت نام با موفقیت انجام شد!");
      form.reset();
    }
  });
  
  // رویداد هنگام وارد کردن اطلاعات
  nameInput.addEventListener("keyup", checkName);
  usernameInput.addEventListener("keyup", checkUsername);
  emailInput.addEventListener("keyup", checkEmail);
  passInput.addEventListener("keyup", createPass);
  cPassInput.addEventListener("keyup", confirmPass);
  