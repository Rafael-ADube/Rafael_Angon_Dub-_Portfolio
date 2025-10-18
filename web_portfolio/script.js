// === GSAP + ScrollTrigger ===
gsap.registerPlugin(ScrollTrigger);

// === Animation titre Hero ===
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


// === Timeline GSAP pour le texte d’intro ===
const tl = gsap.timeline({ defaults: { duration: 0.6, ease: "power3.out" } });
tl.to(".char", { opacity: 1, y: 0, stagger: 0.05 })
  .from("#hero-text p", { opacity: 0, y: 20, duration: 1 }, "0.3");

// === Animations “À propos” ===
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

gsap.from("#apropos .col-md-6.text-center", {
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
gsap.to("#PORTFOLIO", 5, {
  delay: 1.5,
  scrambleText: {
    text: "bienvuenue dans mon portfolio",
    rightToLeft: true,
    chars: "lowercase"
  }
});
gsap.to("#PORTFOLIO", {
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
// === Application Vue ===// aide du tutorat pour l'idéé du pourcentage
const app = Vue.createApp({
  data() {
    return {
      loading: true,
      message: "Chargement...",
      projects: [],
      programs: [ // nom des des programmes avec niveau et image associée
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
  methods: {
    startAnimation() {
      // Évite de relancer si déjà à niveau
      this.programs.forEach((program, index) => {
        if (program.current >= program.level) return;
        gsap.to(program, {
          current: program.level,
          duration: 2,
          delay: index * 0.2,
          ease: "power1.out",
          onUpdate: () => {
            // arrondir pour affichage propre
            program.current = Math.round(program.current);
          }
        });
      });
    },// premet d'ouvrir les projets dans un nouvel onglet
    openProject(link) {
      window.open(link, "_blank");
    }
  },
  mounted() {
    // Charger projets
    fetch("projects.json")
      .then(res => res.json())
      .then(data => {
        this.projects = data;
        this.loading = false;

        // === Créer triggers APRES que Vue ait inséré le contenu === // demander à chat GPT parce que sinon ça marche pas l' animation ce déclanchait  des le début
        this.$nextTick(() => {
          // === Animation compétences ===
          ScrollTrigger.create({
            trigger: "#skills-section",
            start: "top bottom",
            onEnter: () => this.startAnimation()
          });

          // Animation images compétences (animation directe sur les images)
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

          // recalcul final pour être sûr
          ScrollTrigger.refresh();
        });
      })
      .catch(err => {
        console.error(err);
        this.message = "Erreur lors du chargement des projets";
      });

    
  
  }
});
// === Montage de l’application Vue ===
app.mount(".appli-vue");

