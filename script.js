// Smooth scroll for nav links
document.querySelectorAll("a[href^='#']").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(link.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Fade elements while scrolling (optional)
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
});

document.querySelectorAll(".card, .hero, .section").forEach(el => {
  observer.observe(el);
});
/* ----------------------------
      NAVBAR SHRINK ON SCROLL
----------------------------- */
const navbar = document.querySelector(".nav");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("nav-small");
    } else {
        navbar.classList.remove("nav-small");
    }
});

/* ----------------------------
      SMOOTH SCROLLING
----------------------------- */
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener("click", function (e) {
        if (this.hash !== "") {
            e.preventDefault();
            const target = document.querySelector(this.hash);
            target.scrollIntoView({ behavior: "smooth" });

            // Close mobile menu after clicking
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }
    });
});

/* ----------------------------
   ACTIVE NAV LINK HIGHLIGHT
----------------------------- */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

function activateLink() {
    let scrollPos = window.scrollY + 100;

    sections.forEach(sec => {
        if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
            navLinks.forEach(link => link.classList.remove("active"));
            document.querySelector(`a[href="#${sec.id}"]`)?.classList.add("active");
        }
    });
}

window.addEventListener("scroll", activateLink);

/* ----------------------------
      HAMBURGER MENU
----------------------------- */
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

window.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
    }
});

/* -------------------------------------------------
      PROJECT MODAL POPUP
-------------------------------------------------- */
const modal = document.getElementById("projectModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalButtons = document.getElementById("modalButtons");
const modalClose = document.querySelector(".modal-close");

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach(card => {
    card.addEventListener("click", () => {
        let imgSrc = card.querySelector("img").src;
        let title = card.querySelector("h3").innerText;
        let desc = card.querySelector("p").innerHTML;

        modalImg.src = imgSrc;
        modalTitle.innerText = title;
        modalDesc.innerHTML = desc;
        modalButtons.innerHTML = `
            <a href="https://github.com/PiyushBodhe23" target="_blank">GitHub</a>
        `;

        modal.style.display = "flex";
    });
});

modalClose.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
});

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal.style.display = "none";
});

/* -------------------------------------------------
    EMAILJS FORM HANDLING (Already in your HTML)
-------------------------------------------------- */

document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const status = document.getElementById("form-status");
    status.innerText = "Sending...";
    status.style.color = "#ff8a00";

    emailjs.send("service_kr8w5kl", "template_kypr6vn", {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
    })
    .then(() => {
        status.innerText = "✔ Message sent successfully!";
        status.style.color = "#00ff99";
        document.getElementById("contactForm").reset();

        setTimeout(() => { status.innerText = ""; }, 3000);
    })
    .catch(() => {
        status.innerText = "❌ Failed to send message.";
        status.style.color = "#ff4444";

        setTimeout(() => { status.innerText = ""; }, 3000);
    });
});
