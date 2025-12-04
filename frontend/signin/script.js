const form = document.querySelector("form");
const nameInput = document.querySelector(".name");
const passwordInput = document.querySelector(".number");
const emailInput = document.querySelector(".email");
const ibanInput = document.querySelector(".password");
const fileInput = document.querySelector(".cPassword");
const radioInputs = document.querySelectorAll(".input-radio");

// اعتبارسنجی نام
const validateName = () => {
  const nameError = document.querySelector(".name-error");
  if (nameInput.value.length < 8) {
    nameError.style.display = "block";
    return false;
  } else {
    nameError.style.display = "none";
    return true;
  }
};

// اعتبارسنجی رمز عبور
const validatePassword = () => {
  const passwordError = document.querySelector(".name-error");
  if (passwordInput.value.length < 6) {
    passwordError.style.display = "block";
    return false;
  } else {
    passwordError.style.display = "none";
    return true;
  }
};

// اعتبارسنجی ایمیل
const validateEmail = () => {
  const emailError = document.querySelector(".email-error");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value)) {
    emailError.style.display = "block";
    return false;
  } else {
    emailError.style.display = "none";
    return true;
  }
};

// اعتبارسنجی شماره شبا
const validateIban = () => {
  const ibanError = document.querySelector(".password-error");
  const ibanRegex = /^IR\d{24}$/; // فرمت شماره شبا ایران
  if (!ibanRegex.test(ibanInput.value)) {
    ibanError.style.display = "block";
    return false;
  } else {
    ibanError.style.display = "none";
    return true;
  }
};

// اعتبارسنجی بارگذاری فایل
const validateFile = () => {
  const fileError = document.querySelector(".cPassword-error");
  if (!fileInput.files.length) {
    fileError.style.display = "block";
    return false;
  } else {
    fileError.style.display = "none";
    return true;
  }
};

// اعتبارسنجی انتخاب یکی از گزینه‌های رادیویی
const validateRadio = () => {
  const selectedRadio = Array.from(radioInputs).some((input) => input.checked);
  if (!selectedRadio) {
    alert("لطفاً یک گزینه را انتخاب کنید!");
    return false;
  }
  return true;
};

// بررسی همه فیلدها هنگام ارسال فرم
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const isNameValid = validateName();
  const isPasswordValid = validatePassword();
  const isEmailValid = validateEmail();
  const isIbanValid = validateIban();
  const isFileValid = validateFile();
  const isRadioValid = validateRadio();

  if (isNameValid && isPasswordValid && isEmailValid && isIbanValid && isFileValid && isRadioValid) {
    alert("فرم با موفقیت ارسال شد!");
    form.reset();
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.querySelector(".cPassword");
  const fileFieldContainer = document.querySelector(".confirm-password");

  fileInput.addEventListener("click", () => {
    // چک کنید اگر پیام قبلاً اضافه نشده باشد
    if (!document.querySelector(".file-message")) {
      const message = document.createElement("p");
      message.textContent = "لطفا عکس کد ملی خود را بارگذاری کنید";
      message.classList.add("file-message");
      message.style.color = "white";
      message.style.marginTop = "10px";
      fileFieldContainer.appendChild(message);

      // پیام بعد از چند ثانیه محو شود
      setTimeout(() => {
        message.remove();
      }, 4000); // ۴ ثانیه
    }
  });
});
