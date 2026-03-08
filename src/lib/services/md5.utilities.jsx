// MD5 Utilities

import { md5 } from 'js-md5';

import { console_debug_log } from './logging.service.jsx';

const debug = false;

export const getHash = (text) => {
    const hashedText = md5(text);
    if (debug) console_debug_log(`Hashing text: '${text}' -> '${hashedText}'`);
    return hashedText;
}
