const stepButtons = document.querySelectorAll(".step-button");
const stepNumberEl = document.getElementById("stepNumber");
const stepTitleEl = document.getElementById("stepTitle");
const stepSubtitleEl = document.getElementById("stepSubtitle"); // peut être null
const stepBulletsEl = document.getElementById("stepBullets");

// mapping step -> flèche correspondante
const arrowsByStep = {
  1: document.querySelector(".arrow-1-2"),
  2: document.querySelector(".arrow-2-3"),
  3: document.querySelector(".arrow-3-4"),
  4: document.querySelector(".arrow-4-5"),
  // 5: aucune flèche
};

function updateStep(button) {
  // Visuel actif sur les boutons
  stepButtons.forEach((btn) => {
    const isActive = btn === button;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  // Données de l’onglet
  const step = parseInt(button.dataset.step, 10);
  const title = button.dataset.title;
  const subtitle = button.dataset.subtitle;
  const bullets = JSON.parse(button.dataset.bullets || "[]");

  // Mise à jour du contenu
  stepNumberEl.textContent = step.toString().padStart(2, "0");
  stepTitleEl.textContent = title;

  if (stepSubtitleEl) {
    stepSubtitleEl.textContent = subtitle || "";
  }

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

  // On enlève l'état actif de toutes les flèches
  Object.values(arrowsByStep).forEach((arrow) => {
    if (arrow) arrow.classList.remove("arrow--active");
  });

  // Si step ∈ {1,2,3,4} → on active la flèche correspondante
  if (step >= 1 && step <= 4) {
    const arrow = arrowsByStep[step];
    if (arrow) arrow.classList.add("arrow--active");
  }
}

// Écouteurs
stepButtons.forEach((button) => {
  button.addEventListener("click", () => updateStep(button));
});

const defaultActive = document.querySelector(".step-button.is-active");
if (defaultActive) {
  updateStep(defaultActive);
}
