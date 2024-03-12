import { console_debug_log } from '../services/logging.service.jsx';

const debug = false;

export const mergeDicts = (dictToAdd, originDict) => {
    if (debug) console_debug_log(">>> 1) mergeDicts | dictToAdd:", dictToAdd, 'originDict:', originDict);
    if (!(typeof dictToAdd === 'object' && dictToAdd !== null)) {
        dictToAdd = {};
    }
    const dictToAddFinal = Object.entries(originDict).reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {...dictToAdd});
    if (debug) console_debug_log(">>> 2) mergeDicts | dictToAddFinal:", dictToAddFinal);
    return dictToAddFinal;
}
