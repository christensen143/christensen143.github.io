$(document).ready(function () {
  let currentItems = JSON.parse(sessionStorage.getItem('itemsArray')) || [];

  function displayNumberOfItems(items) {
    if (items === null || items === undefined) {
      $('#shopping-cart').html('0 items');
    } else {
      $('#shopping-cart').html(
        items.length === 1 ? items.length + ' item' : items.length + ' items'
      );
    }
  }

  function displayShoppingCart(items) {
    const shoppingCartContent = document.getElementById('checkout-content');
    shoppingCartContent.innerHTML = '';

    items.map((item) => {
      shoppingCartContent.innerHTML += `<tr> 
        <th scope="row"> 
        1 
        </th> 
        <td> 
        ${item.itemName} 
        </td> 
        <td class="float-right"> 
        $ ${item.itemPrice} 
        </td> 
        </tr>`;
    });

    let totalPrice = {
      itemPrice: 0,
    };

    if (items.length === 0) {
      totalPrice = {
        itemPrice: 0,
      };
    } else {
      totalPrice = items.reduce(function (previousValue, currentValue) {
        return {
          itemPrice: previousValue.itemPrice + currentValue.itemPrice,
        };
      });
    }

    shoppingCartContent.innerHTML += `<tr>
      <th scope="row">${items.length}</th>
      <td><strong>Subtotal</strong></td>
      <td class="float-right"><strong>$ ${totalPrice.itemPrice.toFixed(
        2
      )}</strong></td>
    </tr>`;
  }

  function displayOrderConfirmation() {
    function uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
        c
      ) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
    const confirmationModalContent = document.getElementById(
      'confirmationModal-content'
    );
    confirmationModalContent.innerHTML = '';

    const orderConfirmationNumber = uuidv4();
    confirmationModalContent.innerHTML = `<div class="mt-4 text-align-center"><center><p><strong>Your order has been placed!</strong></p><p>Your order confirmation number is ${orderConfirmationNumber}</p><p>You will receive an order confirmation email in the next few minutes.</p></div></center>`;
  }

  displayShoppingCart(currentItems);

  displayNumberOfItems(currentItems);

  $('#placeOrderButton').click(function (e) {
    e.preventDefault();
    sessionStorage.clear();
    const newItemsList = [];
    displayNumberOfItems(newItemsList);
    displayShoppingCart(newItemsList);
    displayOrderConfirmation();
    confirmationModal.style.display = 'block';
    console.log('order placed');
  });

  // Get the modal
  var confirmationModal = document.getElementById('confirmationModal');

  // Get the button that opens the modal
  // var btn = document.getElementById('shopping-cart-div');

  // Get the button for continue shopping
  var continueButton = document.getElementById('continueButton');

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName('confirmationModal-close')[0];

  // When the user clicks on the continue shopping button, close the modal
  continueButton.onclick = function () {
    const itemsAfterClose = JSON.parse(sessionStorage.getItem('itemsArray'));
    displayNumberOfItems(itemsAfterClose);
    confirmationModal.style.display = 'none';
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    const itemsAfterClose = JSON.parse(sessionStorage.getItem('itemsArray'));
    displayNumberOfItems(itemsAfterClose);
    confirmationModal.style.display = 'none';
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == shoppingCartModal) {
      const itemsAfterClose = JSON.parse(sessionStorage.getItem('itemsArray'));
      displayNumberOfItems(itemsAfterClose);
      confirmationModal.style.display = 'none';
    }
  };
});
