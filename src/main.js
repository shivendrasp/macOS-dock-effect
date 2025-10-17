let textContainer = document.querySelector(".text-container");

let spans = [];
let icons = [
  "/images/blender.png",
  "/images/Discord.png",
  "/images/Figma.png",
  "/images/Notion.png",
  "/images/slack.png",
];

let mouseX = 0;
let mouseY = 0;
let animationId = null;

for (let i = 0; i < icons.length; i++) {
  let span = document.createElement("span");
  let img = document.createElement("img");
  img.src = icons[i];
  img.alt = `Icon ${i + 1}`;
  span.appendChild(img);
  span.classList.add("span");
  spans.push(span);
  textContainer.appendChild(span);
}

function updateEffect() {
  spans.forEach((span, index) => {
    span.addEventListener("mouseover", () => {
      span.classList.add("active");
    });

    span.addEventListener("mouseout", () => {
      span.classList.remove("active");
    });

    let spanRect = span.getBoundingClientRect();
    let spanPosX = spanRect.x + spanRect.width / 2;
    let spanPosY = spanRect.y + spanRect.height / 2;

    let distance = Math.sqrt(
      Math.pow(mouseX - spanPosX, 2) + Math.pow(mouseY - spanPosY, 2)
    );
    let maxDistance = 60;

    let minWeight = 200;
    let maxWeight = 900;
    let minItalic = 1;
    let maxItalic = 4;
    let minScale = 0;
    let maxScale = 4;

    let normalizedDistance = Math.min(distance / maxDistance, 1);
    let invertedDistance = 1 - normalizedDistance;

    let fontWeight = minWeight + invertedDistance * (maxWeight - minWeight);
    let fontItalic = minItalic + invertedDistance * (maxItalic - minItalic);
    let fontScale = minScale + invertedDistance * (maxScale - minScale);

    span.style.fontWeight = Math.round(fontWeight);
    span.style.marginLeft = `${fontScale * 12}px`;
    span.style.marginRight = `${fontScale * 12}px`;
    span.style.transform = `translateY(${
      fontScale * -16
    }px) scale(${fontItalic})`;
  });
}

function animate() {
  updateEffect();
  animationId = requestAnimationFrame(animate);
}

function handleMouseMove(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;

  if (!animationId) {
    animate();
  }
}

animate();

document.addEventListener("mousemove", handleMouseMove);
