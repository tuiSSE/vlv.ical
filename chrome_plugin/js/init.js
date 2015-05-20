var entryInfo = {
  entryPoint: "stupla_fs09",
  rootElementLevel: 4
}

// initializes the theme for popup dialogs
vex.defaultOptions.className = 'vex-theme-top';

/*
 * checks if a selection_length is available in storage. if not, it breaks a lot of things. if none is present, it is saved in localStorage
 */
try {
  load('selection_length');
} catch (e) {
  save('selection_length', 0); 
}

var subjects = [];
injectDiv();

/*
 * checks, if current page is the text one and then initializes the plugin
 */
if (/vers=text/.test(self.location.href)) {
  fixDivHeight();
  // all subjects the plugin can find on current page
  subjects = getElements(getRootElement(entryInfo));
  fixId();
  
  try {
    init();
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
  updateSelection(subjects);
  injectDownloadButtons(subjects);
  injectAddButtons(subjects);
  injectBorders();
  injectEditDialogs();
}
