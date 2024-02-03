function createButton(document, type, className, text) {
    var button = document.createElement(type);
    button.className = className;

    var label = document.createElement("span");
    label.classList.add("label");
    label.innerText = text;

    button.appendChild(label);

    return button;
}

const insertAfter = (newNode, referenceNode) => {
    if (referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
};

function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

/* global chrome */
function createPopup() {
    var overlay = document.createElement("div");
    overlay.className = "overlay-extension";
    document.body.appendChild(overlay);

    var iframe = document.createElement("iframe");
    iframe.className = "popup-extension";
    iframe.src = chrome.runtime.getURL("index.html");
    document.body.appendChild(iframe);

    // const div = document.createElement('div');
    // div.className = "popup-extension";
    // div.src = chrome.runtime.getURL("index.html");
    // document.body.appendChild(div);

    // document.addEventListener('click', (event) => {
    //     if (!iframe.contains(event.target)) {
    //         iframe.style.display = "none";
    //         overlay.style.display = "none";
    //     }
    // });
}

function addButtonToPage() {
    const neartag = getElementByXpath('//*[@id="header"]/div[2]/div/div[6]/table/tbody/tr/td[4]');
    let newButton = createButton(document, "a", "button", " Statistics");
    newButton.title = " Statistics";
    var td = document.createElement("td");
    td.className = "button-stats";

    td.classList.add("Statistics");
    td.appendChild(newButton);
    insertAfter(td, neartag);
    newButton.addEventListener('click', () => {
        setTimeout(() => {
            createPopup();
        }, 0);
    });
}

window.addEventListener('load', () => {
    const navbar = document.querySelector("#sidebar");
    if (navbar) {
        navbar.style.zIndex = "9500";
    }
    addButtonToPage();
});
