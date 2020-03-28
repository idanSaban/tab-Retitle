let originalTitle = document.title;

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request);
        switch (request.message) {
            case ("set_title"):
                document.title = request.value;
                break;
            case ("reset_title"):
                document.title = originalTitle;
                break;
        }
    });


