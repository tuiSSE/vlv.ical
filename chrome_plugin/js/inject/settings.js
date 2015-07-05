function openSettingsDialog() {
    var settings = load('settings');
    bootbox.dialog({
                title: "Einstellungen",
                message: getSettingsForm(),
                backdrop: true,
                closeButton: false,
                buttons: {
                    success: {
                        label: "Speichern",
                        className: "btn-success",
                        callback: function () {
                          try {
                            clonedForm = $('#editForm');
                            settings.highlightUpdatesPeriod = parseInt($('#setUpdatePeriod')[0].value);
                            settings.addTypeToName = $("#addTypeToName").is(":checked");
                            settings.separateByType = $("#separateByType").is(":checked");

                            save('settings', settings);
                            $('#formArea div:nth-child(1)').prepend(clonedForm);
                          } catch(e) {

                            console.log("Saving settings failed!");
                            console.log(e);
                          }
                        }
                    },
                    cancel: {
                      label: "Abbrechen",
                      className: "btn-danger",
                      callback: function(){
                        try {

                        } catch(e) {
                          console.log(e);
                        }
                      }
                    }
                },
                keyboard: false
            }
        );
}

function getSettingsForm() {
  var settings = load('settings');
  var form = '<form id="settingsForm" class="form-horizontal">' +
                    '<div class="form-group"> <label for="setUpdatePeriod" class="col-sm-3 control-label">Zeitraum</label>' +
                    '<div class="col-sm-9"> <input type="number" class="form-control input-md" value="' + settings.highlightUpdatesPeriod + '" id="setUpdatePeriod" required>' +
                    '<p class="help-block">Größe des Zeitraums, in dem aktualisierte Veranstaltungen hervorgehoben werden (in Tagen)</p></div></div>' +
                    // end first form group
                    '<div class="form-group"> <label for="addTypeToName" class="col-sm-3 control-label">Dateiname</label>' +
                    '<div class="col-sm-9"> <input type="checkbox" class="form-control input-md" id="addTypeToName" data-on-text="EIN" data-off-text="AUS">' +
                    '<p class="help-block">Soll an den Veranstaltungsnamen der Typ angehangen werden? (Vorlesung, Übung, Seminar, etc.)</p></div></div>' +
                    // end second form group
                    '<div class="form-group"> <label for="separateByType" class="col-sm-3 control-label">Separate Dateien</label>' +
                    '<div class="col-sm-9"> <input type="checkbox" class="form-control input-md" id="separateByType" data-on-text="EIN" data-off-text="AUS">' +
                    '<p class="help-block">Sollen die Veranstaltungsarten separat heruntergeladen werden?</p></div></div>' +
              '</form>';
  $(document.body).prepend(form);
  $('#addTypeToName').prop('checked', settings.addTypeToName);
  $('#separateByType').prop('checked', settings.separateByType);

  $("#addTypeToName").bootstrapSwitch('onColor', 'success');
  $("#separateByType").bootstrapSwitch('onColor', 'success');
  $("#setUpdatePeriod").TouchSpin({
              min: 0,
              max: 100,
              step: 1,
              boostat: 5,
              maxboostedstep: 10,
              postfix: 'Tage'
          });
  return $('#settingsForm');
}