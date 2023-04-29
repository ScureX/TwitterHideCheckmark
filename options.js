const runOnHomeCheckbox = document.getElementById("runOnHomeCheckbox");
const saveButton = document.getElementById("saveButton");

// Set the initial value of the checkbox based on the user's preference
chrome.storage.sync.get(['runOnHome'], function(result) {
  if (result.runOnHome === undefined || result.runOnHome === false) {
    runOnHomeCheckbox.checked = false;
  } else {
    runOnHomeCheckbox.checked = true;
  }
});

// Save the user's preference when the save button is clicked
saveButton.addEventListener("click", function() {
  const runOnHome = runOnHomeCheckbox.checked;
  chrome.storage.sync.set({runOnHome: runOnHome}, function() {
    console.log("Preference saved: runOnHome = " + runOnHome);
  });
});
