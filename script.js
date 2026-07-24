document.addEventListener("DOMContentLoaded", () => {
  const revealButtons = document.querySelectorAll(".reveal-btn");
  const music = document.getElementById("bgMusic");
  const musicBtn = document.getElementById("musicBtn");

  const modal = document.getElementById("monthModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalText = document.getElementById("modalText");
  const closeModalBtn = document.getElementById("closeModal");

  const heartContainer = document.getElementById("heartContainer");

  let musicPlaying = false;

  /* ABRIR CADA PARTE DE LA HISTORIA */
  revealButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const targetId = button.dataset.target;
      const targetSection = document.getElementById(targetId);

      if (!targetSection) {
        console.warn(`No se encontró la sección: ${targetId}`);
        return;
      }

      targetSection.classList.add("open");
      button.disabled = true;
      button.textContent = "Parte descubierta ✓";

      setTimeout(() => {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 350);

      /* La música inicia al tocar “Comenzar nuestra historia” */
      if (targetId === "parte1" && music && !musicPlaying) {
        try {
          await music.play();
          musicPlaying = true;

          if (musicBtn) {
            musicBtn.classList.add("active");
            musicBtn.textContent = "❚❚";
            musicBtn.setAttribute("aria-label", "Pausar música");
          }
        } catch (error) {
          console.log("El navegador bloqueó la reproducción de la música.", error);
        }
      }
    });
  });

  /* BOTÓN DE MÚSICA */
  if (musicBtn && music) {
    musicBtn.addEventListener("click", async () => {
      try {
        if (musicPlaying) {
          music.pause();
          musicPlaying = false;
          musicBtn.classList.remove("active");
          musicBtn.textContent = "♪";
          musicBtn.setAttribute("aria-label", "Activar música");
        } else {
          await music.play();
          musicPlaying = true;
          musicBtn.classList.add("active");
          musicBtn.textContent = "❚❚";
          musicBtn.setAttribute("aria-label", "Pausar música");
        }
      } catch (error) {
        alert(
          "No se pudo reproducir la música. Revisa que el archivo se llame musica.mp3 y que la ruta del audio sea correcta."
        );
        console.error("Error al reproducir la música:", error);
      }
    });

    music.addEventListener("play", () => {
      musicPlaying = true;
      musicBtn.classList.add("active");
      musicBtn.textContent = "❚❚";
    });

    music.addEventListener("pause", () => {
      musicPlaying = false;
      musicBtn.classList.remove("active");
      musicBtn.textContent = "♪";
    });

    music.addEventListener("error", () => {
      console.error(
        "No se pudo cargar musica.mp3. Revisa el nombre y la ubicación del archivo."
      );
    });
  }

  /* VENTANAS DE LOS MESES */
  document.querySelectorAll(".month-card").forEach((card) => {
    card.addEventListener("click", () => {
      if (!modal || !modalTitle || !modalText) {
        return;
      }

      modalTitle.textContent = card.dataset.title || "";
      modalText.textContent = card.dataset.text || "";
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  function closeMonthModal() {
    if (!modal) {
      return;
    }

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeMonthModal);
  }

  if (modal) {
    const modalBackdrop = modal.querySelector(".modal-backdrop");

    if (modalBackdrop) {
      modalBackdrop.addEventListener("click", closeMonthModal);
    }
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMonthModal();
    }
  });

  /* CORAZONES FLOTANTES */
  function createFloatingHeart() {
    if (!heartContainer) {
      return;
    }

    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = Math.random() > 0.35 ? "♥" : "♡";

    const size = 14 + Math.random() * 24;
    const duration = 7 + Math.random() * 6;
    const horizontalPosition = Math.random() * 100;

    heart.style.left = `${horizontalPosition}%`;
    heart.style.fontSize = `${size}px`;
    heart.style.animationDuration = `${duration}s`;
    heart.style.opacity = `${0.45 + Math.random() * 0.45}`;

    heartContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, duration * 1000);
  }

  if (heartContainer) {
    for (let i = 0; i < 12; i += 1) {
      setTimeout(createFloatingHeart, i * 260);
    }

    setInterval(createFloatingHeart, 650);
  }

  /* CONTADOR DESDE EL 25 DE DICIEMBRE DE 2025 */
  const loveStartDate = new Date(2025, 11, 25, 0, 0, 0);

  const counterDays = document.getElementById("counterDays");
  const counterHours = document.getElementById("counterHours");
  const counterMinutes = document.getElementById("counterMinutes");
  const counterSeconds = document.getElementById("counterSeconds");

  function updateLoveCounter() {
    const now = new Date();
    let elapsedMilliseconds = now.getTime() - loveStartDate.getTime();

    if (elapsedMilliseconds < 0) {
      elapsedMilliseconds = 0;
    }

    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    const days = Math.floor(elapsedSeconds / 86400);
    const hours = Math.floor((elapsedSeconds % 86400) / 3600);
    const minutes = Math.floor((elapsedSeconds % 3600) / 60);
    const seconds = elapsedSeconds % 60;

    if (counterDays) {
      counterDays.textContent = days.toLocaleString("es-SV");
    }

    if (counterHours) {
      counterHours.textContent = String(hours).padStart(2, "0");
    }

    if (counterMinutes) {
      counterMinutes.textContent = String(minutes).padStart(2, "0");
    }

    if (counterSeconds) {
      counterSeconds.textContent = String(seconds).padStart(2, "0");
    }
  }

  updateLoveCounter();
  setInterval(updateLoveCounter, 1000);
});
