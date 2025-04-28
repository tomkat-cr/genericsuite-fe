// ID Service

// Ensure to install the crypto library with: npm install --save-peer --strict-peer-deps crypto
// import crypto from 'crypto';
const crypto = require('crypto');

export const convertId = (id) => {
    return (id === null || id ==='' || typeof id === 'string' ? id : id.$oid);
}

export const getUuidV4 = () => {
    return crypto.randomUUID();
}
