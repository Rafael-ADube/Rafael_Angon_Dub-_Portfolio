// === Plugins ===
gsap.registerPlugin(ScrollTrigger);

// === Hero (page accueil uniquement) ===
document.querySelectorAll(".hero h1").forEach(titre => {
  gsap.from(titre, {
    scrollTrigger: {
      trigger: titre.parentElement,
      start: "top 80%",
    },
    opacity: 0,
    y: 80,
    duration: 1.2,
    ease: "power3.out",
    onComplete: () => {
      gsap.to(titre, {
        textShadow: "0 0 20px #00ff88, 0 0 40px #00ff88, 0 0 80px #00ff88",
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "sine.inOut"
      });
    }
  });
});

// === Section À propos (page accueil uniquement) ===
if (document.querySelector("#apropos")) {
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
}

// === ScrambleText (page accueil uniquement) ===
if (document.querySelector("#PORTFOLIO")) {
  gsap.to("#PORTFOLIO", {
    duration: 5,
    delay: 0.5,
    opacity: 1,
    scrambleText: {
      text: "Bienvenue dans mon portfolio !",
      rightToLeft: true,
      chars: "lowercase"
    },
    ease: "power2.out"
  });
}

// === Vue App ===
const app = Vue.createApp({
  data() {
    return {
      loading: true,
      message: "Chargement...",
       projects: [],  // ← ajouter
    project: null, // ← ajouter
      programs: [
        { name: "Html", level: 85, current: 0 },
        { name: "Css", level: 70, current: 0 },
        { name: "Javascript", level: 50, current: 0 },
        { name: "C++", level: 20, current: 0 },
        { name: "C#", level: 35, current: 0 },
      ],
    
    };
  },
  methods: {
    startAnimation() {
      this.programs.forEach((program, index) => {
        gsap.to(program, {
          current: program.level,
          duration: 2,
          delay: index * 0.2,
          ease: "power1.out",
          onUpdate: () => (program.current = Math.round(program.current))
        });
      });
    },
   
  },
  mounted() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("proj-id"));

    fetch("projects.json")
      .then(res => res.json())
      .then(data => {
        this.projects = data;
        this.project = id ? this.projects.find(p => p.id === id) : null;
        this.loading = false;

        // === Page accueil : animations compétences & projets ===
        if (!id) {
          this.$nextTick(() => {
            if (document.querySelector("#skills-section")) {
              ScrollTrigger.create({
                trigger: "#skills-section",
                start: "top bottom",
                onEnter: () => this.startAnimation()
              });
            }

            if (document.querySelectorAll(".project-card").length) {
              gsap.utils.toArray(".project-card").forEach((card, index) => {
                gsap.from(card, {
                  scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                  },
                  opacity: 0,
                  y: 50,
                  duration: 1,
                  ease: "power3.out",
                  delay: index * 0.1
                });
              });
            }

            // Rafraîchir ScrollTrigger après le chargement complet
            window.addEventListener("load", () => ScrollTrigger.refresh());
          });
        }
      })
      .catch(err => {
        console.error(err);
        this.message = "Erreur lors du chargement des projets";
      });
  }
});

// === Monter Vue ===
app.mount("#appli-vue");
