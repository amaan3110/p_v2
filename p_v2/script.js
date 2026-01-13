(function () {
  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
  });
})();

gsap.registerPlugin(ScrollTrigger);

const hero_text = document.querySelector(".my_name h1");
const star_img = document.querySelector(".star_img");
const hero_text_container = document.querySelector(".my_name");
const loader_text = document.querySelector(".greeting_text");
let index = 0;

const greetings = ["Hello", "नमस्ते", "Bonjour", "Hola", "こんにちは", "سلام"];

const tl = gsap.timeline({ ease: "power2.inOut" });

gsap.set(hero_text, {
  clipPath: "inset(0 100% 0 0)",
});

gsap.set(hero_text_container, {
  y: window.innerHeight / 2 - hero_text_container.offsetHeight,
});

tl.from(star_img, {
  y: "100%",
  opacity: 0,
  duration: 1,
})
  .to(star_img, {
    x: -hero_text.offsetWidth,
    rotation: -90,
    duration: 1,
  })
  .to(star_img, {
    x: 0,
    y: 0,
    rotation: 0,
    duration: 1,
  })
  .to(
    hero_text,
    {
      clipPath: "inset(0 0% 0 0)",
      duration: 1,
    },
    "<"
  )
  .to(star_img, {
    height: 40,
    x: -20,
    y: -25,
    rotate: -180,
    duration: 1,
  })
  .to(hero_text_container, {
    y: 0,
    duration: 1,
  })
  .to(
    ".loader_screen",
    {
      background: "transparent",
      duartion: 1,
    },
    "<"
  )

  .from(".hero_text_img", {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      document.querySelector(".loader_screen")?.remove();
    },
  });

const track = document.querySelector(".works_track");

gsap.to(track, {
  x: () => -track.offsetWidth,
  ease: "none",
  scrollTrigger: {
    trigger: ".section-works",
    start: "top top",
    end: () => `+=${track.scrollWidth}`,
    scrub: 1,
    pin: true,
    anticipatePin: 1,
  },
});

function placeHeroTextImages() {
  const wrapper = document.querySelector(".my_name");
  if (!wrapper) return;

  const h1 = wrapper.querySelector("h1");
  const img1 = wrapper.querySelector(".hero_text1");
  const img2 = wrapper.querySelector(".hero_text2");

  if (!h1 || !img1 || !img2) return;

  const gap = 24; // spacing between h1 and images

  // positions of h1 inside wrapper
  const wrapRect = wrapper.getBoundingClientRect();
  const h1Rect = h1.getBoundingClientRect();

  const h1Left = h1Rect.left - wrapRect.left;
  const h1Right = h1Left + h1Rect.width;

  // ✅ vertical positioning (you can change these)
  img1.style.top = `0px`; // same as your design
  img2.style.bottom = `0px`; // same as your design
  img2.style.top = "auto";

  // ✅ place hero_text1 to the left of h1
  img1.style.left = `${h1Left - img1.offsetWidth + 10}px`;

  // ✅ place hero_text2 to the right of h1
  img2.style.left = `${h1Right + gap}px`;
}

// ✅ Run after everything is ready
window.addEventListener("load", placeHeroTextImages);
window.addEventListener("resize", placeHeroTextImages);

// ✅ Also recalc when images load (very important)
document.querySelectorAll(".hero_text_img").forEach((img) => {
  img.addEventListener("load", placeHeroTextImages);
});

// ✅ Also recalc when fonts load (optional but best)
if (document.fonts) {
  document.fonts.ready.then(placeHeroTextImages);
}
