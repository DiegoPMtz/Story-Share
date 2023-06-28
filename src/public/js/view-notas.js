function toggleDescription(element) {
  var descriptionElement = element.parentElement.querySelector(".description");
  var fullDescription = descriptionElement.textContent;
  document.getElementById("full-description-text").textContent = fullDescription;
  openModal();
}

function openModal() {
  document.getElementById("full-description-modal").style.display = "block";
}

function closeModal() {
  document.getElementById("full-description-modal").style.display = "none";
}
