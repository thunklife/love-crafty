import text from './text';
import build from 'markov-text-gen';

const el = document.getElementById('message');
const btn = document.getElementById('run');
const charsOption = document.getElementById('switch-1');
const loadingZone = document.getElementById('loading');
const loadedZone = document.getElementById('loaded');

const buildChains = (sourceText) => {
  const buildByChars = build(sourceText, 10, true);
  const buildByWords = build(sourceText, 3, false);
  return Promise.all([buildByChars, buildByWords]);
}

const updateMessage= (runByChars, runByWords) => {
  const byChars = charsOption.checked;
  const generatedText = byChars ? runByChars(1000) : runByWords(100);
  el.innerText = generatedText;
  return;
};

buildChains(text)
  .then(([runByChars, runByWords]) => {
    updateMessage(runByChars, runByWords);
    btn.addEventListener('click', updateMessage.bind(null, runByChars, runByWords));
    loadingZone.classList.add('hide');
    loadedZone.classList.remove('hide');
});

