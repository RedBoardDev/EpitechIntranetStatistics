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
    var iframe = document.createElement("iframe");
    iframe.className = "popup-extension";
    iframe.src = chrome.runtime.getURL("index.html");
    document.body.appendChild(iframe);

    document.addEventListener('click', (event) => {
        if (iframe && iframe.contains(event.target)) {
            iframe.style.display = 'none';
            if (document.body.contains(iframe)) {
                document.body.removeChild(iframe);
            }
        }
    });

    window.addEventListener('message', function (event) {
        if (event.data.type === 'outsideClick') {
            iframe.style.display = 'none';

            if (document.body.contains(iframe)) {
                document.body.removeChild(iframe);
            }
        }
    });
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
        navbar.style.zIndex = "950";
    }
    addButtonToPage();
});
