document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('#searchInput');
  const searchBtn = document.querySelector('#searchBtn');
  const searchResults = document.getElementById('searchResults');

  if (!searchInput || !searchBtn || !searchResults) {
    console.warn('❗ عناصر جستجو پیدا نشدند.');
    return;
  }

  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (!query) {
      searchResults.innerHTML = '<p>لطفاً عبارتی وارد کنید.</p>';
      return;
    }

    // جستجوی مشاور از API
    fetch(`/api/search/consultants?q=${encodeURIComponent(query)}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        searchResults.innerHTML = '';
        if (!data.results || data.results.length === 0) {
          searchResults.innerHTML = '<p>مشاوری یافت نشد.</p>';
          return;
        }

        // نمایش مشاوران
        data.results.forEach(c => {
          const card = document.createElement('div');
          card.className = 'consultant_card';
          card.innerHTML = `
            <img src="${c.avatar || '/default-avatar.png'}" alt="مشاور" width="60" height="60" style="border-radius: 50%;">
            <h4 style="color:#fff;">${c.name}</h4>
            <p></p>
            
              <a href="/consultant-preview.html?id=${c._id}" style="color:#fff;">مشاهده پروفایل</a>
          `;
          searchResults.appendChild(card);
        });
      })
      .catch(err => {
        console.error('❌ خطا در جستجو:', err);
        searchResults.innerHTML = '<p>خطا در دریافت اطلاعات</p>';
      });
  });
});

