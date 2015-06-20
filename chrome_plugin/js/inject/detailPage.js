function addDownloadButtonDetailPage() {
  var objects = document.getElementsByClassName("stupla_fs09");
  var parent = objects[8].parentNode.parentNode.parentNode;
  var tbodies = $(parent).find('tbody');

  for (var i = 0; i < tbodies.length; i++) {
    var tr = $(tbodies[i]).find('tr');
    for (var j = 0; j < tr.length; j++) {
    	var obj = tr[j];
    	var button = $('<button class="downloadDetail primary-btn">Download</button>');
    	button.insertBefore(obj.childNodes[obj.childNodes.length-1]);
    }
  }

  $('.downloadDetail').on('mouseover', function() {
  	this.parentNode.style.background = "#a2dda8";
  });

  $('.downloadDetail').on('mouseout', function() {
  	this.parentNode.style.background = "white";
  });

  $('.downloadDetail').on('click', function() {
	downloadDetail(this.parentNode);
  });
}