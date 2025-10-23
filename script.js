// 🎀 All cheer messages
const cheers = {
  "tolani": "Our sunshine and safe place in one — you pour love into everyone and still manage to sparkle. The world feels softer with your kind of energy 💖",
  "ify": "You are grace in motion — gentle yet unstoppable. Even when things feel heavy, your heart still knows how to shine.",
  "blessing": "Your name says it all — you walk into rooms and leave peace behind. Never forget that you’re a blessing just by being you.",
  "britney": "You radiate quiet confidence, lifting others without a word. Keep being the calm and light that you are.",
  "ice queen": "Even ice glows when it catches the sun — your strength is beautiful, your calm is powerful, and your softness is rare.",
  "nyomi": "You bloom differently — not loudly, but beautifully. Keep growing at your own pace, and the world will catch up to your rhythm.",
  "mimi": "You carry a kind of joy that makes life feel lighter. Don’t dim it, no matter who forgets to say thank you.",
  "stella ✨": "You’re the sparkle in every dull day — never forget that your laughter is a melody this world needs.",
  "stella": "You’re made of resilience and glow — you may bend, but you never break, and that’s your quiet magic.",
  "ejiroghene": "Your presence is warmth, your words are comfort. You don’t just shine — you soothe.",
  "proudly feminist": "You remind every girl that her voice matters and her dreams are valid. Keep standing tall — you inspire strength in softness.",
  "oyinlola": "You sweeten every space you’re in — your kindness lingers like honey, and your smile heals.",
  "eniola": "You may not always see it, but you’re deeply loved and endlessly capable — joy follows wherever you go.",
  "tinu": "You’re a quiet storm — steady, beautiful, and full of depth. There’s power in your calm.",
  "lady ann": "Grace and strength wrapped in elegance. You’re proof that soft doesn’t mean weak — it means powerful with peace.",
  "ayo": "Your name means joy for a reason — you bring it effortlessly. You are the sunshine after every rain.",
  "oluwabukola": "You’re layered with peace, purpose, and promise. Every challenge is just another chance to bloom brighter.",
  "missbalogun": "Your energy is rare — full of ambition and warmth. Keep showing the world that gentleness and greatness can coexist.",
  "moxury": "You’re bold and beautiful — your confidence lights up everyone around you. Keep being your authentic, fearless self.",
  "gina": "You shine in ways that words can’t capture — soft yet strong, calm yet fierce. You’re everything in perfect balance.",
  "dera": "You bring quiet healing to those who need it most — your presence alone says, 'everything will be okay.'",
  "oma": "You have a heart that hugs the world. Even when tired, your spirit still finds ways to love.",
  "orah_b": "You glow differently — peaceful, calm, and magnetic. The world feels safe when you smile.",
  "tadtifarta": "You’re art in human form — vibrant, rare, and unapologetically yourself. Never let anyone dull that brilliance."
  };
  
  const btn = document.getElementById("openBtn");
  const nameInput = document.getElementById("nameInput");
  const messageBox = document.getElementById("messageBox");
  const messageText = document.getElementById("messageText");
  const messageFrom = document.getElementById("messageFrom");
  const confettiCanvas = document.getElementById("confetti");
  const ctx = confettiCanvas.getContext("2d");
  const sendPrompt = document.getElementById("sendPrompt");
  const addForm = document.getElementById("addMessageForm");
  const recipientSelect = document.getElementById("recipientSelect");
  const messageInput = document.getElementById("messageInput");
  const sendBtn = document.getElementById("sendBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  const extraMessages = document.getElementById("extraMessages");
  
  // Fill dropdown with all names
  Object.keys(cheers).forEach(name => {
  const opt = document.createElement("option");
  opt.value = name;
  opt.textContent = name;
  recipientSelect.appendChild(opt);
  });
  
  btn.addEventListener("click", () => {
  const nameEntered = nameInput.value.trim();
  if (!nameEntered) return;
  
  // Case-insensitive search fix ✅
  const realKey = Object.keys(cheers).find(
  key => key.toLowerCase() === nameEntered.toLowerCase()
  );
  
  if (realKey) {
  messageText.textContent = cheers[realKey];
  messageFrom.textContent = `💌 — ${realKey}`;
  messageBox.classList.remove("hidden");
  sendPrompt.classList.remove("hidden");
  
  showAnonymousCheers(realKey);
  throwConfetti();
  } else {
  messageBox.classList.add("hidden");
  alert("Name not found in the jar 💭");
  }
  });
  
  document.getElementById("addMessageBtn").addEventListener("click", () => {
  addForm.classList.remove("hidden");
  });
  cancelBtn.addEventListener("click", () => {
  addForm.classList.add("hidden");
  });
  sendBtn.addEventListener("click", () => {
  const to = recipientSelect.value;
  const message = messageInput.value.trim();
  if (!message) return alert("Please type a message!");
  saveMessage(to, message);
  messageInput.value = "";
  addForm.classList.add("hidden");
  alert("💗 Message sent with love!");
  });
  
  function saveMessage(to, message) {
  const stored = JSON.parse(localStorage.getItem("cheerMessages") || "{}");
  const key = to.toLowerCase(); // make sure saving is consistent
  if (!stored[key]) stored[key] = [];
  stored[key].push(message);
  localStorage.setItem("cheerMessages", JSON.stringify(stored));
  }
  
  function showAnonymousCheers(name) {
  const stored = JSON.parse(localStorage.getItem("cheerMessages") || "{}");
  const userMessages = stored[name.toLowerCase()] || [];
  
  extraMessages.innerHTML = "";
  
  if (userMessages.length > 0) {
  const revealBox = document.createElement("div");
  revealBox.classList.add("reveal-box");
  revealBox.innerHTML = `
  <p>You have ${userMessages.length} secret cheer${userMessages.length > 1 ? "s" : ""} 💌</p>
  <button id="revealBtn">Reveal them</button>
  `;
  extraMessages.appendChild(revealBox);
  
  document.getElementById("revealBtn").addEventListener("click", () => {
  revealBox.innerHTML = `
  <p><strong>Your secret cheer${userMessages.length > 1 ? "s" : ""}:</strong></p>
  <ul>${userMessages.map(msg => `<li>💖 ${msg}</li>`).join("")}</ul>
  `;
  });
  }
  }
  
  function throwConfetti() {
  const colors = ['#ff9cd1','#ffd1dc','#8de0ff','#fff4ff'];
  const confetti = [];
  const W = confettiCanvas.width = window.innerWidth;
  const H = confettiCanvas.height = window.innerHeight;
  for (let i = 0; i < 50; i++) {
  confetti.push({
  x: Math.random() * W,
  y: Math.random() * H - H,
  r: Math.random() * 6 + 4,
  d: Math.random() * 50,
  color: colors[Math.floor(Math.random() * colors.length)],
  tilt: Math.random() * 10 - 10
  });
  }
  const draw = () => {
  ctx.clearRect(0, 0, W, H);
  confetti.forEach((c, i) => {
  ctx.beginPath();
  ctx.fillStyle = c.color;
  ctx.fillRect(c.x, c.y, c.r, c.r);
  ctx.closePath();
  c.y += Math.cos(c.d) + 2;
  c.x += Math.sin(0.5);
  if (c.y > H) {
  confetti[i].y = -10;
  confetti[i].x = Math.random() * W;
  }
  });
  requestAnimationFrame(draw);
  };
  draw();
  }
  