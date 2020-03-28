chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request)
        if (request.message === "set_title") {
            document.title = request.value;
        }
    }
);


