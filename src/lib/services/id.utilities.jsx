// ID Service


export const convertId = (id) => {
    return (id === null || id ==='' || typeof id === 'string' ? id : id.$oid);
}

function generateUUID() {
    /*
     * To resemble crypto.randomUUID() using Node.js's native crypto module, using crypto.randomBytes()
     */
    const bytes = crypto.randomBytes(16);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const uuid = bytes.toString('hex').match(/([0-9a-f]{8})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{12})/).slice(1).join('-');
    return uuid;
}

export const getUuidV4 = () => {
    return generateUUID();
}
