const slides = [
    {
      image: 'application/healthcare.png',
    },
    {
      image: 'application/finance.webp',
    },
    {
      image: 'application/law.png',
    },
    {
      image: 'application/autonomous_vehicles.jpeg',
    },
    {
      image: 'application/ecommerce.png',
    }
  ];
  
let currentSlide = 0;
const slideImage = document.getElementById('slide-image');
const slideElements = document.querySelectorAll('.slide');
  
function updateSlide() {
   slideImage.src = slides[currentSlide].image;
   slideElements.forEach((el, i) => {
     el.style.display = i === currentSlide ? 'block' : 'none';
   });
}
  
document.getElementById('prev').addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlide();
});
  
document.getElementById('next').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlide();
});
  
updateSlide();