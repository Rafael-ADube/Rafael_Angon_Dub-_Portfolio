

// Activer ScrollTrigger



gsap.registerPlugin(ScrollTrigger);

// Animation sur chaque projet
document.querySelectorAll(".row.align-items-center").forEach((section, i) => {
  let fromX;

  if (i % 2 === 0) {
    fromX = -150; // sections paires → partent de la gauche
  } else {
    fromX = 150;  // sections impaires → partent de la droite
  }

  gsap.from(section, {
    x: fromX,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });
});
  gsap.from(".hero h1", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top 80%",
    },
    opacity: 0,
    y: 80,
    duration: 1.2,
    ease: "power3.out",
    onComplete: () => {
      // Effet néon pulsant en boucle
      gsap.to(".hero h1", {
        textShadow: "0 0 20px #00ff88, 0 0 40px #00ff88, 0 0 80px #00ff88",
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "sine.inOut"
      });
    }
  });
// TEST ANIMATION LE PROTFOLIO
  // Animation du paragraphe
  gsap.from(".hero p", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top 80%",
    },
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.4,
    ease: "power2.out"
  });
    const h1 = document.querySelector("#hero-text h1");
  const letters = h1.textContent.split("");
  h1.textContent = "";
  letters.forEach(char => {
    const span = document.createElement("span");
    span.textContent = char;
    span.classList.add("char");
    h1.appendChild(span);
  });

  // Timeline GSAP
  const tl = gsap.timeline({defaults: {duration: 0.6, ease: "power3.out"}});

  tl.to(".char", {opacity: 1, y: 0, stagger: 0.05})
    .from("#hero-text p", {opacity: 0, y: 20, duration: 1}, "-=0.3");

// COMPTEURS DE COMPÉTENCES AVEC VUE.JS ET GSAP
const app = Vue.createApp({
  data() {
    return {
      programs: [
        { name: "DaVinci", level: 85, current: 0, image: "image/DaVinci_Resolve_Studio.png" },
        { name: "Max", level: 70, current: 0, image: "image/Logo_Max_8_software.jpg" },
        { name: "Photoshop", level: 90, current: 0, image: "image/Adobe_Photoshop_CC_icon.svg.png" },
        { name: "Illustrator", level: 85, current: 0, image: "image/Adobe_Illustrator_CC_icon.svg.png" },
        { name: "Maya", level: 75, current: 0, image: "image/maya.png" },
        { name: "Reaper", level: 80, current: 0, image: "image/reaper.jpg" },
        { name: "WordPress", level: 65, current: 0, image: "image/wordpress.png" },
        { name: "Figma", level: 78, current: 0, image: "image/figma.png" }
      ]
    }
  },
  methods: {
    startAnimation() {
      this.programs.forEach(prog => {
        prog.current = 0;
        const step = Math.ceil(prog.level / 50); // vitesse (plus petit = plus lent)
        const interval = setInterval(() => {
          if (prog.current < prog.level) {
            prog.current += step;
            if (prog.current > prog.level) prog.current = prog.level;
          } else {
            clearInterval(interval);
          }
        }, 40); // intervalle en ms
      });
    }
  },
  mounted() {
    // Démarre l'animation au chargement de la page
    this.startAnimation();
  }
});

app.mount('#skills-section');