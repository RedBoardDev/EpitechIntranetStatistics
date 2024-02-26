export const updateFrontend = async (eventName, data) => {
    // console.warn(`[XPHub] Updating frontend with event ${eventName} and data`, data);
    const event = new CustomEvent(eventName, { detail: data });
    window.dispatchEvent(event);
}
