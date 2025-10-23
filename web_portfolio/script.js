// ScrollTrigger 
gsap.registerPlugin(ScrollTrigger);

// Animation titre Hero 
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
    // Effet néon pulsant
    gsap.to(".hero h1", {
      textShadow: "0 0 20px #00ff88, 0 0 40px #00ff88, 0 0 80px #00ff88",
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "sine.inOut"
    });
  }
});

//le texte d’intro 
const tl = gsap.timeline({ defaults: { duration: 0.6, ease: "power3.out" } });
tl.to(".char", { opacity: 1, y: 0, stagger: 0.05 })
  .from("#hero-text p", { opacity: 0, y: 20, duration: 1 }, "0.3");

//Animations “À propos” 
gsap.from("#apropos .col-md-6:not(.text-center)", {
  scrollTrigger: {
    trigger: "#apropos",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  x: -150,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
});

gsap.from("#apropos .col-md-6.text-center", { //animation lorsque je defile dans le a propos ma photo apparait
  scrollTrigger: {
    trigger: "#apropos",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  x: 150,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  delay: 0.2
});

// === Scramble Text 
gsap.to("#PORTFOLIO", { //animation lorsque je defile dans le a propos ma photo apparait
  duration: 5,
  delay: 1.5,
  opacity: 1,
  scrambleText: {
    text: "Bienvenue dans mon portfolio !",
    rightToLeft: true,
    chars: "lowercase"
  },
  ease: "power2.out"
});

// === Application Vue ===
const app = Vue.createApp({
  data() {
    return {
      loading: true,
      message: "Chargement...",
      projects: [],//va chercher projects.json et tous en l'intérieur
      programs: [//tableau dans lequel les information apparait apres dans mon vue pourcentage
        { name: "DaVinci", level: 85, current: 0, image: "image/DaVinci_Resolve_Studio.png" },
        { name: "Max", level: 70, current: 0, image: "image/Logo_Max_8_software.jpg" },
        { name: "Photoshop", level: 90, current: 0, image: "image/Adobe_Photoshop_CC_icon.svg.png" },
        { name: "Illustrator", level: 85, current: 0, image: "image/Adobe_Illustrator_CC_icon.svg.png" },
        { name: "Maya", level: 75, current: 0, image: "image/maya.png" },
        { name: "Reaper", level: 80, current: 0, image: "image/reaper.jpg" },
        { name: "WordPress", level: 65, current: 0, image: "image/wordpress.png" },
        { name: "Figma", level: 78, current: 0, image: "image/figma.png" }
      ]
    };
  },
  methods: {//animation du pourcentage des compétence
    startAnimation() {
      this.programs.forEach((program, index) => {
        if (program.current >= program.level) return;
        gsap.to(program, {
          current: program.level,
          duration: 2,
          delay: index * 0.2,
          ease: "power1.out",
          onUpdate: () => {
            program.current = Math.round(program.current);
          }
        });
      });
    },
    openProject(link) {//va chercher dans .json
      window.open(link, "_blank");//a chaque fois que j'ouvre un projet ca ouvre dans une nouvelle page
    }
  },
  mounted() {
    fetch("projects.json") // va chercher les donnée dams projet.json
      .then(res => res.json())
      .then(data => {
        this.projects = data;
        this.loading = false;

        this.$nextTick(() => { // j'ai donc utiliser cette méthode encore une fois pour faire affiche mon compossant vue apres le code 
          // === ScrollTrigger pour compétences ===
          ScrollTrigger.create({
            trigger: "#skills-section",
            start: "top bottom",
            onEnter: () => this.startAnimation()
          });
this.$nextTick(() => {//chatgpt ma aider pour utiliser this.$nextTick je suis ensuite aller voir sur w3school sa ma permis de comprendre que ca permet de faire du apres le chargement de la page 
  // Réinitialiser les carrousels Bootstrap après rendu Vue
  document.querySelectorAll('.carousel').forEach(el => {
    new bootstrap.Carousel(el, {
      interval: 8000, // 
      ride: 'carousel',
      pause: false, 
      wrap: true
    });
  });
});

          // === Animation images compétences ===
          gsap.from("#skills-section img", {
            scrollTrigger: {
              trigger: "#skills-section",
              start: "top 60%",
            },
            opacity: 0,
            scale: 0.8,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out"
          });
          

          // Délai pour laisser le DOM et images se stabiliser
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 300);
        });
      })
      .catch(err => {
        console.error(err);
        this.message = "Erreur lors du chargement des projets";
      });
  }
});

// === Monter l’app Vue une fois tout prêt ===
window.addEventListener("load", () => {
  app.mount(".appli-vue");
});

