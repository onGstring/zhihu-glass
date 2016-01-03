var checkboxElement = document.getElementById("anonymity-filter");

chrome.storage.sync.get('anonymity-filter', (item) => {
  // init
  if (Object.keys(item).length === 0) {
    chrome.storage.sync.set({'anonymity-filter': false});
    item = {'anonymity-filter' : false};
  }

  // init for popup
  checkboxElement.checked = item['anonymity-filter'];

  // update
  checkboxElement.addEventListener("change", () => {
    var currentState = checkboxElement.checked;    chrome.storage.sync.set({'anonymity-filter': currentState});
  }, false);
});
