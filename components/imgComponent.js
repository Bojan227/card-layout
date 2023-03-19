export default function img(source, alt, className) {
  const img = document.createElement("img");
  source ? (img.src = source) : null;
  alt ? (img.alt = alt) : null;
  className ? img.classList.add(className) : null;

  return img;
}
