// Duplica uno de estos objetos para sumar nuevos proyectos.
// Cuando tengas una captura real, agrega la ruta en `image`.
const projects = [
  {
    title: "VS Tienda",
    subtitle: "Aplicación web full stack con base de datos y lógica backend.",
    description:
      "Proyecto base de mi portafolio actual. Incluye estructura full stack y sirve como punto de partida para seguir mostrando soluciones orientadas a experiencia, orden y funcionalidad.",
    tags: ["JavaScript", "Node.js", "Express", "PostgreSQL"],
    url: "https://github.com/danipvh/Proyecto-M9.git",
    images: ["./assets/img/vstienda1.png", "./assets/img/vstienda2.png"],
    palette: {
      start: "#0f3c8a",
      end: "#5e2ff0",
    },
  },
  ];

const projectsGrid = document.querySelector("#projects-grid");

const createProjectCard = (project, index) => {
  const article = document.createElement("article");
  article.className = "project-card";
  article.style.setProperty("--project-start", project.palette.start);
  article.style.setProperty("--project-end", project.palette.end);

  let preview;
  
  if (project.images && project.images.length > 0) {
    // Galería con múltiples imágenes
    const imagesHTML = project.images
      .map((img, i) => `<img src="${img}" alt="Vista previa ${i + 1} de ${project.title}" data-index="${i}" />`)
      .join("");
    
    preview = `
      <div class="project-image project-image-gallery">
        <div class="gallery-container">
          ${imagesHTML}
        </div>
        ${project.images.length > 1 ? `
          <div class="gallery-controls">
            <button class="gallery-prev" aria-label="Imagen anterior">❮</button>
            <div class="gallery-dots">
              ${project.images.map((_, i) => `<span class="dot" data-index="${i}" ${i === 0 ? 'class="dot active"' : ''}></span>`).join("")}
            </div>
            <button class="gallery-next" aria-label="Siguiente imagen">❯</button>
          </div>
        ` : ""}
      </div>
    `;
  } else if (project.image) {
    // Imagen única (compatibilidad hacia atrás)
    preview = `
      <div class="project-image project-image-real">
        <img src="${project.image}" alt="Vista previa de ${project.title}" />
      </div>
    `;
  } else {
    // Placeholder
    preview = `
      <div class="project-image">
        <div class="project-window">
          <div class="project-window-bar">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="project-window-body">
            <strong>${project.title}</strong>
            <p>${project.subtitle}</p>
          </div>
        </div>
      </div>
    `;
  }

  article.innerHTML = `
    ${preview}
    <div class="project-content">
      <div class="project-title-row">
        <h3>${project.title}</h3>
        <span class="project-index">0${index + 1}</span>
      </div>
      <p>${project.description}</p>
      <div class="project-tags">
        ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
      </div>
      <a class="project-link" href="${project.url}" ${
        project.url.startsWith("http")
          ? 'target="_blank" rel="noreferrer"'
          : ""
      }>
        Ver proyecto
      </a>
    </div>
  `;

  // Lógica de galería
  if (project.images && project.images.length > 1) {
    const galleryContainer = article.querySelector(".gallery-container");
    const prevBtn = article.querySelector(".gallery-prev");
    const nextBtn = article.querySelector(".gallery-next");
    const dots = article.querySelectorAll(".dot");
    let currentIndex = 0;

    const showImage = (index) => {
      currentIndex = (index + project.images.length) % project.images.length;
      galleryContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
      });
    };

    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showImage(currentIndex - 1);
    });

    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showImage(currentIndex + 1);
    });

    dots.forEach((dot, i) => {
      dot.addEventListener("click", (e) => {
        e.stopPropagation();
        showImage(i);
      });
    });
  }

  return article;
};

projects.forEach((project, index) => {
  projectsGrid.appendChild(createProjectCard(project, index));
});
