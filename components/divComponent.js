export default function div(className, bgColor, index) {
  const div = document.createElement("div");
  className ? div.classList.add(className) : null;
  bgColor ? (div.style.backgroundColor = bgColor) : null;
  index === 0 || index ? div.setAttribute("id", index) : null;

  return div;
}
