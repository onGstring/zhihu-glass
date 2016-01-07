var checkboxElement = document.getElementById("anonymity-filter");
var ulElement = document.getElementById("stupids");
var stupidInfoElement = document.getElementById("stupid-list-info");

chrome.storage.sync.get(['stupids', 'anonymity-filter'], (items) => {
  // init for checkbox
  checkboxElement.checked = items['anonymity-filter'];

  // init for ul
  stupidInfoElement.innerHTML = "蠢货名单(" + items.stupids.length + ")";
  for (var i = 0; i < items.stupids.length; i++){
    var li = document.createElement("li");
    li.innerHTML = items.stupids[i];
    li.addEventListener('click', (event) => {
      var target = event.target || event.srcElement;
      chrome.storage.sync.get(['stupids'], (item) => {
        item.stupids.splice(item.stupids.indexOf(target.innerHTML), 1);
        chrome.storage.sync.set({'stupids': item.stupids});
        stupidInfoElement.innerHTML = "蠢货名单(" + item.stupids.length + ")";
      });
      target.parentNode.removeChild(target);
    });
    ulElement.appendChild(li);
  }

  // update
  checkboxElement.addEventListener("change", () => {
    var currentState = checkboxElement.checked;    chrome.storage.sync.set({'anonymity-filter': currentState});
  }, false);
});
