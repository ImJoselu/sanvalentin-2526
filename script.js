const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const happyPhoto = document.getElementById("happyPhoto");
const sadState = document.getElementById("sadState");
const retryBtn = document.getElementById("retryBtn");


// Posición NO
let x = window.innerWidth / 2;
let y = window.innerHeight / 2 + 80;
let targetX = x;
let targetY = y;

// 👉 SÍ
function acceptLove() {
  document.body.classList.remove("sad");
  message.textContent = "💖 ¡Sabía que dirías que querrias! 😍";
  happyPhoto.classList.remove("hidden");
  sadState.classList.add("hidden");
  noBtn.style.display = "none";
  yesBtn.style.display = "none";
}

yesBtn.addEventListener("click", acceptLove);

// 😈 Movimiento suave del NO
document.addEventListener("mousemove", (e) => {
  const rect = noBtn.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const dx = cx - e.clientX;
  const dy = cy - e.clientY;
  const dist = Math.hypot(dx, dy);

  if (dist < 120) {
    const angle = Math.atan2(dy, dx);
    const escape = 160;

    targetX = cx + Math.cos(angle) * escape;
    targetY = cy + Math.sin(angle) * escape;

    const pad = 20;
    targetX = Math.max(pad, Math.min(window.innerWidth - rect.width - pad, targetX));
    targetY = Math.max(pad, Math.min(window.innerHeight - rect.height - pad, targetY));
  }
});

// Animación
function animate() {
  x += (targetX - x) * 0.1;
  y += (targetY - y) * 0.1;
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
  requestAnimationFrame(animate);
}
animate();

// 💔 Click en NO
noBtn.addEventListener("click", () => {
  document.body.classList.add("sad");
  message.textContent = "";
  happyPhoto.classList.add("hidden");
  sadState.classList.remove("hidden");
  yesBtn.style.display = "none";
});

// 😅 Me había equivocado
retryBtn.addEventListener("click", acceptLove);
