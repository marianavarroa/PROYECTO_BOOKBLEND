document.addEventListener("DOMContentLoaded", function() {
    $('.carousel-pp').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    });
});

let currentIndex = 0;
const items = document.querySelectorAll('.carousel-itempp');
const totalItems = items.length;

document.querySelector('.carousel-containerpp').addEventListener('mouseenter', () => {
    document.querySelector('.prev-nextpp').style.display = 'block';
});

document.querySelector('.carousel-containerpp').addEventListener('mouseleave', () => {
    document.querySelector('.prev-nextpp').style.display = 'none';
});
document.querySelector('.carousel-pp').addEventListener('click', (event) => {
    const clickedItem = event.target.closest('.carousel-itempp');
    if (clickedItem) {
        const image = clickedItem.querySelector('img');
        const link = clickedItem.querySelector('a');
        if (image && link) {
            const imageRect = image.getBoundingClientRect();
            const linkRect = link.getBoundingClientRect();
            const imageCenterX = imageRect.left + imageRect.width / 2;
            const imageCenterY = imageRect.top + imageRect.height / 2;
            // Verificar si el clic se realizó dentro del área del centro de la imagen
            if (event.clientX >= imageCenterX - 200 && event.clientX <= imageCenterX + 200 &&
                event.clientY >= imageCenterY - 8000 && event.clientY <= imageCenterY + 8000) {
                // Si el clic está dentro del área del centro de la imagen, seguir el enlace
                const linkHref = link.getAttribute('href');
                window.location.href = linkHref;
            } else {
                // Si el clic está fuera del área del centro de la imagen, avanzar al siguiente elemento del carrusel
                showItem(currentIndex + 1);
            }
        } else {
            // Si la imagen no contiene un enlace, avanzar al siguiente elemento del carrusel
            showItem(currentIndex + 1);
        }
    }
});



document.getElementById('prevBtn').addEventListener('click', () => {
    showItem(currentIndex - 1);
});

document.getElementById('nextBtn').addEventListener('click', () => {
    showItem(currentIndex + 1);
});

function showItem(index) {
    items[currentIndex].style.display = 'none';
    currentIndex = (index + totalItems) % totalItems;
    items[currentIndex].style.display = 'block';
}
