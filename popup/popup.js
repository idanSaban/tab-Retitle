document.addEventListener('DOMContentLoaded', () => {
    let setButton = document.getElementById('setButton');
    let titleInput = document.getElementById('titleInput');
    setButton.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            let { value } = titleInput;
            let activeTab = tabs[0];
            chrome.runtime.sendMessage({ message: "set_title", activeTab, value });
        });
    });
});
