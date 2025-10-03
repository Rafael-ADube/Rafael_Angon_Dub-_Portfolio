// Activer ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animation sur chaque projet
document.querySelectorAll(".row.align-items-center").forEach((section, i) => {
  gsap.from(section, {
    x: i % 2 === 0 ? -150 : 150, // alterne gauche/droite
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