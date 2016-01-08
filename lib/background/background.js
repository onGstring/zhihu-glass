// storage inits

var init_stupids = ["陈玲玲", "ZJ Ye", "龙少", "彼岸小棠", "大海", "望息", "黄轶轩", "蛟羽", "behow", "罗小鼎", "赵一凡", "嘎巴贴", "陈虹", "米兰鸭子", "李尚泽", "王义德", "離娮", "马鑫", "侯铁", "doriko", "范遥", "邢汉语", "煙花释", "Lyn Misery", "ZJ Ye", "沈少Neo", "楚莫敖", "君莫笑", "不想说不知道", "冯路", "Sunny", "宫本刀", "李鼎", "庸人·沈在河", "木吉啦", "贾敬贤", "Zu Zwei", "蔡小帅", "莎朗班多", "杰克斯派瑞特", "任飞", "瓜子", "方律师", "战忽局特工", "胡若得", "messy messy", "哈皮", "郭小闲", "苏书", "sn su", "啊哈", "爱丽的好爸爸", "曾胖", "以身为盾谁可破", "老衲好羞射", "孙大圣爱小米", "罗老师的粉丝", "徐佳慧"];

chrome.storage.sync.get(['stupids', 'anonymity-filter'], (items) => {
  if (items['anonymity-filter'] === undefined)
    chrome.storage.sync.set({'anonymity-filter': false});

  if (items.stupids === undefined)
    chrome.storage.sync.set({'stupids': init_stupids});

});

// context-menu inits
chrome.contextMenus.create({

  title: "屏蔽蠢货 --> %s <--",
  contexts:["selection"],
  onclick: (info, tab) => {
    var newStupid = info.selectionText;
    if (newStupid == "匿名用户")
      return;

    chrome.storage.sync.get(['stupids'], (item) => {
      if (item.stupids === undefined)
        chrome.storage.sync.set({'stupids': [newStupid]});
      else {
        if (item.stupids.indexOf(newStupid) == -1) {
          item.stupids.push(newStupid);
          chrome.storage.sync.set({'stupids': item.stupids});
        }
      }
    });
  }
});

// reload
chrome.storage.onChanged.addListener((changes, areaName) => {
  chrome.tabs.reload();
});

// show icon in the url address
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL contains a 'g' ...
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostContains: 'zhihu' },
          })
        ],
        // And shows the extension's page action.
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});
