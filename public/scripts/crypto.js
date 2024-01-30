async function sha256(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    return await crypto.subtle.digest('SHA-256', data).then(hashBuffer => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        return hashHex;
    });
}

async function generateIdFromStr(email) {
    return await sha256(email).then(hashedEmail => {
        const generatedId = hashedEmail.substring(0, 32);
        return generatedId;
    });
}

function parseJwtToken(token) {
    if (token === undefined || token === null) return undefined;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

export { generateIdFromStr, parseJwtToken };
