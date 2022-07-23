// Progress Bar
const sections = document.querySelectorAll("section");
const progressBar = document.querySelector(".progressBar");
const halfCircles = document.querySelectorAll(".halfCircle");
const halfCircleTop = document.querySelector(".halfCircleTop");
const progressBarCircle = document.querySelector(".progressBarCircle");

const progressBarFunction = (bigImgWrapper = false) => {
  let pageHeight = 0;
  let scrolledPortion = 0;
  const pageViewPortHeight = window.innerHeight;
  if (!bigImgWrapper) {
    pageHeight = document.documentElement.scrollHeight;
    scrolledPortion = window.pageYOffset;
  } else {
    pageHeight = bigImgWrapper.firstElementChild.scrollHeight;
    scrolledPortion = bigImgWrapper.scrollTop;
  }
  const scrollPortionDegree =
    (scrolledPortion / (pageHeight - pageViewPortHeight)) * 360;
  // console.log(scrollPortionDegree);

  halfCircles.forEach((el) => {
    el.style.transform = `rotate(${scrollPortionDegree}deg)`;

    if (scrollPortionDegree >= 180) {
      halfCircles[0].style.transform = "rotate(180deg)";
      halfCircleTop.style.opacity = 0;
    } else {
      halfCircleTop.style.opacity = 1;
    }
  });

  const scrollBool = scrolledPortion + pageViewPortHeight === pageHeight;
  // ProgressBr Click

  progressBar.addEventListener("click", (e) => {
    e.preventDefault();

    if (!bigImgWrapper) {
      const sectionPosition = Array.from(sections).map((section) => {
        return scrolledPortion + section.getBoundingClientRect().top;
      });

      const position = sectionPosition.find((sectionPosition) => {
        return sectionPosition > scrolledPortion;
      });
      scrollBool ? window.scrollTo(0, 0) : window.scrollTo(0, position);
    } else {
      scrollBool
        ? bigImgWrapper.scrollTo(0, 0)
        : bigImgWrapper.scrollTo(0, bigImgWrapper.scrollHeight);
    }
  });

  // End Of ProgressBr Click

  // Arrow Rotation
  if (scrollBool) {
    progressBarCircle.style.transform = "rotate(180deg)";
  } else {
    progressBarCircle.style.transform = "rotate(0deg)";
  }
  // End Of Arrow Rotation
};
// End Of Progress Bar

const scrollFunction = () => {
  // Progress Bar Function

  progressBarFunction();
  // End Of Progress Bar Function
};

document.addEventListener("scroll", scrollFunction);
