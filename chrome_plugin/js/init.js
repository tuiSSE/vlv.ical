fixDivHeight();
var selectedEvents = [];

/*
 * checks, if current page is the text one and then initializes the plugin
 */
if (/vers=text/.test(self.location.href)) {
  try {
    init();
  } catch(e) {
    console.log("Failed to initialize");
    console.log(e);
  }
}

/*
 * initializes the plugin, loads the data, injects the buttons, etc
 */
function init() {
  var entryInfo = {
      entryPoint: "stupla_fs09",
      rootElementLevel: 4
  }

  // all subjects the plugin can find on current page
  var subjects = getElements(getRootElement(entryInfo));


  injectDownloadButtons(subjects);
  injectAddButtons(subjects);
}
