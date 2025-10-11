

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


  // Timeline GSAP
  const tl = gsap.timeline({defaults: {duration: 0.6, ease: "power3.out"}});

  tl.to(".char", {opacity: 1, y: 0, stagger: 0.05})
    .from("#hero-text p", {opacity: 0, y: 20, duration: 1}, "0.3");

// COMPTEURS DE COMPÉTENCES AVEC VUE.JS ET GSAP
const app = Vue.createApp({
  data() {
    return {
      loading: true,
      message: "Chargement...",
      projects: [],
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
      this.programs.forEach((program, index) => { 
        gsap.to(program, {
          current: program.level,
          duration: 2,
          delay: index * 0.3,
          ease: "power1.out",
          onUpdate: () => {
            program.current = Math.round(program.current);
          }
        });
      });
    }
    
  },
  mounted() {
    // Fetch projets
    fetch("projects.json")
      .then(res => res.json())
      .then(data => {
        this.projects = data;
        this.loading = false;
      })
      .catch(err => {
        console.error(err);
        this.message = "Erreur lors du chargement des projets";
      });

    // GSAP ScrollTrigger pour programmes
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      trigger: "#skills-section",
      start: "top 90%",
      onEnter: () => this.startAnimation()
    });

    gsap.from("#skills-section img", {
      scrollTrigger: {
        trigger: "#skills-section",
        start: "top 90%",
      },
      opacity: 0,
      scale: 0.8,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out"
    });
  }
});

app.mount(".appli-vue");
