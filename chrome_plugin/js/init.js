/*
 * @class moment // sets locale to german
 */
moment.locale("de");

/**
 * toastr options
 */
toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": true,
  "progressBar": false,
  "positionClass": "toast-bottom-left",
  "preventDuplicates": true,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

try {
  fixDivHeight();
} catch(e) {};

/*
 * checks if a selection is available in storage. if not, it breaks a lot of things. if none is present, an empty one is saved to localStorage
 */
try {
  load('selection');
} catch (e) {
  save('selection', []); 
}

/*
 * same as above for settings
 */
try {
  load('settings');
} catch (e) {
  save('settings', []); 
}

var subjects = [];
injectDiv();
updateSelectionBox();

/*
 * checks, if current page is the text one and then initializes the plugin
 */
if (/vers=text/.test(self.location.href)) {
  // all subjects the plugin can find on current page
  subjects = getElements(getRootElement());
  fixIds(subjects);
  
  try {
    if (checkPageStructure()) {
      init();
    } else {
      toastr.error("Site structure seems to have changed. Site manipulation has been disabled.")
    }
  } catch (e) {
    console.log("Failed to initialize");
    console.log(e);
  }
}

if(/wcms3.rz.tu-ilmenau.de\/~goettlich\/elvvi\/*/.test(self.location.href)) {
    try {
      var subjects = [];
      addNewButton();
    } catch (e) {
      console.log(e); 
    }
  }

/*
 * initializes the plugin, loads the data, injects the buttons, etc
 */
function init() {
  injectAddButtons(subjects);
  injectBorders();
  updateSelection(subjects);
  checkLastUpdated();
}

/**
* Append container and include editForm
*/
try {
  $('body').prepend('<div id="formArea" style="display: none;"></div>');
  $('#formArea').load(chrome.extension.getURL("partials/edit-form.html"));
} catch(e) {
  console.log(e);
}