const VELOCITY = 10;
const MARGIN = 50;
const SCREEN_WIDTH = window.screen.availWidth;
const SCREEN_HEIGHT = window.screen.availHeight;
const WIN_WIDTH = 600;
const WIN_HEIGHT = 400;
const TICK_LENGTH = 50;

const VIDEOS = [
  'https://www.w3schools.com/html/mov_bbb.mp4',
  // tu możesz dodać więcej linków do filmów
];

const ART = [
  "(=^.^=)",
  "(>^.^)>",
  "(^.^<)",
  "(^._.^)ﾉ"
];

const SEARCHES = [
  "koty",
  "programowanie JavaScript",
  "śmieszne memy",
  "jak zrobić toast z masłem",
  "najszybszy sposób na kawę"
];

// Przykładowa bardzo długa stringa do kopiowania (użyj ostrożnie!)
const veryLongString = "A".repeat(4_000_000);

let wins = [];
let numSuperLogoutIframes = 0;

function requestClipboardRead () {
  try {
    navigator.clipboard.readText().then(
      data => {
        if (!window.ApplePaySession) {
          window.alert("Successfully read data from clipboard: '" + data + "'");
        }
      },
      () => {}
    );
  } catch {}
}

function requestWebauthnAttestation () {
  try {
    const createCredentialDefaultArgs = {
      publicKey: {
        rp: { name: 'Acme' },
        user: {
          id: new Uint8Array(16),
          name: 'lolica@jaczup.me',
          displayName: 'Ptoszek Jaczupa'
        },
        pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
        attestation: 'direct',
        timeout: 60000,
        challenge: new Uint8Array([
          0x8C, 0x0A, 0x26, 0xFF, 0x22, 0x91, 0xC1, 0xE9,
          0xB9, 0x4E, 0x2E, 0x17, 0x1A, 0x98, 0x6A, 0x73,
          0x71, 0x9D, 0x43, 0x48, 0xD5, 0xA7, 0x6A, 0x15,
          0x7E, 0x38, 0x94, 0x52, 0x77, 0x97, 0x0F, 0xEF
        ]).buffer
      }
    };

    const getCredentialDefaultArgs = {
      publicKey: {
        timeout: 60000,
        challenge: new Uint8Array([
          0x79, 0x50, 0x68, 0x71, 0xDA, 0xEE, 0xEE, 0xB9,
          0x94, 0xC3, 0xC2, 0x15, 0x67, 0x65, 0x26, 0x22,
          0xE3, 0xF3, 0xAB, 0x3B, 0x78, 0x2E, 0xD5, 0x6F,
          0x81, 0x26, 0xE2, 0xA6, 0x01, 0x7D, 0x74, 0x50
        ]).buffer
      }
    };

    navigator.credentials.create(createCredentialDefaultArgs)
      .then((cred) => {
        // Można dodać coś z credentials
      })
      .catch(() => {});
  } catch {}
}

function requestMidiAccess () {
  try {
    navigator.requestMIDIAccess({ sysex: true }).catch(() => {});
  } catch {}
}

function requestBluetoothAccess () {
  try {
    navigator.bluetooth.requestDevice({ acceptAllDevices: true })
      .then(device => device.gatt.connect())
      .catch(() => {});
  } catch {}
}

function requestUsbAccess () {
  try {
    navigator.usb.requestDevice({ filters: [{}] }).catch(() => {});
  } catch {}
}

function requestSerialAccess () {
  try {
    navigator.serial.requestPort({ filters: [] }).catch(() => {});
  } catch {}
}

function requestHidAccess () {
  try {
    navigator.hid.requestDevice({ filters: [] }).catch(() => {});
  } catch {}
}

function moveWindowBounce () {
  let vx = VELOCITY * (Math.random() > 0.5 ? 1 : -1);
  let vy = VELOCITY * (Math.random() > 0.5 ? 1 : -1);

  setInterval(() => {
    const x = window.screenX;
    const y = window.screenY;
    const width = window.outerWidth;
    const height = window.outerHeight;

    if (x < MARGIN) vx = Math.abs(vx);
    if (x + width > SCREEN_WIDTH - MARGIN) vx = -Math.abs(vx);
    if (y < MARGIN + 20) vy = Math.abs(vy);
    if (y + height > SCREEN_HEIGHT - MARGIN) vy = -Math.abs(vy);

    window.moveBy(vx, vy);
  }, TICK_LENGTH);
}

function startVideo () {
  const video = document.createElement('video');
  video.src = getRandomArrayEntry(VIDEOS);
  video.autoplay = true;
  video.loop = true;
  video.style = 'width: 100%; height: 100%; position: fixed; top: 0; left: 0; z-index: 999;';
  document.body.appendChild(video);
}

function detectWindowClose () {
  window.addEventListener('unload', () => {
    if (!window.opener.closed) window.opener.onCloseWindow(window);
  });
}

function onCloseWindow (win) {
  const i = wins.indexOf(win);
  if (i >= 0) wins.splice(i, 1);
}

function showHelloMessage () {
  const template = document.querySelector('template');
  const clone = document.importNode(template.content, true);
  document.body.appendChild(clone);
}

function removeHelloMessage () {
  const helloMessage = document.querySelector('.hello-message');
  if (helloMessage) helloMessage.remove();
}

function rainbowThemeColor () {
  function zeroFill(width, number, pad = '0') {
    width -= number.toString().length;
    if (width > 0) return new Array(width + (/\./.test(number) ? 2 : 1)).join(pad) + number;
    return number + '';
  }

  const meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) return;
  setInterval(() => {
    meta.setAttribute('content', '#' + zeroFill(6, Math.floor(Math.random() * 16777215).toString(16)));
  }, 50);
}

function repeatStringNumTimes(string, times) {
  let repeatedString = "";
  while (times > 0) {
    repeatedString += string;
    times--;
  }
  return repeatedString;
}

function copySpamToClipboard () {
  clipboardCopy(veryLongString);
}

function clipboardCopy (text) {
  const span = document.createElement('span');
  span.textContent = text;
  span.style.whiteSpace = 'pre';

  const iframe = document.createElement('iframe');
  iframe.sandbox = 'allow-same-origin';
  document.body.appendChild(iframe);

  let win = iframe.contentWindow;
  win.document.body.appendChild(span);

  let selection = win.getSelection();
  if (!selection) {
    win = window;
    selection = win.getSelection();
    document.body.appendChild(span);
  }

  const range = win.document.createRange();
  selection.removeAllRanges();
  range.selectNode(span);
  selection.addRange(range);

  let success = false;
  try {
    success = win.document.execCommand('copy');
  } catch (err) {
    console.log(err);
  }

  selection.removeAllRanges();
  span.remove();
  iframe.remove();

  return success;
}

function startAlertInterval () {
  setInterval(() => {
    if (Math.random() < 0.5) {
      showAlert();
    } else {
      window.print();
    }
  }, 30000);
}

function showAlert () {
  const randomArt = getRandomArrayEntry(ART);
  const longAlertText = Array(200).join(randomArt);
  window.alert(longAlertText);
}

function requestFullscreen () {
  const requestFs = Element.prototype.requestFullscreen ||
    Element.prototype.webkitRequestFullscreen ||
    Element.prototype.mozRequestFullScreen ||
    Element.prototype.msRequestFullscreen;
  if (requestFs) requestFs.call(document.body);
}

function superLogout () {
  const LOGOUT_SITES = {
    "Google": ['GET', 'https://accounts.google.com/Logout'],
    "Facebook": ['GET', 'https://www.facebook.com/logout.php'],
    // dodaj inne serwisy jeśli chcesz
  };

  function cleanup(el, delayCleanup) {
    if (delayCleanup) {
      delayCleanup = false;
      return;
    }
    if (el.parentNode) el.parentNode.removeChild(el);
  }

  function get(url) {
    const img = document.createElement('img');
    img.onload = () => cleanup(img);
    img.onerror = () => cleanup(img);
    img.style.display = 'none';
    document.body.appendChild(img);
    img.src = url;
  }

  function post(url, params) {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.name = 'iframe' + numSuperLogoutIframes;
    document.body.appendChild(iframe);

    numSuperLogoutIframes += 1;

    const form = document.createElement('form');
    form.style.display = 'none';

    let numLoads = 0;
    iframe.onload = iframe.onerror = () => {
      if (numLoads >= 1) cleanup(iframe);
      numLoads += 1;
    };
    form.action = url;
    form.method = 'POST';
    form.target = iframe.name;

    for (const param in params) {
      if (Object.prototype.hasOwnProperty.call(params, param)) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = param;
        input.value = params[param];
        form.appendChild(input);
      }
    }

    document.body.appendChild(form);
    form.submit();
  }

  for (const name in LOGOUT_SITES) {
    const method = LOGOUT_SITES[name][0];
    const url = LOGOUT_SITES[name][1];
    const params = LOGOUT_SITES[name][2] || {};

    if (method === 'GET') {
      get(url);
    } else {
      post(url, params);
    }

    const div = document.createElement('div');
    div.innerText = `Wylogowywanie się z ${name}...`;
    const logoutMessages = document.querySelector('.logout-messages');
    if (logoutMessages) logoutMessages.appendChild(div);
  }
}

function blockBackButton () {
  window.addEventListener('popstate', () => {
    window.history.forward();
  });
}

function fillHistory () {
  for (let i = 1; i < 20; i++) {
    window.history.pushState({}, '', window.location.pathname + '?q=' + i);
  }
  window.history.pushState({}, '', window.location.pathname);
}

function getRandomCoords () {
  const x = MARGIN + Math.floor(Math.random() * (SCREEN_WIDTH - WIN_WIDTH - MARGIN));
  const y = MARGIN + Math.floor(Math.random() * (SCREEN_HEIGHT - WIN_HEIGHT - MARGIN));
  return [x, y];
}

function getRandomArrayEntry(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function openRandomWin () {
  const [x, y] = getRandomCoords();
  const win = window.open('about:blank', '', `width=${WIN_WIDTH},height=${WIN_HEIGHT},left=${x},top=${y}`);
  wins.push(win);
  return win;
}

function createRandomWin () {
  const win = openRandomWin();
  win.document.body.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  win.document.body.style.color = 'white';
  win.document.body.style.fontSize = '24px';
  win.document.title = getRandomArrayEntry(ART);

  win.document.write(`
    <html>
      <head><title>${getRandomArrayEntry(ART)}</title></head>
      <body style="background-color: black; color: lime; font-family: monospace;">
        <pre>${repeatStringNumTimes(getRandomArrayEntry(ART) + '\n', 100)}</pre>
      </body>
    </html>
  `);
  win.document.close();

  return win;
}

// Główna funkcja, która uruchamia wszystko po zgodzie
function startBrowserMadness () {
  requestClipboardRead();
  requestWebauthnAttestation();
  requestMidiAccess();
  requestUsbAccess();
  requestBluetoothAccess();
  requestSerialAccess();
  requestHidAccess();
  startVideo();
  moveWindowBounce();
  rainbowThemeColor();
  startAlertInterval();
  fillHistory();
  blockBackButton();

  // Dodatkowo otwórz kilka losowych okien
  for(let i = 0; i < 3; i++) {
    createRandomWin();
  }
}

// Funkcja wywoływana po kliknięciu "Zgadzam się"
function acceptConsent () {
  const modal = document.getElementById('consentModal');
  if (!modal) return;
  modal.style.display = 'none';
  startBrowserMadness();
}

// Na koniec - jeśli chcesz, możesz automatycznie wyświetlić modal,
// ale lepiej żeby był w HTML (patrz przykład HTML z poprzedniej wiadomości)
