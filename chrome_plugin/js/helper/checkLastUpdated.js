function checkLastUpdated() {
	var selection = load('selection');
	for (var i = selection.length - 1; i >= 0; i--) {

		var cartItem = load(selection[i]);
		var link = $(cartItem.link[cartItem.link.length-1])[0];
		origItem = convertData(link);
		
		if (isOutdated(cartItem, origItem)) {
			bootbox.confirm("Das Fach " + cartItem.origName + " wurde aktualisiert. Soll es neu in den Warenkorb geladen werden?", function(result) {
				if (result) {
					removeFromCart(link);
					addToCart(link);
				}
			});
		}
	};
}

function isOutdated(cartItem, origItem) {
	var result = false;

	loop:
	for (var i = cartItem.objects.length - 1; i >= 0; i--) {
		var a = cartItem.objects[i].lastUpdated;
		var b = origItem.objects[i].lastUpdated;
		console.log(a + " ___ " + b);
		if (compareLastUpdated(a, b)) {
			result = true;
			break loop;
		}
	};

	return result;
}

function compareLastUpdated(a, b) {
	var d1 = new Date('20' + a.slice(6, a.length) + '-' + a.slice(3, 5) + '-' + a.slice(0, 2));
	var d2 = new Date('20' + b.slice(6, b.length) + '-' + b.slice(3, 5) + '-' + b.slice(0, 2));

	if (d1 < d2) {
		return true;
	} else {
		return false;
	}
}