$(document).ready(function () {
  function displayConfirmation() {
    const confirmationModalContent = document.getElementById(
      'confirmationModal-content'
    );
    confirmationModalContent.innerHTML = '';

    confirmationModalContent.innerHTML = `<div class="mt-4 text-align-center"><center><p><strong>Welcome Aboard!</strong></p><p>You will be receiving a confirmation email shortly. Make sure to click on the link in the email to confirm your subscription!</p></div></center>`;
  }

  // $('#newsletterButton').click(function () {
  //   displayConfirmation();
  //   confirmationModal.style.display = 'block';
  // });

  // Get the modal
  var confirmationModal = document.getElementById('confirmationModal');

  // Get the button for continue shopping
  var continueButton = document.getElementById('continueButton');

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName('confirmationModal-close')[0];

  // When the user clicks on the continue shopping button, close the modal
  continueButton.onclick = function () {
    confirmationModal.style.display = 'none';
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    confirmationModal.style.display = 'none';
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == confirmationModal) {
      confirmationModal.style.display = 'none';
    }
  };

  // Form validation
  $('#newsletter-form').submit(function (event) {
    let isValid = true;

    // const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2, 4}\b/;
    const email = $('#email').val().trim();
    if (email == '') {
      $('#emailLabel').html(
        'Email Address: <span style="color:red">This field is required.</span>'
      );
      isValid = false;
    }
    $('#email').val(email);

    // Validate Name Entry
    const name = $('#name').val().trim();
    if (name == '') {
      $('#nameLabel').html(
        'Name: <span style="color:red">This field is required.</span>'
      );
    }
    $('#name').val(name);

    if (isValid == false) {
      event.preventDefault();
    } else {
      event.preventDefault();
      displayConfirmation();
      confirmationModal.style.display = 'block';
    }
  });
});
