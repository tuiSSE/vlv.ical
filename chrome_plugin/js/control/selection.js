function updateSelection() {
      var selection = loadObjects('selection');
      for (var i = 0; i < subjects.length; i++){
         try {
                if (containsObject(subjects[i], selection)) {
                        subjects[i].style.background = '#BEE8BA';
                } else {
                        subjects[i].style.background = 'white';
                }
         } catch (e) {
               console.log(e);
         }
      }
      updateSelectionBox();
}

function addToCart(object) {
      var selection = loadObjects('selection');
      selection.push(object);
      saveObjects('selection', selection);
      updateSelection();
}

function removeFromCart(object) {
      var selection = loadObjects('selection');
      selection = removeFromList(selection, getObjectIndex(object, selection));
      saveObjects('selection', selection);
      updateSelection();
}