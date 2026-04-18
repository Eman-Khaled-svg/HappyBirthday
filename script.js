 // ===== TABS =====
  function switchTab(name, btn) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + name).classList.add('active');
    btn.classList.add('active');
  }
 
  // ===== PHOTOS =====
  // ضيف مسارات الصور هنا
  const photoSrcs = [
    "img/img1.jpg",
    "img/img2.jpg",
    "img/img3.jpg",
    "img/img4.jpg",
    "img/img5.jpg",
  ];
 
  const grid = document.getElementById('photosGrid');
 
  photoSrcs.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = "Memory";
    img.onerror = () => img.style.display = 'none'; // لو الصورة مش موجودة تتخفى
    img.onclick = () => openLightbox(src);
    grid.appendChild(img);
  });
 
  function openLightbox(src) {
    const overlay = document.createElement('div');
    overlay.className = 'img-overlay';
 
    const closeBtn = document.createElement('button');
    closeBtn.className = 'overlay-close';
    closeBtn.innerHTML = '×';
    closeBtn.onclick = () => overlay.remove();
 
    const bigImg = document.createElement('img');
    bigImg.src = src;
 
    overlay.appendChild(closeBtn);
    overlay.appendChild(bigImg);
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    document.body.appendChild(overlay);
  }
 
  // ===== MESSAGES FORM =====
  function sendMessage() {
    const name = document.getElementById('senderName').value.trim();
    const text = document.getElementById('msgText').value.trim();
    if (!name || !text) {
      alert('Please write your name and message 🌸');
      return;
    }
    const list = document.getElementById('messagesList');
    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-EG', { year:'numeric', month:'long', day:'numeric' });
    bubble.innerHTML = `
      <div class="msg-author">💜 ${escHtml(name)}</div>
      <div class="msg-text">${escHtml(text)}</div>
      <div class="msg-date">${dateStr}</div>
    `;
    list.insertBefore(bubble, list.firstChild);
    document.getElementById('senderName').value = '';
    document.getElementById('msgText').value = '';
    const toast = document.getElementById('successToast');
    toast.style.display = 'block';
    setTimeout(() => toast.style.display = 'none', 3500);
  }
 
  function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
 
  // ===== PETALS CANVAS =====
  const canvas = document.getElementById('petals');
  const ctx = canvas.getContext('2d');
  let petals = [];
  const EMOJIS = ['🌸','🌷','✨','💜','🌺'];
 
  function resizeCanvas() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
 
  function spawnPetal() {
    return {
      x: Math.random() * canvas.width,
      y: -20,
      size: 14 + Math.random() * 10,
      speed: 0.6 + Math.random() * 1.2,
      drift: (Math.random() - 0.5) * 0.5,
      rotate: Math.random() * Math.PI * 2,
      rotateSpeed: (Math.random() - 0.5) * 0.04,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      opacity: 0.5 + Math.random() * 0.5
    };
  }
 
  function animatePetals() {
    resizeCanvas();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (petals.length < 20 && Math.random() < 0.07) petals.push(spawnPetal());
    petals = petals.filter(p => p.y < canvas.height + 30);
    petals.forEach(p => {
      p.y += p.speed;
      p.x += p.drift;
      p.rotate += p.rotateSpeed;
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotate);
      ctx.font = p.size + 'px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(p.emoji, 0, 0);
      ctx.restore();
    });
    requestAnimationFrame(animatePetals);
  }
 
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  animatePetals();