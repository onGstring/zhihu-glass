(function () {
  var init_stupids = ["陈玲玲", "ZJ Ye", "龙少", "彼岸小棠", "大海", "望息", "黄轶轩", "蛟羽", "behow", "罗小鼎", "赵一凡", "嘎巴贴", "陈虹", "米兰鸭子", "李尚泽", "王义德", "離娮", "马鑫", "侯铁", "doriko", "范遥", "邢汉语", "煙花释", "Lyn Misery", "ZJ Ye", "沈少Neo", "楚莫敖", "君莫笑", "不想说不知道", "冯路", "Sunny", "宫本刀", "李鼎", "庸人·沈在河", "木吉啦", "贾敬贤", "Zu Zwei", "蔡小帅", "莎朗班多", "杰克斯派瑞特", "任飞", "瓜子", "方律师", "战忽局特工", "胡若得", "messy messy", "哈皮", "郭小闲", "苏书", "sn su", "啊哈", "爱丽的好爸爸", "曾胖", "以身为盾谁可破"];

  chrome.storage.sync.get('stupids', (item) => {
      if (Object.keys(item).length === 0)
        chrome.storage.sync.set({'stupids': init_stupids});
    });
})();
