// GenericCrudEditor timestamp components

import {
  nowToTimestap,
  processDateToTimestamp,
  processTimestampToDate,
} from "../helpers/date-timestamp.jsx";

import { genericFuncArrayDefaultValue } from "./generic.editor.rfc.specific.func.jsx";

export const timestampDbListPostRead = (dataRead, editor, action) => {
  // Timestamp to Date convertion during Listing Database Post Read
  return new Promise((resolve, reject) => {
    let resp = genericFuncArrayDefaultValue(dataRead);
    const data = dataRead.resultset.map((row) => {
      const new_row = editor.fieldElements.reduce((acc, currentObj) => {
        switch (currentObj.type) {
          case 'date':
          case 'datetime-local':
            acc[currentObj.name] = processTimestampToDate(acc[currentObj.name], true, ' ');
            break;
          default:
        }
        return { ...acc };
      }, row);
      return new_row;
    });
    resp.fieldValues.resultset = data;
    resolve(resp);
  });
}

export const timestampDbPostRead = (dataRead, editor, action) => {
    // Timestamp to Date convertion during FormData Database Post Read
    return new Promise((resolve, reject) => {
      let resp = genericFuncArrayDefaultValue(dataRead);
      const new_row = editor.fieldElements.reduce( (acc, currentObj) => {
          switch(currentObj.type) {
            case 'date':
              // For date edition, we need only the date portion
              acc[currentObj.name] = processTimestampToDate(acc[currentObj.name]);
              break;
            case 'datetime-local':
              // For datetime-local edition, we need the date from time separation to be the 'T'
              acc[currentObj.name] = processTimestampToDate(acc[currentObj.name], true, 'T');
              break;
            default:
          }
          return {...acc};
        }, dataRead.resultset);
      resp.fieldValues.resultset = new_row;
      resolve(resp);
    });
  }
  
  export const timestampDbPreWrite = (row, editor, action) => {
    return new Promise((resolve, reject) => {
      // Date to Timestamp convertion during FormData Database Pre Writing
      let resp = genericFuncArrayDefaultValue(row);
      const new_row = editor.fieldElements.reduce( (acc, currentObj) => {
        switch(currentObj.type) {
          case 'date':
          case 'datetime-local':
              acc[currentObj.name] = processDateToTimestamp(acc[currentObj.name]);
              break;
          default:
        }
        return {...acc};
      }, row);
      // Update update_date with current date/time timestamp
      if (typeof new_row['update_date'] !== 'undefined') {
        new_row['update_date'] = nowToTimestap();
      }
      resp.fieldValues = new_row;
      resolve(resp);
    });
  }
  