document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const body = {
      email: form.querySelector('.email').value.trim(),
      password: form.querySelector('.password').value.trim()
    };

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (res.ok) {

        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('userId', data.user._id);


        // فقط اگر مشاور بود، آیدی ذخیره کن
        if (data.role === 'مشاور') {
          localStorage.setItem('consultantId', data.user._id);
        }

        // هدایت
        if (data.role === 'کاربر') {
          window.location.href = '/user.html';
        } else {
          window.location.href = '/consultant.html';
        }

      } else {
        alert(data.error || 'ورود ناموفق');
      }

    } catch (err) {
      console.error(err);
      alert('ارتباط با سرور برقرار نشد');
    }
  });
});
