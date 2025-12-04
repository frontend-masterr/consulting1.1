document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const uploadInput = document.getElementById('profileUpload');
  const profileImg  = document.getElementById('profileImage');
  const userName    = document.getElementById('userName');
  const userEmail   = document.getElementById('userEmail');
  const fullNameBtn = document.querySelector('.full_name_user');
  const menuList    = document.querySelector('.list_account_user');

  // گرفتن اطلاعات کاربر از سرور
  async function fetchUserInfo() {
    try {
      const res = await fetch('/api/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const user = await res.json();

      userName.textContent = user.name || 'بدون نام';
      userEmail.textContent = user.email || 'بدون ایمیل';
      if (user.photoUrl) {
        profileImg.src = user.photoUrl;
      }
    } catch (err) {
      console.error('خطا در دریافت اطلاعات کاربر:', err);
    }
  }

  // ارسال عکس به سرور
  async function uploadProfile(file) {
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const res = await fetch('/api/user/upload-profile', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();
      if (data.avatar) {
        console.log('عکس ذخیره شد:', data.avatar);
        profileImg.src = data.avatar;
      } else {
        console.warn('مشکلی در ذخیره عکس رخ داد');
      }
    } catch (err) {
      console.error('خطا در آپلود عکس:', err);
    }
  }

  // وقتی کاربر عکسی انتخاب می‌کنه
  uploadInput.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;

    // پیش‌نمایش فوری
    const reader = new FileReader();
    reader.onload = () => {
      profileImg.src = reader.result;
    };
    reader.readAsDataURL(file);

    // ارسال به سرور
    uploadProfile(file);
  });

  // باز و بسته کردن منوی کاربر
  fullNameBtn?.addEventListener('click', () => {
    menuList?.classList.toggle('active_account');
  });

  // شروع اولیه
  fetchUserInfo();
});
