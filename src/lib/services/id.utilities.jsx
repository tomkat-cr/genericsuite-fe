// ID Utilities

import { ObjectId } from 'bson';

// Convert a MongoDB BSON _id to string
export const convertId = (id) => {
    return (id === null || id === '' || typeof id === 'string' ? id : id.$oid);
}

// Generate a new unique ObjectId
export const generateNewIdObject = () => new ObjectId();

// To get the ID as a 24-character hexadecimal string (which is what's stored in the DB):
export const newIdString = () => {
    const newId = generateNewIdObject();
    return newId.toHexString();
}
