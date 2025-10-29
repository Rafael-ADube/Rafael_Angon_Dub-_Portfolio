// === Plugins ===
gsap.registerPlugin(ScrollTrigger);


// Animation du titre hero 
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
    gsap.to(".hero h1", {
      textShadow: "0 0 20px #00ff88, 0 0 40px #00ff88, 0 0 80px #00ff88",
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "sine.inOut"
    });
  }
});


// === Animation section À propos ===
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


//Animation texte Portfolio 
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

const app = Vue.createApp({
  data() {
    return {
      loading: true,
      message: "Chargement...",//montre le message de chargement si y il a un problème
       projects: [],  // charge les projets depuis le fichier JSON
    project: null, // sélection du projet à afficher
      programs: [  // montre les compéteances
        { name: "Html", level: 50, current: 0 },//level montre le niveau  dans chaque compétence
        { name: "Css", level: 40, current: 0 }, //cuurrent montre le niveau de chaque des zero à level
        { name: "Javascript", level: 30, current: 0 }, //nom montre le nom des compétence
      
      ],
    
    };
  },
  methods: {
    startAnimation() {
      this.programs.forEach((program, index) => {//parcourt chaque compétence
        gsap.to(program, {
          current: program.level, //niveau final de la compétence
          duration: 2,//durée de l'animation
          delay: index * 0.2, //délai entre chaque animation
          ease: "power1.out",//ease pour une animation fluide
          onUpdate: () => (program.current = Math.round(program.current))//
        });
      });
    },
   
  },
  mounted() {
    const params = new URLSearchParams(window.location.search);// code trouver sur chat // Récupère les paramètres de l'URL sous forme d'objet pour pouvoir accéder facilement
    const id = parseInt(params.get("proj-id"));// Récupérer l'ID du projet depuis l'URL 

    fetch("projects.json")
      .then(res => res.json())
      .then(data => {
        this.projects = data;// tous les donnée de la liste projet
        this.project = id ? this.projects.find(p => p.id === id) : null;//trouve le bon id
        this.loading = false;

         {
          this.$nextTick(() => { // Attendre le rendu du DOM"// trouver sur chat gpt
            if (document.querySelector("#skills-section")) {//vérifie si la section des compétences est présente
              ScrollTrigger.create({
                trigger: "#skills-section",
                start: "top bottom",
                onEnter: () => this.startAnimation()
              });
            }
            if (document.querySelectorAll(".project-card").length) {//vérifie si des cartes de projet sont présentes
              gsap.utils.toArray(".project-card").forEach((card, index) => {
                gsap.from(card, {//anime chaque carte de projet
                  scrollTrigger: {//déclencheur de défilement pour l'animation
                    trigger: card,//élément déclencheur
                    start: "top 80%",//position de départ de l'animation
                    toggleActions: "play none none reverse",//actions l'animation en quand ont est decu est quand on retourne
                  },
                  opacity: 0,
                  y: 50,
                  duration: 1,
                  ease: "power3.out",
                  delay: index * 0.1
                });
              });
            }

           
       (ScrollTrigger.refresh());//rafraîchir les déclencheurs de défilement
          });
        }
      })
      .catch(err => {
        console.error(err);
        this.message = "Erreur lors du chargement des projets";
      });
  }
});

// 
app.mount("#appli-vue");
