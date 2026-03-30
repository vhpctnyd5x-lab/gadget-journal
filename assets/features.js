/**
 * Gadget Journal - 10 New Features
 */

document.addEventListener('DOMContentLoaded', () => {
  // 2. 自動生成される「追従型 目次（TOC）」
  const tocContainer = document.getElementById('table-of-contents');
  if (tocContainer) {
    const headings = document.querySelectorAll('article h2, article h3');
    if (headings.length > 0) {
      const tocList = document.createElement('ul');
      tocList.style.listStyle = 'none';
      tocList.style.padding = '0';
      
      headings.forEach((heading, index) => {
        const id = `heading-${index}`;
        heading.id = id;
        
        const li = document.createElement('li');
        li.style.marginBottom = '8px';
        
        const link = document.createElement('a');
        link.href = `#${id}`;
        link.textContent = heading.textContent;
        link.style.fontSize = '13px';
        link.style.color = '#86868b';
        link.style.textDecoration = 'none';
        link.style.transition = 'color 0.2s';
        if (heading.tagName === 'H3') {
          link.style.paddingLeft = '15px';
          link.style.fontSize = '12px';
        }
        
        link.addEventListener('mouseover', () => link.style.color = '#0071e3');
        link.addEventListener('mouseout', () => link.style.color = '#86868b');
        
        li.appendChild(link);
        tocList.appendChild(li);
      });
      tocContainer.appendChild(tocList);
    }
  }

  // 3. 「あとで読む（ブックマーク）」機能
  const bookmarkBtn = document.getElementById('bookmarkBtn');
  if (bookmarkBtn) {
    bookmarkBtn.addEventListener('click', () => {
      let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
      const articleInfo = { title: document.title, url: window.location.href };
      
      // 重複チェック
      if (!bookmarks.some(b => b.url === articleInfo.url)) {
        bookmarks.push(articleInfo);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        bookmarkBtn.textContent = '✅ 保存しました';
        setTimeout(() => {
          bookmarkBtn.textContent = '🔖 この記事を保存';
        }, 2000);
      } else {
        bookmarkBtn.textContent = '✅ 保存済みです';
      }
    });
  }

  // 6. テキスト選択で「X(Twitter)にシェア」ポップアップ
  document.addEventListener('mouseup', (e) => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 5) {
      // 既存のシェアボタンがあれば削除
      const existingBtn = document.getElementById('text-share-btn');
      if (existingBtn) existingBtn.remove();

      const btn = document.createElement('button');
      btn.id = 'text-share-btn';
      btn.innerHTML = '𝕏 Share';
      btn.style.position = 'absolute';
      btn.style.left = `${e.pageX}px`;
      btn.style.top = `${e.pageY - 40}px`;
      btn.style.background = '#000';
      btn.style.color = '#fff';
      btn.style.border = 'none';
      btn.style.borderRadius = '20px';
      btn.style.padding = '5px 12px';
      btn.style.fontSize = '12px';
      btn.style.cursor = 'pointer';
      btn.style.zIndex = '10000';
      btn.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';

      btn.onclick = () => {
        const tweetUrl = `https://twitter.com/intent/tweet?text="${encodeURIComponent(selectedText)}" - Gadget Journal&url=${encodeURIComponent(window.location.href)}`;
        window.open(tweetUrl, '_blank');
        btn.remove();
      };

      document.body.appendChild(btn);
    } else {
      const existingBtn = document.getElementById('text-share-btn');
      if (existingBtn) {
        // 少し遅延させてクリックイベントが間に合うようにする
        setTimeout(() => existingBtn.remove(), 100);
      }
    }
  });

  // 9. 読者の熱量を測る「拍手（Like）」ボタン
  const clapBtn = document.getElementById('clapBtn');
  const clapCount = document.getElementById('clapCount');
  if (clapBtn && clapCount) {
    let claps = parseInt(localStorage.getItem('claps_' + window.location.pathname)) || 0;
    clapCount.innerText = claps;

    clapBtn.addEventListener('click', function() {
      claps++;
      clapCount.innerText = claps;
      localStorage.setItem('claps_' + window.location.pathname, claps);
      
      this.style.transform = 'scale(1.2)';
      setTimeout(() => this.style.transform = 'scale(1)', 100);
      
      // パーティクル的な演出（簡易）
      const particle = document.createElement('span');
      particle.innerText = '👏';
      particle.style.position = 'absolute';
      particle.style.left = '50%';
      particle.style.top = '0';
      particle.style.pointerEvents = 'none';
      particle.style.transition = 'all 0.6s ease-out';
      clapBtn.style.position = 'relative';
      clapBtn.appendChild(particle);
      
      setTimeout(() => {
        particle.style.transform = 'translateY(-40px) scale(1.5)';
        particle.style.opacity = '0';
      }, 10);
      setTimeout(() => particle.remove(), 600);
    });
  }

  // 10. コアファン向けの「隠しコマンド（イースターエッグ）」
  let konami = '';
  document.addEventListener('keydown', (e) => {
    konami += e.key.toLowerCase();
    if (konami.length > 10) konami = konami.substring(1);
    
    if (konami.includes('mac')) {
      alert('Hello, 1984. (クラシックMacモードを起動します...)');
      document.body.style.filter = 'grayscale(100%) contrast(150%)';
      document.body.style.backgroundColor = '#fff';
      konami = ''; // リセット
    }
  });
});

// 5. 製品の「カラーバリエーション」切り替え用グローバル関数
window.changeColor = function(imageSrc) {
  const img = document.getElementById('product-img');
  if (img) {
    img.style.opacity = 0;
    setTimeout(() => {
      img.src = imageSrc;
      img.style.opacity = 1;
    }, 200);
  }
};
