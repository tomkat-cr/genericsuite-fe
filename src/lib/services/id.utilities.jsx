// ID Service

// Ensure to install the crypto library with: npm install crypto
import crypto from 'crypto';

export const convertId = (id) => {
    return (id === null || id ==='' || typeof id === 'string' ? id : id.$oid);
}

export const getUuidV4 = () => {
    return crypto.randomUUID();
}
