$(function(){
  var tourCompleted = localStorage.getItem('tourCompleted') || false;
  var introguide = introJs();
  // var startbtn   = $('#startdemotour');
  introguide.setOptions({
    steps: [
        {
          element: '#pluginLogo',
          intro: 'This guided tour will explain how to use this plugin for a splendid experience.<br><br>Use the arrow keys for navigation or hit ESC to exit the tour immediately.',
          position: 'right'
        },
        {
          element: '#emptyBox',
          intro: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto aliquid vitae temporibus, ipsa consectetur nesciunt sed magni molestias, eaque quod dolorem possimus quisquam cumque, qui quos veniam. Necessitatibus, et vel!',
          position: 'bottom'
        },
        {
          element: '#emptyBox',
          intro: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio ut dolor ea blanditiis. Hic architecto repudiandae, velit magnam molestiae, possimus expedita impedit in iure, adipisci laborum doloribus similique voluptas vel!',
          position: 'bottom-right-aligned'
        },
        {
          element: '#selectionBox',
          intro: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, consectetur at amet mollitia repudiandae animi eveniet, quasi hic incidunt quidem praesentium ad aperiam accusamus delectus et quod doloremque consequatur quo!',
          position: 'left'
        },
        {
          element: '#selectAll',
          intro: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste sapiente enim voluptatum repellat sequi. Eius ad provident deleniti, aliquam. Id, ex quo architecto tempore quibusdam voluptatem dolorem ipsum fuga sapiente.",
          position: 'bottom'
        },
        {
          element: '.addButton',
          intro: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste sapiente enim voluptatum repellat sequi. Eius ad provident deleniti, aliquam. Id, ex quo architecto tempore quibusdam voluptatem dolorem ipsum fuga sapiente.",
          position: 'top'
        },
        {
          element: '.moreInfoButton',
          intro: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste sapiente enim voluptatum repellat sequi. Eius ad provident deleniti, aliquam. Id, ex quo architecto tempore quibusdam voluptatem dolorem ipsum fuga sapiente.",
          position: 'floating'
        },
        {
          element: '.selectionBoxItem',
          intro: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste sapiente enim voluptatum repellat sequi. Eius ad provident deleniti, aliquam. Id, ex quo architecto tempore quibusdam voluptatem dolorem ipsum fuga sapiente.",
          position: 'left'
        },
        {
          element: '.cd-item-remove',
          intro: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste sapiente enim voluptatum repellat sequi. Eius ad provident deleniti, aliquam. Id, ex quo architecto tempore quibusdam voluptatem dolorem ipsum fuga sapiente.",
          position: 'left'
        },
        {
          element: '#downloadSelected',
          intro: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste sapiente enim voluptatum repellat sequi. Eius ad provident deleniti, aliquam. Id, ex quo architecto tempore quibusdam voluptatem dolorem ipsum fuga sapiente.",
          position: 'top'
        },
        {
          element: '#deleteCart',
          intro: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste sapiente enim voluptatum repellat sequi. Eius ad provident deleniti, aliquam. Id, ex quo architecto tempore quibusdam voluptatem dolorem ipsum fuga sapiente.",
          position: 'left'
        },
        {
          element: '#backButton',
          intro: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste sapiente enim voluptatum repellat sequi. Eius ad provident deleniti, aliquam. Id, ex quo architecto tempore quibusdam voluptatem dolorem ipsum fuga sapiente.",
          position: 'bottom'
        },
        {
          element: '#settings-button',
          intro: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste sapiente enim voluptatum repellat sequi. Eius ad provident deleniti, aliquam. Id, ex quo architecto tempore quibusdam voluptatem dolorem ipsum fuga sapiente.",
          position: 'bottom'
        }
    ]
  });
  /*
   * Check if there was already a tour and check if the current url matches the pattern
   */
  if(!tourCompleted && window.location.href.includes('www.tu-ilmenau.de/vlv/index.php') && window.location.href.includes('vers=text')) {
    introguide.start();
  }

  introguide.oncomplete(function() {
    localStorage.setItem('tourCompleted', true);
  });
  introguide.onexit(function() {
    localStorage.setItem('tourCompleted', true);
  }); 
	/**
	  * Example for extended properties of a tour 
      startbtn.on('click', function(e){
	      e.preventDefault();
	      introguide.start();
	      $(this).hide();
	    });
	     
	     * oncomplete re-display the button
	     * hide by default since we don't need this functionality.
	    introguide.oncomplete(function() {
	      if(startbtn.css('display') == 'none') {
	        startbtn.show();
	      }
	    });
	    introguide.onexit(function() {
	      if(startbtn.css('display') == 'none') {
	        startbtn.show();
	      }
	    }); 
	**/
});