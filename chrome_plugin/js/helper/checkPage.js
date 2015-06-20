function checkPageStructure() {
	var result = false;

	var elements = getElements(getRootElement());
	if (elements.length > 0) {
		var data = convertData(elements[0]);
		if(data.objects.length > 0 && data.name !== "") {
			var tmp = data.objects[0];
			if ((tmp.begin instanceof String || tmp.begin instanceof Array) &&
				(tmp.end instanceof String || tmp.end instanceof Array)) {
				result = true;
			}
		}
	}
	return result;
}