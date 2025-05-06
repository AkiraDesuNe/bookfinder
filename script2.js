document.addEventListener("DOMContentLoaded", () => {
    const carrosseis = document.querySelectorAll(".carrossel-container");
  
    carrosseis.forEach(carrossel => {
      const containerImagens = carrossel.querySelector(".container-imagens");
      const prevBtn = carrossel.querySelector(".prev-btn");
      const nextBtn = carrossel.querySelector(".next-btn");
  
      const img = containerImagens.querySelector("img");
      const imgStyle = getComputedStyle(img);
      const imageWidth = img.offsetWidth + parseInt(imgStyle.marginRight);
      const imagesPerClick = 3;
      const totalShift = imageWidth * imagesPerClick;
  
      nextBtn.addEventListener("click", () => {
        containerImagens.style.transition = "transform 0.6s ease";
        containerImagens.style.transform = `translateX(-${totalShift}px)`;
  
        setTimeout(() => {
          for (let i = 0; i < imagesPerClick; i++) {
            containerImagens.appendChild(containerImagens.firstElementChild);
          }
          containerImagens.style.transition = "none";
          containerImagens.style.transform = "translateX(0)";
        }, 600);
      });
  
      prevBtn.addEventListener("click", () => {
        for (let i = 0; i < imagesPerClick; i++) {
          containerImagens.insertBefore(
            containerImagens.lastElementChild,
            containerImagens.firstElementChild
          );
        }
        containerImagens.style.transition = "none";
        containerImagens.style.transform = `translateX(-${totalShift}px)`;
  
        void containerImagens.offsetWidth;
  
        containerImagens.style.transition = "transform 0.6s ease";
        containerImagens.style.transform = "translateX(0)";
      });
    });
  });
  