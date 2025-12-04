document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const loggedInId = localStorage.getItem("userId");

  if (!token || !loggedInId) {
    alert("لطفاً وارد شوید");
    return;
  }

  // گرفتن آیدی از URL یا userId
  const params = new URLSearchParams(window.location.search);
  let consultantId = params.get("id") || loggedInId;

  // DOMs
  const profileImg     = document.getElementById("profileImage");
  const nameSpan       = document.getElementById("userName");
  const emailSpan      = document.getElementById("userEmail");
  const aboutInput     = document.getElementById("aboutText");
  const educationInput = document.getElementById("educationText");
  const resumeInput    = document.getElementById("resumeUpload");
  const resumeLink     = document.getElementById("resumeLink");
  const resumePreview  = document.getElementById("resumePreview");
  const uploadInput    = document.getElementById("profileUpload");
  const saveBtn        = document.getElementById("saveProfile");

  // ==== 1) گرفتن اطلاعات مشاور ====
  fetch(`/api/user/consultant/${consultantId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => {
      if (!data.consultant) return alert("مشاور یافت نشد");

      const user = data.consultant;

      nameSpan.textContent  = user.name;
      emailSpan.textContent = user.email;
      profileImg.src        = user.avatar || "/default-avatar.png";
      aboutInput.value      = user.aboutYourself || "";
      educationInput.value  = user.aboutEducation || "";

      if (user.resumeFile) {
        resumeLink.href = user.resumeFile;
        resumeLink.style.display = "inline-block";
      }

      // اگر خود کاربر لاگین شده اجازه ویرایش بده
      if (user._id !== loggedInId) {
        uploadInput.disabled = true;
        resumeInput.disabled = true;
        aboutInput.readOnly = true;
        educationInput.readOnly = true;
        saveBtn.style.display = "none";
      }
    });

  // ==== 2) پیش‌نمایش رزومه ====
  resumeInput.addEventListener("change", e => {
    const file = e.target.files[0];
    resumePreview.innerHTML = "";
    if (!file) return;

    const ext = file.name.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png"].includes(ext)) {
      const reader = new FileReader();
      reader.onload = ev =>
        resumePreview.innerHTML = `<img src="${ev.target.result}" style="max-width:150px;margin-top:8px">`;
      reader.readAsDataURL(file);
    } else {
      resumePreview.textContent = `📄 ${file.name}`;
    }
  });

  // ==== 3) آپلود عکس پروفایل ====
  uploadInput.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = ev => profileImg.src = ev.target.result;
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("avatar", file);

    fetch("/api/user/upload-profile", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });
  });

  // ==== 4) ذخیره اطلاعات ====
  saveBtn.addEventListener("click", () => {
    const formData = new FormData();
    formData.append("aboutYourself", aboutInput.value);
    formData.append("aboutEducation", educationInput.value);

    if (resumeInput.files[0]) {
      formData.append("resume", resumeInput.files[0]);
    }

    fetch("/api/user/consultant", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) alert("ذخیره شد");
      });
  });

});
