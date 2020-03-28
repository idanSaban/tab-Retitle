let titles = {};

const changeTitle = (tab, value) => {
    let { id, title } = tab;
    titles[id] = value;

    if (title !== value)
        chrome.tabs.sendMessage(id, { message: "set_title", value });
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    let { message, activeTab, value } = request;

    if (message === "set_title" && activeTab && value)
        changeTitle(activeTab, value);

});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    let value = titles[tabId];
    if (changeInfo.title || !value)
        return;

    changeTitle(tab, value);
});


