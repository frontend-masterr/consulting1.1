
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const formData = new FormData(form);
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        window.location.href = "http://localhost:5000/login/login.html";
      } else {
        alert(data.error || 'خطا در ثبت‌نام');
      }
    } catch (err) {
      console.error(err);
      alert('ارتباط با سرور برقرار نشد');
    }
  });
});
