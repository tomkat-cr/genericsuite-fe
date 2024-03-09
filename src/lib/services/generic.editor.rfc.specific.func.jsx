// GenericCrudEditor Specific Functions handling

import { replaceSpecialVars } from "./generic.editor.utilities";
import { console_debug_log } from "./logging.service";

const debug = false;

export const genericFuncArrayDefaultValue = (data = []) => {
    return {
        'error': false,
        'errorMsg': '',
        'fieldMsg': {},
        'fieldValues': data,
        'fieldsToDelete': [],
        'otherData': {},
    }
};

const reduceAllResponses = (responses, data) => {
    const defaultValues = genericFuncArrayDefaultValue(data);
    const responsesReduced = responses.reduce((acc, response) => {
        response = { ...defaultValues, ...response };
        acc['error'] = acc['error'] || response['error'];
        acc['errorMsg'] += (acc['errorMsg'] !== '' && response['errorMsg'] !== '' ? ', ' : '') + response['errorMsg'];
        acc['fieldMsg'] = { ...acc['fieldMsg'], ...response['fieldMsg'] };
        acc['fieldValues'] = { ...acc['fieldValues'], ...response['fieldValues'] };
        acc['fieldsToDelete'] = [...acc['fieldsToDelete'], ...response['fieldsToDelete']];
        acc['otherData'] = {...acc['otherData'], ...response['otherData']};
        return { ...acc };
    }, defaultValues);
    return responsesReduced;
};

export const processGenericFuncArray = (editor, funcArrayName, data, action) => {
    if (debug) {
        console_debug_log('** PROCESS GENERIC FUNC ARRAY ** funcArrayName: ' + funcArrayName);
        console_debug_log('processGenericFuncArray | action: ' + action);
        console_debug_log('processGenericFuncArray | editor:', editor);
        console_debug_log('processGenericFuncArray | data:', data);
        console_debug_log();
    }
    return new Promise((resolve, reject) => {
        const genericFuncArray = editor[funcArrayName];
        if (debug) {
            console_debug_log('processGenericFuncArray | genericFuncArray:');
            console_debug_log(genericFuncArray);
        }
        const allFuncPromises = genericFuncArray.map((objFunc) => {
            // objFunc response must be an object can contain any or all of this attributes:
            // {
            //   'error': false,
            //   'errorMsg': '',
            //   'fieldMsg': {},
            //   'fieldValues': {},
            //   'fieldsToDelete': [],
            //   'otherData': [],
            // }
            return objFunc(data, editor, action);
        });
        if (debug) {
            console_debug_log('processGenericFuncArray | allFuncPromises:');
            console_debug_log(allFuncPromises);
        }
        Promise.all(allFuncPromises).then(
            results => {
                // const allFuncResponses = results.forEach(
                const allFuncResponses = results.map(
                    result => result
                );
                if (debug) {
                    console_debug_log('processGenericFuncArray | results:');
                    console_debug_log(results);
                    console_debug_log('processGenericFuncArray | allFuncResponses:');
                    console_debug_log(allFuncResponses);
                }
                let finalResponse = reduceAllResponses(allFuncResponses, data);
                finalResponse['fieldsToDelete'].forEach(
                    fieldName => {
                        delete finalResponse.fieldValues[fieldName];
                    }
                );
                if (debug) {
                    console_debug_log('processGenericFuncArray | finalResponse:');
                    console_debug_log(finalResponse);
                }
                resolve(finalResponse);
            },
            error => reject(error)
        );
    });
}

// General specific funcions 

// export const UserFilterDbListPreRead = (data, editor, action) => {
//     // User filter DbListPreRead to filter by user_id
//     return new Promise((resolve, reject) => {
//         let resp = genericFuncArrayDefaultValue(data);
//         const { currentUserValue } = authenticationService;
//         resp.fieldValues['user_id'] = currentUserValue.id
//         // console_debug_log(">>> UserFilterDbListPreRead | resp:");
//         // console_debug_log(resp);
//         resolve(resp);
//     });
// }

// export const UserFilterDbPreRead = (data, editor, action) => {
//     // user_id assignment during Database Pre Read
//     // Template: timestampDbPostRead
//     return new Promise((resolve, reject) => {
//         let resp = genericFuncArrayDefaultValue(data);
//         const { currentUserValue } = authenticationService;
//         // console_debug_log(`>>> UserFilterDbPreRead ||| data:`);
//         // console_debug_log(data);
//         data['user_id'] = currentUserValue.id
//         resp.fieldValues.resultset =  Object.assign({}, data);
//         // resp.fieldValues['user_id'] = currentUserValue.id
//         // console_debug_log(`>>> UserFilterDbPreRead | currentUserValue.id: ${currentUserValue.id} | resp:`);
//         // console_debug_log(resp);
//         resolve(resp);
//     });
// }

export const mandatoryFiltersDbListPreRead = (data, editor, action) => {
    // Mandatory Filters DbListPreRead to manage filters in list and search
    return new Promise((resolve, reject) => {
        let resp = genericFuncArrayDefaultValue(data);
        if (typeof editor.mandatoryFilters !== 'undefined') {
            resp.fieldValues = replaceSpecialVars(editor.mandatoryFilters)
        }
        // console_debug_log(`>>> mandatoryFiltersDbListPreRead | resp:`, resp, 'editor.mandatoryFilters:', editor.mandatoryFilters);
        resolve(resp);
    });
}

export const mandatoryFiltersDbPreRead = (data, editor, action) => {
    // Mandatory Filters assignment during Database Pre Read
    // Template: timestampDbPostRead
    return new Promise((resolve, reject) => {
        let resp = genericFuncArrayDefaultValue(data);
        if (typeof editor.mandatoryFilters !== 'undefined') {
            resp.fieldValues.resultset =  Object.assign(
                data, replaceSpecialVars(editor.mandatoryFilters)
            );
        }
        // console_debug_log(`>>> mandatoryFiltersDbPreRead | resp:`, resp, 'data:', data);
        resolve(resp);
    });
}
