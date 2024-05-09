function showResumen(element) {
  var titulo = element.querySelector('.item_title').textContent;
  var autor = element.querySelector('.autor').textContent;
  var reseña = element.querySelector('.reseña').textContent;

  var modal = document.getElementById('myModal');
  var modalTitle = document.getElementById('modalTitle');
  var modalContent = document.getElementById('modalContent');

  modal.style.display = 'block';
  modalTitle.textContent = titulo + ' - ' + autor;
  modalContent.innerHTML = '<p>' + reseña.slice(0,2550) + '...</p>';
}

function closeModal() {
  var modal = document.getElementById('myModal');
  modal.style.display = 'none';
}
document.addEventListener('click', function(event) {
  var modal = document.getElementById('myModal');
  if (event.target == modal) {
      closeModal();
  }
});

