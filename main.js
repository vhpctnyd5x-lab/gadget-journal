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

  const yearEl = document.getElementById('site-year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
});
