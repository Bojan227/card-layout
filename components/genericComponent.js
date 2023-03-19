export default function genericComponent(type, textContent) {
  const element = document.createElement(type);
  element.textContent = textContent;
  return element;
}
