const updateFrontend = async (eventName, data) => {
    console.warn(`[XPHub] Updating frontend with event ${eventName} and data`, data);
    const event = new CustomEvent(eventName, { data: data });
    window.dispatchEvent(event);
}

export { updateFrontend };
