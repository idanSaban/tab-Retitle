const setTitle = (setButton, resetButton, titleInput) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let { value } = titleInput;
        let activeTab = tabs[0];
        chrome.runtime.sendMessage({ message: "set_title", activeTab, value });
    });
    window.close();
};

document.addEventListener('DOMContentLoaded', () => {
    let setButton = document.getElementById('setButton');
    let resetButton = document.getElementById('resetButton');
    let titleInput = document.getElementById('titleInput');

    setButton.addEventListener('click', () => setTitle(setButton, resetButton, titleInput));

    titleInput.addEventListener('keyup', e => { if (e.keyCode == 13) setTitle(setButton, resetButton, titleInput); });

    resetButton.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            let activeTab = tabs[0];
            chrome.runtime.sendMessage({ message: "reset_title", activeTab });
        });
        window.close();
    });
});
