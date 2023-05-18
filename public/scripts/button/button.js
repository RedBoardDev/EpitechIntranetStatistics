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

window.addEventListener('load', async () => {
    const neartag = getElementByXpath('//*[@id="header"]/div[2]/div/div[6]/table/tbody/tr/td[4]');
    let newButton = createButton(document, "a", "button", " Statistics");
    newButton.title = " Statistics";
    var td = document.createElement("td");
    td.className = "button-stats";

    td.classList.add("Statistics");
    td.appendChild(newButton);
    insertAfter(td, neartag);
    newButton.addEventListener('click', () => {
        chrome.runtime.sendMessage({command: "OPEN_NEW_TAB" });
    });
});
