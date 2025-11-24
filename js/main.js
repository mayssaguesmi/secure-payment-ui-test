const stepButtons = document.querySelectorAll(".step-button");
const stepNumberEl = document.getElementById("stepNumber");
const stepTitleEl = document.getElementById("stepTitle");
const stepSubtitleEl = document.getElementById("stepSubtitle");
const stepBulletsEl = document.getElementById("stepBullets");

function updateStep(button) {
  // Visuel actif
  stepButtons.forEach((btn) => {
    const isActive = btn === button;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  // Données de l’onglet
  const step = button.dataset.step;
  const title = button.dataset.title;
  const subtitle = button.dataset.subtitle;
  const bullets = JSON.parse(button.dataset.bullets || "[]");

  // Mise à jour du contenu
  stepNumberEl.textContent = step.toString().padStart(2, "0");
  stepTitleEl.textContent = title;
  stepSubtitleEl.textContent = subtitle;

  // Liste
  stepBulletsEl.innerHTML = "";
  bullets.forEach((text) => {
    const li = document.createElement("li");
    const icon = document.createElement("span");
    icon.className = "step-bullet-icon";
    icon.textContent = "✱";

    const span = document.createElement("span");
    span.textContent = text;

    li.appendChild(icon);
    li.appendChild(span);
    stepBulletsEl.appendChild(li);
  });
}

// Écouteurs
stepButtons.forEach((button) => {
  button.addEventListener("click", () => updateStep(button));
});
