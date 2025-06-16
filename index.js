function startPanicMode() {
  let alertCount = 0;

  // Zmiana tytułu i favicon
  const originalTitle = document.title;
  const favicon = document.querySelector('link[rel="icon"]');
  const originalFaviconHref = favicon ? favicon.href : null;
  const panicFavicon = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/OOjs_UI_icon_alert_destructive.svg/1024px-OOjs_UI_icon_alert_destructive.svg.png';

  function changeTitle() {
    const messages = ['HACKED!!!', 'SYSTEM ERROR', 'PANIKA!!!', 'UWAGA! ZAGROŻENIE!'];
    document.title = messages[Math.floor(Math.random() * messages.length)];
  }

  function changeFavicon() {
    if (favicon) favicon.href = panicFavicon;
  }

  // Blokowanie prawego kliku i kilku skrótów klawiaturowych
  window.addEventListener('contextmenu', e => e.preventDefault());
  window.addEventListener('keydown', e => {
    if (
      e.ctrlKey && 
      ['s', 'u', 'p', 'c'].includes(e.key.toLowerCase()) // Save, View Source, Print, Copy
    ) {
      e.preventDefault();
      alert('Ta akcja została zablokowana ze względów bezpieczeństwa!');
    }
  });

  // Alerty spamujące
  const alertInterval = setInterval(() => {
    if (alertCount >= 12) {
      clearInterval(alertInterval);
      showFakeControlPanel();
      return;
    }
    alert('UWAGA! Twoje dane są zagrożone! Natychmiast podejmij działanie!');
    alertCount++;
  }, 2500);

  // Zmiana tytułu i favicon co sekundę
  const titleFaviconInterval = setInterval(() => {
    changeTitle();
    changeFavicon();
  }, 1000);

  // Symulowany paniczny panel „usuwania wirusa”
  function showFakeControlPanel() {
    clearInterval(titleFaviconInterval);
    document.title = 'System Bezpieczeństwa';
    if (favicon) favicon.href = originalFaviconHref;

    document.body.innerHTML = `
      <div style="background:#111;color:#0f0;font-family: monospace; padding: 2rem; text-align:center;">
        <h1>System Bezpieczeństwa</h1>
        <p>Symulacja usuwania zagrożeń...</p>
        <button id="fakeScanBtn">Skanuj system</button>
        <button id="fakeFixBtn" disabled>Napraw system</button>
        <div id="scanOutput" style="margin-top: 1rem; text-align: left; max-height: 200px; overflow: auto; background: #000; padding: 1rem;"></div>
      </div>
    `;

    const scanBtn = document.getElementById('fakeScanBtn');
    const fixBtn = document.getElementById('fakeFixBtn');
    const output = document.getElementById('scanOutput');

    scanBtn.onclick = () => {
      output.textContent = 'Skanowanie systemu...\n';
      let progress = 0;
      const scanInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 15);
        output.textContent += `Zagrożenia znalezione: ${progress}\n`;
        output.scrollTop = output.scrollHeight;
        if (progress > 100) {
          clearInterval(scanInterval);
          output.textContent += 'Skanowanie zakończone.\n';
          fixBtn.disabled = false;
        }
      }, 800);
    };

    fixBtn.onclick = () => {
      alert('System naprawiony. Wszystko jest teraz bezpieczne!');
      location.reload();
    };
  }
}
