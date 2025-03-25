gsap.fromTo(".animated-title span", 
    { opacity: 0, y: 50 }, 
    { opacity: 1, y: 0, stagger: 0.1, duration: 1.5, ease: "power2.out" }
);

let lastScrollY = 0;
let fullscreenText = document.querySelector(".fullscreen-text");
let imageSection = document.querySelector(".image-cards-section");
let cards = document.querySelectorAll(".card");
let isHidden = false;

window.addEventListener("scroll", function () {
    let scrollY = window.scrollY;

    if (scrollY > 200 && !isHidden) {
        gsap.to(fullscreenText, { opacity: 0, duration: 1, onComplete: () => fullscreenText.style.display = "none" });
        gsap.to(imageSection, { opacity: 1, duration: 1 });
        gsap.fromTo(cards, 
            { opacity: 0, y: 50 }, 
            { opacity: 1, y: 0, stagger: 0.3, duration: 1.5, ease: "power2.out" }
        );
        isHidden = true;
    } else if (scrollY < lastScrollY && scrollY < 100 && isHidden) {
        fullscreenText.style.display = "flex";
        gsap.to(fullscreenText, { opacity: 1, duration: 1 });
        isHidden = false;
    }

    lastScrollY = scrollY;
});

/* Card Scroll Animation */
gsap.utils.toArray(".card").forEach((card, index) => {
    gsap.fromTo(card, 
        { opacity: 0, y: 100, scale: 0.8 }, 
        { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 1.2, 
            delay: index * 0.2, 
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 80%", 
                toggleActions: "play none none reverse"
            }
        }
    );
});

/* 3D Mouse Tilt Effect */
document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
        let rect = card.getBoundingClientRect();
        let x = (e.clientX - rect.left) / rect.width - 0.5;
        let y = (e.clientY - rect.top) / rect.height - 0.5;
        
        gsap.to(card, {
            rotationY: x * 10,
            rotationX: y * -10,
            ease: "power1.out",
            duration: 0.3
        });
    });

    card.addEventListener("mouseleave", () => {
        gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.5, ease: "power1.out" });
    });
});
