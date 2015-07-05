function updateSelectionBox() {
  var itemBox = $('#itemBox')[0];
  itemBox.innerHTML = '<br>';

  try {
    var items = load('selection');
    for (var i = 0; i < items.length; i++) {
      var item = load(items[i]);
      var element = $('<button id="' +
                        item.id +
                        '" class="selectionBoxItem">' +
                        item.name + 
                        '</button>');
      var removeButton = $('<button name="'+ item.id +
                           '" class="cd-item-remove cd-img-replace">Entfernen</button>');

      element.insertBefore($('#itemBox')[0].childNodes[i]);
      
      /* Wrap element inside li to apply styles to row */
      $(element).wrap('<li></li>');
      (element).after(removeButton);

      /* highlight element, if it was changed through edit dialog */
      if (item.changed) {
        $(element).parent().addClass('item-edited');
        $(element).append('<br> <em class="small text-muted">- Das Element wurde bearbeitet</em>');
      }

      $(element).on('click', function() {
          openEditDialog(this.id);
      });
    }
    // Delete a chosen Object
    var id = null;
    $('#itemBox li .cd-item-remove').on('click', function() {
      id = this.name;
      var item = load(id);
      removeFromCart(item);
    });
  } catch(e) {
    console.log("Could not update selection.");
    console.log(e);
  }
}

function openBox() {

  var open = $('#openSelectionBox')[0];
  $(open).hide("slide");
  
  var box = $('#selectionBox')[0];
  $(box).show("slide");

}

function closeBox() {
  var open = $('#openSelectionBox')[0];
  $(open).show("slide");
  
  var box = $('#selectionBox')[0];
  $(box).hide("slide");
}

function clearSelectionBox() {
  var selection = load('selection');
  selection = [];
  saveObjects('selection', selection);
  updateSelection();
}
