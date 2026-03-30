document.addEventListener('DOMContentLoaded', async () => {
  async function inject(targetId, file) {
    const slot = document.getElementById(targetId);
    if (!slot) return;
    try {
      const res = await fetch(file, { cache: 'force-cache' });
      if (!res.ok) throw new Error(`${file} load failed`);
      slot.innerHTML = await res.text();
    } catch (err) {
      console.error(err);
    }
  }

  await Promise.all([
    inject('header-placeholder', 'header.html'),
    inject('footer-placeholder', 'footer.html')
  ]);

  const articles = [
    { title: 'MacBook Air', url: 'review.html' },
    { title: 'MacBook Pro', url: 'macbook-pro.html' },
    { title: 'iPad Pro', url: 'ipad.html' },
    { title: 'iPhone 17e', url: 'iphone.html' },
    { title: 'Apple Watch', url: 'apple-watch.html' },
    { title: 'AirPods', url: 'airpods.html' },
    { title: 'HomePod 3', url: 'homepod.html' },
    { title: 'Japan Chart', url: 'music-trend.html' }
  ];
  const input = document.getElementById('site-search-input');
  const list = document.getElementById('site-search-results');
  if (input && list) {
    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if (!q) {
        list.style.display = 'none';
        list.innerHTML = '';
        return;
      }
      const hits = articles.filter(a => a.title.toLowerCase().includes(q)).slice(0, 6);
      list.innerHTML = hits.map(h => `<li><a href=\"${h.url}\">${h.title}</a></li>`).join('');
      list.style.display = hits.length ? 'block' : 'none';
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.site-search')) {
        list.style.display = 'none';
      }
    });
  }

  const topBtn = document.createElement('button');
  topBtn.id = 'scrollTopBtn';
  topBtn.type = 'button';
  topBtn.textContent = '↑';
  document.body.appendChild(topBtn);
  window.addEventListener('scroll', () => {
    topBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
