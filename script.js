const revealButtons = document.querySelectorAll(".reveal-btn");
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

const modal = document.getElementById("monthModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const closeModalBtn = document.getElementById("closeModal");

const heartContainer = document.getElementById("heartContainer");

let musicPlaying = false;

revealButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.target;
    const target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    target.classList.add("open");
    button.disabled = true;
    button.textContent = "Parte descubierta ✓";

    setTimeout(() => {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 350);
  });
});

musicBtn.addEventListener("click", async () => {
  try {
    if (musicPlaying) {
      music.pause();
      musicPlaying = false;
      musicBtn.classList.remove("active");
      musicBtn.setAttribute("aria-label", "Activar música");
    } else {
      await music.play();
      musicPlaying = true;
      musicBtn.classList.add("active");
      musicBtn.setAttribute("aria-label", "Pausar música");
    }
  } catch (error) {
    alert("Agrega un archivo llamado musica.mp3 dentro de la carpeta assets.");
  }
});

document.querySelectorAll(".month-card").forEach((card) => {
  card.addEventListener("click", () => {
    modalTitle.textContent = card.dataset.title;
    modalText.textContent = card.dataset.text;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

closeModalBtn.addEventListener("click", closeModal);
modal.querySelector(".modal-backdrop").addEventListener("click", closeModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

/* CORAZONES QUE SUBEN DESDE LA PARTE INFERIOR */
function createFloatingHeart() {
  if (!heartContainer) {
    return;
  }

  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = Math.random() > 0.35 ? "♥" : "♡";

  const size = 14 + Math.random() * 24;
  const duration = 7 + Math.random() * 6;
  const left = Math.random() * 100;

  heart.style.left = `${left}%`;
  heart.style.fontSize = `${size}px`;
  heart.style.animationDuration = `${duration}s`;
  heart.style.opacity = `${0.45 + Math.random() * 0.45}`;

  heartContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

/* Crea varios corazones al abrir la página */
for (let i = 0; i < 12; i += 1) {
  setTimeout(createFloatingHeart, i * 260);
}

/* Mantiene el efecto activo */
setInterval(createFloatingHeart, 650);


/* CONTADOR DESDE EL 25 DE DICIEMBRE DE 2025 */
const relationshipStart = new Date(2025, 11, 25, 0, 0, 0);

const counterDays = document.getElementById("counterDays");
const counterHours = document.getElementById("counterHours");
const counterMinutes = document.getElementById("counterMinutes");
const counterSeconds = document.getElementById("counterSeconds");

function updateLoveCounter() {
  const now = new Date();
  let difference = now.getTime() - relationshipStart.getTime();

  if (difference < 0) {
    difference = 0;
  }

  const totalSeconds = Math.floor(difference / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (counterDays) counterDays.textContent = days.toLocaleString("es-SV");
  if (counterHours) counterHours.textContent = String(hours).padStart(2, "0");
  if (counterMinutes) counterMinutes.textContent = String(minutes).padStart(2, "0");
  if (counterSeconds) counterSeconds.textContent = String(seconds).padStart(2, "0");
}

updateLoveCounter();
setInterval(updateLoveCounter, 1000);