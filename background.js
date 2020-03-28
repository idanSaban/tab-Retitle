let titles = {};

const changeTitle = (tab, value) => {
    let { id, title } = tab;
    titles[id] = value;

    if (title !== value)
        chrome.tabs.sendMessage(id, { message: "set_title", value });
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    let { message, activeTab, value } = request;
    let { id } = activeTab;
    switch (message) {
        case ("set_title"):
            if (activeTab && value)
                changeTitle(activeTab, value);
            break;
        case ("reset_title"):
            if (titles[id]) {
                delete titles[id];
                chrome.tabs.sendMessage(id, { message: "reset_title" });
            }
            break;
    }

});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    let value = titles[tabId];
    if (changeInfo.title || !value)
        return;

    changeTitle(tab, value);
});


