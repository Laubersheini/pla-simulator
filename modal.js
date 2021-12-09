// TODO: this is in antcipation for multiple modals but doesnt work jet with them

// Get the modal
var modal = []
modal[0] = document.getElementById("modal1");
modal[1] = document.getElementById("modal2");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("modal-close")[0];

// When the user clicks on the button, open the modal
function openModal(modalNumber) {
  modal[modalNumber].style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function closeModal(modalNumber) {
  modal[modalNumber].style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  modal.forEach(e => {
    if (event.target == e) {

      e.style.display = "none"
    }
  })
}
