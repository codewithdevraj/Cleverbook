const nav = document.querySelector("nav");
const stickyDiv = document.querySelector(".stickydiv");
const scrollSection = document.querySelector(".scroll");
const progressBar = document.querySelector(".progress-bar");
const progressTip = document.querySelector(".prgtipcnt");
const progressTipImg = document.querySelector(".progress-tip");
const stext = document.querySelector(".stext");
const countn = document.querySelector(".countn");
const counts = document.querySelector(".counts");
const pbtn1 = document.getElementById("pbtn1");
const pbtn2 = document.getElementById("pbtn2");
const pbtn3 = document.getElementById("pbtn3");

let lastScrollPos = window.pageYOffset;
let timeoutId = null;

let sectionTop = scrollSection.offsetTop;
let sectionHeight = scrollSection.offsetHeight;

const detailsMapping = {
  1: {
    text: "Reduction in out-of-stock",
    number: "85",
    unit: "%",
    imgSrc:
      "https://cdn.prod.website-files.com/639b3e775b326dcf7cea3e70/639b3e775b326d8009ea3ec5_Avoid%20stockouts-icon.svg",
    activeBtn: pbtn1,
  },
  2: {
    text: "Reduction in Cash recovery time",
    number: "25",
    unit: "days",
    imgSrc:
      "https://cdn.prod.website-files.com/639b3e775b326dcf7cea3e70/639b3e775b326d16ecea3ef7_reduced-icon.svg",
    activeBtn: pbtn2,
  },
  3: {
    text: "Growth in revenue",
    number: "15",
    unit: "%",
    imgSrc:
      "https://cdn.prod.website-files.com/639b3e775b326dcf7cea3e70/639b3e775b326d83fbea3ef8_Impact-icon.svg",
    activeBtn: pbtn3,
  },
};

let currentCondition = 1;

function handleScroll() {
  const currentScrollPos = window.pageYOffset;
  const scrollTop = window.scrollY;
  const viewPortHeight = window.innerHeight;
  const scrollProgress = (scrollTop - sectionTop) / sectionHeight;

  // Navigation bar hide/show logic
  if (currentScrollPos > lastScrollPos) {
    nav.classList.add("hidden");
    clearTimeout(timeoutId);
  } else {
    if (currentScrollPos > 0) {
      nav.classList.remove("hidden");
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (window.pageYOffset > 0 && !nav.classList.contains("hidden")) {
          nav.classList.add("hidden");
        }
      }, 4000); // 4 seconds delay
    }
  }
  lastScrollPos = currentScrollPos;

  // Sticky div and progress bar logic
  if (scrollTop < sectionTop) {
    stickyDiv.classList.remove("fixed", "absolute0");
    stickyDiv.classList.add("absolute1");
    progressTip.style.transform = `translateY(0%)`;
  } else if (
    scrollTop >= sectionTop &&
    scrollTop + viewPortHeight < sectionTop + sectionHeight
  ) {
    stickyDiv.classList.remove("absolute0", "absolute1");
    stickyDiv.classList.add("fixed");
    progressBar.style.height = `${scrollProgress * 100}%`;
    progressTip.style.transform = `translateY(${scrollProgress * 100}%)`;
  } else {
    stickyDiv.classList.remove("fixed", "absolute1");
    stickyDiv.classList.add("absolute0");
    progressTip.style.transform = `translateY(100%)`;
  }

  updateScrollTextAndImage(scrollProgress);
}

function updateScrollTextAndImage(scrollProgress) {
  let newCondition = 1;
  if (scrollProgress >= 0.2 && scrollProgress < 0.5) {
    newCondition = 2;
  } else if (scrollProgress >= 0.5 && scrollProgress <= 1) {
    newCondition = 3;
  }

  if (newCondition !== currentCondition) {
    currentCondition = newCondition;
    const details = detailsMapping[newCondition];
    setScrollDetails(
      details.text,
      details.number,
      details.unit,
      details.imgSrc
    );
    updateActiveButton(details.activeBtn);
    count(countn);
  }
}

function setScrollDetails(text, number, unit, imgSrc) {
  stext.innerText = text;
  countn.innerText = number;
  counts.innerText = unit;
  progressTipImg.src = imgSrc;
}

function updateActiveButton(activeBtn) {
  pbtn1.classList.remove("active");
  pbtn2.classList.remove("active");
  pbtn3.classList.remove("active");
  activeBtn.classList.add("active");
}

function count(targetElement) {
  const targetValue = parseInt(targetElement.innerText, 10);
  let currentCount = 0;
  const interval = setInterval(() => {
    currentCount++;
    targetElement.innerText = currentCount;
    if (currentCount === targetValue) {
      clearInterval(interval);
    }
  }, 5); // Adjust the delay between updates here
}

function scrollToProgress(progress) {
  const targetScrollPos = sectionTop + sectionHeight * progress;
  window.scrollTo({
    top: targetScrollPos,
    behavior: "smooth",
  });
}

// Add click event listeners to buttons
pbtn1.addEventListener("click", (e) => {
  e.preventDefault();
  scrollToProgress(0);
});

pbtn2.addEventListener("click", (e) => {
  e.preventDefault();
  scrollToProgress(0.2);
});

pbtn3.addEventListener("click", (e) => {
  e.preventDefault();
  scrollToProgress(0.5);
});

window.addEventListener("scroll", handleScroll);

window.addEventListener("resize", () => {
  sectionTop = scrollSection.offsetTop;
  sectionHeight = scrollSection.offsetHeight;
});

const logoTrack = document.querySelector(".logo-track");
const logos = logoTrack.querySelectorAll(".hp-client-img");
const logoWidth = logos[0].offsetWidth; // Get the width of a single logo
const imageSldr11 = document.getElementById("sldr11");
const section4 = document.getElementById("sec4");

let currentPosition = 0;
let startTime = null;
let isHovered = false; // Flag to track hover state
let animationId; // Variable to store animation ID

function scrollLogos(timestamp) {
  if (!startTime && !isHovered) {
    startTime = timestamp; // Initial timestamp if not hovering
  }
  const progress = (timestamp - startTime) / 800; // Calculate progress (0 to 1) in 30 seconds

  if (!isHovered) {
    // console.log(progress);
    currentPosition = -logoWidth * progress; // Move logos based on progress

    logoTrack.style.transform = `translateX(${currentPosition}px)`;

    const isSldr11AtLeft = imageSldr11.getBoundingClientRect().left <= 0; // Check if image reaches leftmost
    if (isSldr11AtLeft) {
      startTime = null; // Reset start time for next loop
    }
  }

  animationId = requestAnimationFrame(scrollLogos); // Animate smoothly
}

scrollLogos();
// Handle hover events on section4

let cont51 = document.getElementById("cont51");
let cont52 = document.getElementById("cont52");
cont52.style.display = "none";
let contcond = 1;
function changecont() {
  if (contcond === 1) {
    cont51.style.display = "none";
    cont52.style.display = "flex";
    contcond = 2;
  } else {
    cont51.style.display = "flex";
    cont52.style.display = "none";
    contcond = 1;
  }
}

let s6img = document.getElementById("s6img");
document.querySelectorAll(".s6comp").forEach((comp) => {
  comp.addEventListener("click", function () {
    // Remove 'active' class and 'gradient-text' class from all .s6comp elements
    document.querySelectorAll(".s6comp").forEach((el) => {
      el.classList.remove("active");
      el.querySelector("h3").classList.remove("gradient-text");
    });

    // Add 'active' class and 'gradient-text' class to the clicked element
    this.classList.add("active");
    this.querySelector("h3").classList.add("gradient-text");
    var link = this.querySelector("#imagelink");
    s6img.src = link.innerText;
  });
});

const prevButton = document.getElementById("s7prev");
const nextButton = document.getElementById("s7next");
const cardsContainer = document.querySelector(".s7cards");
const cardWidth = cardsContainer.querySelector(".s7card").offsetWidth;
const firstCard = cardsContainer.querySelector(".s7card:first-child");
const lastCard = cardsContainer.querySelector(".s7card:last-child");

cardsContainer.insertBefore(lastCard.cloneNode(true), firstCard);
cardsContainer.appendChild(firstCard.cloneNode(true));

prevButton.addEventListener("click", function () {
  cardsContainer.scrollBy({
    left: -cardWidth - 20, // include the gap between cards
    behavior: "smooth",
  });
});

nextButton.addEventListener("click", function () {
  cardsContainer.scrollBy({
    left: cardWidth + 20, // include the gap between cards
    behavior: "smooth",
  });
});

cardsContainer.addEventListener("scroll", function () {
  const scrollLeft = cardsContainer.scrollLeft;
  const maxScroll = cardsContainer.scrollWidth - cardsContainer.offsetWidth;
  if (scrollLeft === 0) {
    cardsContainer.scrollLeft = maxScroll - cardWidth;
  } else if (scrollLeft === maxScroll) {
    cardsContainer.scrollLeft = cardWidth;
  }
});
// autoscroll after delay of 3 seconds
setInterval(function () {
  cardsContainer.scrollBy({
    left: cardWidth + 20,
    behavior: "smooth",
  });
}, 8000);

const prevButton9 = document.getElementById("s9prv");
const nextButton9 = document.getElementById("s9nxt");
const cardsContainer9 = document.querySelector(".s9cards");
const cardWidth9 = cardsContainer9.querySelector(".s9card").offsetWidth;
const firstCard9 = cardsContainer9.querySelector(".s9card:first-child");
const secondCard9 = cardsContainer9.querySelector(".s9card:nth-child(2)");
const thirdCard9 = cardsContainer9.querySelector(".s9card:nth-child(3)");
const lastCard9 = cardsContainer9.querySelector(".s9card:last-child");

cardsContainer9.insertBefore(lastCard9.cloneNode(true), firstCard9);
cardsContainer9.appendChild(firstCard9.cloneNode(true));
cardsContainer9.appendChild(secondCard9.cloneNode(true));
cardsContainer9.appendChild(thirdCard9.cloneNode(true));

prevButton9.addEventListener("click", function () {
  cardsContainer9.scrollBy({
    left: -cardWidth9, // include the gap between cards
    behavior: "smooth",
  });
});

nextButton9.addEventListener("click", function () {
  cardsContainer9.scrollBy({
    left: cardWidth9, // include the gap between cards
    behavior: "smooth",
  });
});

cardsContainer9.addEventListener("scroll", function () {
  const scrollLeft9 = cardsContainer9.scrollLeft;
  const maxScroll9 = cardsContainer9.scrollWidth - cardsContainer9.offsetWidth;
  if (scrollLeft9 <= 0) {
    cardsContainer9.scrollLeft = maxScroll9 - cardWidth9; // Adjusted for multiple cloned cards
  }
  //else if my original last card not the cloned one gets out of screen the slider scrolls to the first card
  else if (scrollLeft9 >= maxScroll9 - cardWidth9) {
    cardsContainer9.scrollLeft = cardWidth9; // Adjusted for multiple cloned cards
    //make the transition smoother
  }
});

// Auto-scroll after a delay of 3 seconds
setInterval(function () {
  cardsContainer9.scrollBy({
    left: cardWidth9 + 20,
    behavior: "smooth",
  });
}, 5000);

let section8 = document.getElementById("sec8");
let s8image = document.getElementById("s8image");
//if section reaches to 30% from bottom while scrolling down the add glow class to image
function addGlow() {
  var rect = section8.getBoundingClientRect();
  var scrollHeight = window.innerHeight;
  if (rect.top < scrollHeight * 0.7) {
    s8image.classList.add("glow");
  }
  if (rect.bottom < scrollHeight * 0.4 || rect.top > scrollHeight * 0.7) {
    s8image.classList.remove("glow");
  }
}
window.addEventListener("scroll", addGlow);

let hambtn = document.getElementById("hambars");
hambtn.addEventListener("click", function () {
  document.querySelector(".navr").classList.toggle("nvactv");
  hambtn.classList.toggle("active")
});
