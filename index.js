import { card } from "./card.js";
import { filterBySource } from "./filterBySource.js";
import cardData from "./data.json" assert { type: "json" };
import { darkTheme, defaultTheme } from "./theme.js";

const loadButton = document.querySelector(".load-btn");

// main layout
const layoutContainer = document.querySelector(".layout-placeholder");

// text inputs
const spaceBetweenTextInput = document.getElementById("cardSpaceBetween");
const cardBackgrondColorTextInput = document.getElementById(
  "cardBackgroundColor"
);

// get all the radio buttons
const radioButtons = document.querySelectorAll(
  'input[type="radio"][name="filterBySource"]'
);

// select number of columns
const dropdown = document.getElementById("numberOfColumns");

const themeRadioButtons = document.querySelectorAll(
  'input[type="radio"][name="theme"]'
);

function updateDisplay(data) {
  if (data.length === 0) {
    const message = document.createElement("h1");
    message.textContent =
      "Thank you for checking out the content in the container. Unfortunately, it seems that there are no posts available at the moment. ";
    layoutContainer.appendChild(message);
    removeLoadButton();
  } else {
    data.map(
      (
        {
          image,
          caption,
          source_type,
          name,
          source_link,
          date,
          likes,
          profile_image,
        },
        index
      ) =>
        layoutContainer.appendChild(
          card(
            profile_image,
            name,
            date,
            source_type,
            image,
            caption,
            likes,
            index,
            source_link
          )
        )
    );
    loadButton.style.color = "#FFFFFF";
  }
}

function emptyLayoutContainer() {
  layoutContainer.innerHTML = "";
}

function addSpaceBetweenCards(space) {
  layoutContainer.style.gap = space;
}

function loadSVG() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "./icons/heart.svg");
  xhr.send();
  xhr.onload = () => {
    const heartIcons = document.querySelectorAll(".heart-svg");
    heartIcons.forEach((icon) => {
      icon.innerHTML = xhr.response;
      icon.children[0].style.fill = "#FFFFFF";
    });
  };
}

function changeLikeStatus() {
  const heartIcons = document.querySelectorAll(".heart-svg");

  heartIcons.forEach((icon) =>
    icon.addEventListener("click", () => {
      const cardIndex = icon.parentElement.parentElement.id;

      if (icon.getAttribute("liked") === "true") {
        icon.children[0].style.fill = "#FFFFFF";
        icon.setAttribute("liked", false);
        icon.nextSibling.textContent = cardData[cardIndex].likes;
      } else {
        icon.children[0].style.fill = "#FF0000";
        icon.setAttribute("liked", true);
        icon.nextSibling.textContent = parseInt(cardData[cardIndex].likes) + 1;
      }
    })
  );
}

function checkCurrentTheme() {
  const themeButtons = document.querySelectorAll('input[name="theme"]');

  // loop through the radio buttons to check which one is selected
  let selectedValue;
  for (const radioButton of themeButtons) {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
      break;
    }
  }

  return selectedValue;
}

function dataSlicer(start = 0, end = 4) {
  return cardData.slice(start, end);
}

function changeCardsBgColor(color) {
  const cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => (card.style.backgroundColor = color));
}

function removeLoadButton() {
  loadButton.style.display = "none";
}

function changeTheme(theme) {
  const cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    if (theme === "darkTheme") {
      card.style.backgroundColor = darkTheme.backgroundColor;
      card.style.color = darkTheme.color;
    } else {
      card.style.backgroundColor = defaultTheme.backgroundColor;
      card.style.color = defaultTheme.color;
    }
  });
}

function loadMoreCards() {
  const numOfCards = document.querySelectorAll(".card-container").length;

  emptyLayoutContainer();
  updateDisplay(dataSlicer(0, numOfCards + 4));
  changeTheme(checkCurrentTheme());
  changeLikeStatus();
  loadSVG();

  if (cardData.length === numOfCards + 4) {
    removeLoadButton();
  }
}

// Event Listeners
radioButtons.forEach((btn) =>
  btn.addEventListener("click", () => {
    emptyLayoutContainer();
    updateDisplay(filterBySource(cardData, btn.value));
    changeTheme(checkCurrentTheme());
    changeLikeStatus();
    loadSVG();
    removeLoadButton();
  })
);

// add dropdown functionality
dropdown.addEventListener("change", function () {
  // Create a media condition that targets viewports at least 992px wide
  const mediaQuery = window.matchMedia("(min-width: 992px)");
  // Check if the media query is true

  if (dropdown.value === "dynamic") {
    layoutContainer.style.gridTemplateColumns = `repeat(auto-fill, minmax(350px, 1fr))`;
  } else if (mediaQuery.matches) {
    if (dropdown.value >= 4) {
      layoutContainer.style.gridTemplateColumns = `repeat(${dropdown.value},310px)`;
    } else {
      layoutContainer.style.gridTemplateColumns = `repeat(${dropdown.value}, 380px)`;
    }
  } else {
    layoutContainer.style.gridTemplateColumns = `repeat(${dropdown.value}, 380px)`;
  }
});

themeRadioButtons.forEach((btn) =>
  btn.addEventListener("click", () => changeTheme(btn.value))
);

spaceBetweenTextInput.addEventListener("input", () =>
  addSpaceBetweenCards(spaceBetweenTextInput.value)
);
// input event
cardBackgrondColorTextInput.addEventListener("input", () => {
  if (
    cardBackgrondColorTextInput.value === "white" ||
    cardBackgrondColorTextInput.value === "#ffffff"
  ) {
    changeTheme("lightTheme");
  } else {
    changeCardsBgColor(cardBackgrondColorTextInput.value);
  }
});

// focusin event
cardBackgrondColorTextInput.addEventListener("focusin", () => {
  if (
    cardBackgrondColorTextInput.value === "white" ||
    cardBackgrondColorTextInput.value === "#ffffff"
  ) {
    changeTheme("lightTheme");
  } else {
    changeCardsBgColor(cardBackgrondColorTextInput.value);
  }
});

loadButton.addEventListener("click", () => {
  loadMoreCards();
});

updateDisplay(dataSlicer());
changeLikeStatus();
loadSVG();
