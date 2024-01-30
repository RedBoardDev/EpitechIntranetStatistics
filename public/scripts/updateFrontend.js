const updateFrontend = async (eventName, data) => {
    const event = new CustomEvent(eventName, { data: data });
    window.dispatchEvent(event);
}

export { updateFrontend };
