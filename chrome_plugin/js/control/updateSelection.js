function updateSelection(subjects) {
      for(object in subjects){
      	var selection = JSON.parse(localStorage.getItem(selection));
      	if (!containsObject(object, selection)) {
            selection.push(object);
            localStorage.setItem('selection', selection);
            object.style.background = '#BEE8BA';
            this.style.background = 'red';
          } else {
            selection = removeFromList(selection, getObjectIndex(object, selection));
            localStorage.setItem('selection', selection);
            object.style.background = 'white';
            this.style.background = '#44c767';
          }
      }
}