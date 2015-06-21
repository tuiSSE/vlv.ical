function addDownloadButtonDetailPage() {
  var tbodies = $(document.body).find('tbody');

  for (var i = 0; i < tbodies.length; i++) {
    var tr = $(tbodies[i]).find('tr');
    for (var j = 0; j < tr.length; j++) {
    	var obj = tr[j];
      obj.className = "detailTr";
    }
  }

  $('.detailTr').on('mouseover', function() {
  	this.style.background = "#a2dda8";
  });

  $('.detailTr').on('mouseout', function() {
  	this.style.background = "white";
    $('.downloadDetail').remove();
  });

  $('.detailTr').on('click', function() {
	 downloadDetail(this);
  });

  var infoBox = $('<div class="detailInfoBox">Click on event to download</div>');
  infoBox.insertBefore(document.body);
}