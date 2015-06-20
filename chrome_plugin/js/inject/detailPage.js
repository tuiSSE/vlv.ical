function addDownloadButtonDetailPage() {
  var objects = document.getElementsByClassName("stupla_fs09");
  var parent = objects[8].parentNode.parentNode.parentNode;
  var tbodies = $(parent).find('tbody');

  for (var i = 0; i < tbodies.length; i++) {
    var tr = $(tbodies[i]).find('tr');
    for (var j = 0; j < tr.length; j++) {
    	var obj = tr[j];
      obj.className = "detailTr";
    }
  }

  $('.detailTr').on('mouseover', function() {
  	this.style.background = "#a2dda8";
    var label = $('<label class="downloadDetail">Download</label>');
    label.insertBefore(this.childNodes[this.childNodes.length-1]);
  });

  $('.detailTr').on('mouseout', function() {
  	this.style.background = "white";
    $('.downloadDetail').remove();
  });

  $('.detailTr').on('click', function() {
	downloadDetail(this);
  });
}