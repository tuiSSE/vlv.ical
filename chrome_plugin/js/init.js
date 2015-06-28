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
  "preventDuplicates": false,
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
 * Reset Cache on load
 */
 save('dataCache', []);
 clearDataWithPrefix('data_');

/*
 * checks if a selection is available in storage. if not, it breaks a lot of things. if none is present, an empty one is saved to localStorage
 */
try {
  load('selection');
} catch (e) {
  save('selection', []); 
}

/*
 * try to load settings, if that fails, defaultSettings are set
 */
var defaultSettings = {
  "highlightUpdatesPeriod": 14,
  "addTypeToName": false,
  "separateByType": false
};

try {
  var tmpSettings = load('settings');
  var tmpSettings2 = {};

  for (var key in defaultSettings) {
    if (tmpSettings[key] == null || tmpSettings[key] == undefined) {
      tmpSettings2[key] = defaultSettings[key];
    } else {
      tmpSettings2[key] = tmpSettings[key];
    }
  }
  
  save('settings', tmpSettings2);
} catch (e) {
  save('settings', defaultSettings); 
}

var subjects = [];

try {
  injectDiv();
  updateSelectionBox();
} catch(e) {
  console.log("Div injecting failed.");
  console.log(e);
}

/*
 * checks, if current page is the text one and then initializes the plugin
 */
if (/vers=text/.test(self.location.href)) {
  // all subjects the plugin can find on current page
  try{
    subjects = getElements(getRootElement());
    fixIds(subjects);
  } catch(e) {
    console.log("Could not read any subjects.");
    console.log(e);
  }

  try {
    if (checkPageStructure()) {
      init();
    } else {
      toastr.error("Site structure seems to have changed. Site manipulation has been disabled.");
    }
  } catch (e) {
    console.log("Failed to initialize");
    console.log(e);
  }
}

if(/wcms3.rz.tu-ilmenau.de\/~goettlich\/elvvi\/*/.test(self.location.href)) {
    try {
      var subjects = [];
      addDownloadButtonDetailPage();
    } catch (e) {
      console.log(e); 
    }
  }

/*
 * initializes the plugin, loads the data, injects the buttons, etc
 */
function init() {
  injectSelectAllButton();
  injectAddButtons(subjects);
  injectBorders();
  highlightUpdated();
  updateSelection(subjects);
  checkLastUpdated();
}

/**
* Append container and include editForm and settingsForm
*/
try {
  $('body').prepend('<div id="formArea" style="display: none;"></div>');
  $('#formArea').append('<div></div><div></div>');
  $('#formArea div:nth-child(1)').load(chrome.extension.getURL("partials/edit-form.html"));
  $('#formArea div:nth-child(2)').load(chrome.extension.getURL("partials/edit-form-multidate.html"));
} catch(e) {
  console.log(e);
}