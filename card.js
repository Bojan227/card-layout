import div from "./components/divComponent.js";
import img from "./components/imgComponent.js";
import text from "./components/textComponent.js";
import { formatDate } from "./formatDate.js";

export function card(
  profile_image,
  name,
  date,
  source_type,
  image,
  caption,
  likes,
  index,
  source_link
) {
  const cardContainer = div("card-container", "#ffffff", index);

  // header card
  const header = div("header-card");

  const profileImage = img(profile_image, "profile-img", "profile-img");

  // user info
  const userContainer = div("user-info");

  const userName = text("h4", name);
  const dateContent = text("p", formatDate(date));

  userContainer.append(userName, dateContent);

  const sourceLink = document.createElement("a");
  sourceLink.href = source_link;
  const sourceImage = img(
    source_type === "facebook"
      ? "./icons/facebook.svg"
      : "./icons/instagram-logo.svg"
  );
  sourceLink.append(sourceImage);

  sourceImage.classList.add("source-logo");
  header.append(profileImage, userContainer, sourceLink);

  // main section
  const mainSection = div("main-section");
  mainSection.style.borderBottom = "1px solid #cbd5e1";

  const mainImage = img(image, "main-image", "main-img");

  const captionContent = text("p", caption);

  mainSection.append(mainImage, captionContent);

  //   likes section
  const likesSection = div("likes-section");

  // svg
  const svgContainer = div("svg");
  svgContainer.setAttribute("liked", false);

  const numberOfLikes = text("p", likes);

  likesSection.append(svgContainer, numberOfLikes);
  cardContainer.append(header, mainSection, likesSection);

  return cardContainer;
}