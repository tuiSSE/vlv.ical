function updateSelection() {
     var selection = loadObjects('selection');
     try {
            for (var i = 0; i < subjects.length; i++){
               try {
                      if (containsObject(subjects[i], selection)) {
                              subjects[i].style.background = '#E6F2F3';
                      } else {
                              subjects[i].style.background = 'white';
                      }
               } catch (e) {
                     console.log(e);
               }
            }
      } catch (e) {
            console.log(e);
        }
      try {
            updateSelectionBox();
      } catch (e) {
            console.log(e);
      }
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