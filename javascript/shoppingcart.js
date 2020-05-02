$(document).ready(function () {
  let currentItems = JSON.parse(sessionStorage.getItem('itemsArray')) || [];

  // let totalItems = JSON.parse(sessionStorage.getItem('itemsArray'));

  function displayShoppingCart(items) {
    const shoppingCartContent = document.getElementById(
      'shoppingCartModal-content'
    );
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

  // Display number of items in cart
  function displayNumberOfItems(items) {
    if (items === null || items === undefined) {
      $('#shopping-cart').html('0 items');
    } else {
      $('#shopping-cart').html(
        items.length === 1 ? items.length + ' item' : items.length + ' items'
      );
    }
  }

  function displayItemAddedModal(itemName) {
    const itemAddedModalContent = document.getElementById(
      'itemAddedModal-content'
    );
    itemAddedModalContent.innerHTML = '';

    itemAddedModalContent.innerHTML = `<div class="mt-4 text-align-center"><center><p><strong>${itemName} added to your cart!</p></div></center>`;
  }

  // Add an item to shopping cart
  $('button').click(function (e) {
    // e.preventDefault();
    let newItem = {
      itemPrice: $(this).data('price'),
      itemName: $(this).data('name'),
    };
    currentItems.push(newItem);
    sessionStorage.setItem('itemsArray', JSON.stringify(currentItems));

    newCurrentItems = JSON.parse(sessionStorage.getItem('itemsArray'));

    displayNumberOfItems(newCurrentItems);
    displayItemAddedModal(newItem.itemName);
    itemAddedModal.style.display = 'block';
  });

  // Show total items in shopping cart next to shopping cart icon
  displayNumberOfItems(currentItems);

  // Clear all items from shopping cart
  $('#clearButton').click(function () {
    sessionStorage.clear();
    const newItemsList = [];
    displayShoppingCart(newItemsList);
  });

  // Get the modals
  var modal = document.getElementById('shoppingCartModal');
  var itemAddedModal = document.getElementById('itemAddedModal');

  // Get the button that opens the modal
  var btn = document.getElementById('shopping-cart-div');

  // Get the button for continue shopping
  var continueButton = document.getElementById('continueButton');

  // Get the button for checkout
  var checkoutButton = document.getElementById('checkoutButton');

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName('shopModal-close')[0];
  var itemAddedSpan = document.getElementsByClassName(
    'itemAddedModal-close'
  )[0];

  // When the user clicks on the button, open the modal
  btn.onclick = function () {
    displayShoppingCart(currentItems);
    modal.style.display = 'block';
  };

  // When the user clicks on the continue shopping button, close the modal
  continueButton.onclick = function () {
    const itemsAfterClose = JSON.parse(sessionStorage.getItem('itemsArray'));
    displayNumberOfItems(itemsAfterClose);
    modal.style.display = 'none';
  };

  checkoutButton.onclick = function () {
    window.location.href = 'http://127.0.0.1:5500/checkout.html';
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    const itemsAfterClose = JSON.parse(sessionStorage.getItem('itemsArray'));
    displayNumberOfItems(itemsAfterClose);
    modal.style.display = 'none';
  };

  itemAddedSpan.onclick = function () {
    const itemsAfterClose = JSON.parse(sessionStorage.getItem('itemsArray'));
    displayNumberOfItems(itemsAfterClose);
    itemAddedModal.style.display = 'none';
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == shoppingCartModal || event.target == itemAddedModal) {
      const itemsAfterClose = JSON.parse(sessionStorage.getItem('itemsArray'));
      displayNumberOfItems(itemsAfterClose);
      modal.style.display = 'none';
      itemAddedModal.style.display = 'none';
    }
  };
});
