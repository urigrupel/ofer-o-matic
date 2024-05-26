document
  .getElementById('input-message')
  .addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      getTranslation();
    }
  });

async function copyToClipboard(source) {
  text = document.getElementById(source).textContent;
  try {
    await navigator.clipboard.writeText(text);
    showTooltip('Copied', document.getElementById(source));
  } catch (error) {
    console.error(error.message);
  }
}

function getAdvice() {
  const advice = document.getElementById('bet-result');
  advice.classList.remove('hidden');
}

function getNumbers() {
  let options = range(1, 37);
  let strongOptions = range(1, 7);
  let choice = [];
  for (let i = 0; i < 6; i++) {
    const index = randInt(0, options.length);
    const number = options.splice(index, 1)[0];
    choice.push(number);
    if (index < strongOptions.length) {
      strongOptions.splice(index, 1);
    }
  }
  const index = randInt(0, strongOptions.length);
  const strong = strongOptions.splice(index, 1)[0];

  const output = document.getElementById('lottory-numbers');
  output.textContent = choice.join(', ').concat(`, (${strong})`);
  copyToClipboard('lottory-numbers');
}

function range(start, stop, step = 1) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step
  );
}

function randInt(min, max) {
  diff = max - min;
  if (diff <= 0) {
    return min;
  }
  return min + Math.floor(Math.random() * diff);
}

function showTooltip(text, parent) {
  const fontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );

  const tooltip = document.getElementById('tooltip');
  tooltip.textContent = text;
  tooltip.style.opacity = '1';
  tooltip.style.pointerEvents = 'auto';

  const rect = parent.getBoundingClientRect();
  const right =
    window.scrollX + rect.right - tooltip.getBoundingClientRect().width;
  const top = rect.bottom + window.scrollY + fontSize;

  tooltip.style.top = `${top}px`;
  tooltip.style.left = `${right}px`;

  setTimeout(() => {
    tooltip.style.opacity = '0';
    tooltip.style.pointerEvents = 'none';
  }, 1000);
}

function translate(text, lang) {
  const enKeys = `zxcvbnm,./asdfghjkl;'qwertyuiop[]`;
  const heKeys = `זסבהנמצתץ.שדגכעיחלךף,/'קראטוןםפ][`;

  let source = enKeys;
  let target = heKeys;
  if (lang === 'en') {
    source = heKeys;
    target = enKeys;
  }
  let result = '';
  for (const ch in text) {
    const index = source.search(text[ch].toLowerCase());
    if (index === -1) {
      result = result.concat(text[ch]);
    } else {
      result = result.concat(target[index]);
    }
  }

  return result;
}

function getTranslation() {
  const langButtons = document.querySelectorAll('#lang-choices input');
  let lang = '';
  for (const langButton of langButtons) {
    if (langButton.checked) {
      lang = langButton.value;
    }
  }

  const text = document.getElementById('input-message').value;
  const output = document.getElementById('output-message');

  if (lang === '') {
    lang = findTargetLang(text);
  }
  output.textContent = translate(text, lang);
  copyToClipboard('output-message');
}

function findTargetLang(text) {
  const enKeys = `zxcvbnm,./asdfghjkl;'qwertyuiop[]`;
  const heKeys = `זסבהנמצתץ.שדגכעיחלךף,/'קראטוןםפ][`;

  let he = 0;
  let en = 0;
  for (const ch in text) {
    let index = enKeys.search(text[ch].toLowerCase());
    if (index != -1) {
      en++;
    }
    index = heKeys.search(text[ch].toLowerCase());
    if (index != -1) {
      he++;
    }
  }
  if (he < en) {
    return 'he';
  } else {
    return 'en';
  }
}
