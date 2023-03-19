export default function editCaption(caption) {
  const captionArray = caption.split(" ");
  if (!caption) return "";
  captionArray[0] = `#${captionArray[0]}`;

  let restOfCaption = captionArray.slice(1).join(" ");

  const spanElement = document.createElement("span");
  spanElement.textContent = captionArray[0];
  spanElement.style.color = "#4F9DE8";
  spanElement.style.fontSize = "16px";
  const pElement = document.createElement("p");

  pElement.textContent = ` ${restOfCaption}`;
  pElement.insertAdjacentElement("afterBegin", spanElement);

  return pElement;
}
