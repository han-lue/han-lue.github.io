const fonts = ['Deluxe220Default', 'Deluxe220Bold', 'Deluxe220Rough', 'Deluxe220Faded'];

function randomizeFonts(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent;
    const fragment = document.createDocumentFragment();

    for (let ch of text) {
      // Keep spaces and newlines as normal text nodes
      if (ch === ' ' || ch === '\n') {
        fragment.appendChild(document.createTextNode(ch));
        if (ch === '\n') fragment.appendChild(document.createElement('br'));
        continue;
      }

      // Wrap letters in span and randomly pick a font
      const span = document.createElement('span');
      span.textContent = ch;

      const r = Math.random();
      if (r < 0.76) span.style.fontFamily = fonts[0];
      else if (r < 0.84) span.style.fontFamily = fonts[1];
      else if (r < 0.92) span.style.fontFamily = fonts[2];
      else span.style.fontFamily = fonts[3];

      fragment.appendChild(span);
    }

    node.replaceWith(fragment);

  } else if (node.nodeType === Node.ELEMENT_NODE) {
    // Recursively handle children (links, spans, etc.)
    Array.from(node.childNodes).forEach(randomizeFonts);
  }
}

// Apply to all elements with the class
document.querySelectorAll('.typewriter-font-mixed').forEach(el => randomizeFonts(el));