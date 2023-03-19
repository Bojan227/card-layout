export default function text(type, textContent) {
  const element = document.createElement(type);
  element.textContent = textContent;

  return element;
}
