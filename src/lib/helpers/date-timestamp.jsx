import { console_debug_log } from "../services/logging.service.jsx";

const debug = false;

const GMT_TAIL = '.000Z' // '.000-0000'
const DATE_TIME_TAIL = `T00:00:00${GMT_TAIL}`

export const timestampToDate = (timestamp, fullDateTime = false, separator = null, militaryTime = true) => {
    const timestampUnixEpoch = timestamp*1000;
    const date = new Date(timestampUnixEpoch);
    if (debug) console_debug_log('timestampToDate', timestamp, fullDateTime, separator, militaryTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    // const formattedTime = hours % 12 + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + ampm;
    const formattedTime = (hours > 12 ? hours-12 : hours) + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + ampm;
    if (fullDateTime) {
        if (separator) {
            if (!militaryTime) {
                return date.toISOString().split("T")[0] + separator + formattedTime;
            }
            return date
                .toISOString()
                .split("T")
                .join(separator)
                .slice(0, 19);
        }
        if (!militaryTime) {
            return date.toISOString().split("T")[0] + 'T' + formattedTime;
        }
        return date.toISOString();
    }
    return date.toISOString().split("T")[0];
}

export const addMissingTz = (stringDate) => (stringDate + (stringDate.indexOf('.') > 0 ? '' : GMT_TAIL))

export const dateToTimestap = (stringDate) => ((new Date(addMissingTz(stringDate)).valueOf())/1000);

export const nowToTimestap = () => ((new Date().valueOf())/1000);

export const fixDateWithTz = (dateTimeString) => {
    switch (dateTimeString.length) {
        case 10:
            dateTimeString += DATE_TIME_TAIL;
            break;
        case 16:
            dateTimeString += `:00${GMT_TAIL}`;
            break;
        default:
            dateTimeString = addMissingTz(dateTimeString);
    }
    return dateTimeString;
}

export const processTimestampToDate = (timestampMixed, fullDatetime, separator) => {
    if (!timestampMixed) {
        timestampMixed = 0; // nowToTimestap();
    }
    if (typeof timestampMixed === 'string') {
        timestampMixed = fixDateWithTz(timestampMixed);
        timestampMixed = dateToTimestap(timestampMixed);
    }
    return timestampToDate(timestampMixed, fullDatetime, separator);
}

export const processDateToTimestamp = (dateTime) => {
    if (debug) {
        console_debug_log(`*==*==* processDateToTimestamp - BEFORE: ${dateTime}`)
    }
    dateTime = fixDateWithTz(dateTime);
    if (debug) {
        console_debug_log(`*==*==* processDateToTimestamp - AFTER: ${dateTime} | Resultado: ${dateToTimestap(dateTime)}`)
    }
    return dateToTimestap(dateTime);
}

export const addZeroTimeToDate = (dateValue) => {
    const date = new Date(dateValue);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.toISOString().slice(0, 19).replace('T', ' ');
}
