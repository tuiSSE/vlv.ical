function updateSelection() {
     var selection = load('selection');
     try {
            for (var i = 0; i < subjects.length; i++){
               try {
                      if (containsObject(getNameOfLecture(subjects[i]), selection)) {
                            
                              subjects[i].style.background = '#e1f2f4';

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
      saveToCart(object);
      updateSelection();
}

function removeFromCart(object) {
      deleteFromCart(object);
      updateSelection();
}