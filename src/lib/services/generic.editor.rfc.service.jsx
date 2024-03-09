// GenericCrudEditor (GCE) service main

import React, { useState, useEffect, useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fontawesome from "@fortawesome/fontawesome";
import {
  faPlus,
  faEye,
  faEdit,
  faTrashAlt,
  faCheck,
  faList,
  faRecycle,
} from "@fortawesome/fontawesome-free-solid";

// import { getConfigsJsonFile } from "../_helpers/json-utilities";
import { errorAndReEnter } from "../helpers/error-and-reenter";

import {
  MainSectionContext,
  MainSectionProvider,
} from './generic.editor.rfc.provider';
import {
  FormPage,
} from './generic.editor.rfc.formpage';
import {
  getSelectDescription,
} from './generic.editor.rfc.selector';
import {
  processGenericFuncArray,
} from './generic.editor.rfc.specific.func';
import {
  setEditorParameters,
  getEditoObj,
} from './generic.editor.rfc.common';
import {
  CrudEditorSearch,
} from './generic.editor.rfc.search';
import {
  console_debug_log,
} from './logging.service';

import {
  ShowHidePageAnimation,
  WaitAnimation
} from "./wait.animation.utility";

import {
  BUTTON_LISTING_CLASS,
  ERROR_MSG_CLASS,
  INFO_MSG_CLASS,
} from "../constants/class_name_constants";
import {
  ACTION_CREATE,
  ACTION_READ,
  ACTION_UPDATE,
  ACTION_DELETE,
  ACTION_LIST,
  MSG_ACTION_NEW,
  MSG_ACTION_LIST,
  MSG_PREVIOUS,
  MSG_NEXT,
  MSG_PAGE,
  MSG_OF,
  ROWS_PER_PAGE,
  MSG_ACTIONS,
  MSG_ROWS_PER_PAGE,
} from "../constants/general_constants";

fontawesome.library.add(
  faPlus,
  faEye,
  faEdit,
  faTrashAlt,
  faCheck,
  faList,
  faRecycle,
);

const debug = false;

export const GenericCrudEditor = ({ editorConfig, parentData, handleFormPageActions = null }) => {
  return (
    <>
      <MainSectionProvider>
        <GenericCrudEditorMain
          editorConfig={editorConfig}
          parentData={parentData}
          handleFormPageActions={handleFormPageActions}
        />
      </MainSectionProvider>
    </>
  );
}

const GenericCrudEditorMain = (props) => {
  const [editor, setEditor] = useState(null);
  const [rows, setRows] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);
  const [formMode, setFormMode] = useState([ACTION_LIST, null]);
  const [status, setStatus] = useState("");
  const [infoMsg, setInfoMsg] = useState("");
  const [searchFilters, setSearchFilters] = useState({});
  const [searchText, setSearchText] = useState("");

  const {
    initCache,
    debugCache,
  } = useContext(MainSectionContext);

  useEffect(() => {
    setEditorParameters(props).then(
      editor_response => {
        if (!editor_response) {
          setEditor(null);
        } else if(editor_response.error) {
          console_debug_log("GCE-M-010:");
          console_debug_log(editor_response.errorMsg);
          setStatus(
            errorAndReEnter(
              editor_response.errorMsg, (debug ? '[GCE-M-010]' : null)
            )
          );
        } else if (!editor_response.response) {
          setEditor(null);
        } else {
          setEditor(getEditoObj(props, editor_response));
        }
      },
      error => {
        console_debug_log("GCE-M-020:");
        console_debug_log(error);
        setStatus(
          errorAndReEnter(
            error, (debug ? '[GCE-M-020]' : null)
          )
        );
      }
    );
  }, [props]);

  useEffect(() => {
    // if (editor && !status) {
    if (editor) {
      ShowHidePageAnimation(true);
      let accessKeysListing = {
        page: currentPage,
        limit: rowsPerPage,
      }
      // dbListPreRead: To set a Listing filters, assign funcResponse.fieldValues[db_field]=filter_value
      processGenericFuncArray(
        editor, 'dbListPreRead', accessKeysListing, formMode
      ).then(
        funcResponse => {
          // console_debug_log(`GenericCrudEditor / dbListPreRead - funcResponse:`)
          // console_debug_log(funcResponse);
          accessKeysListing = Object.assign(
            accessKeysListing, editor.parentFilter, searchFilters, funcResponse.fieldValues
          );
          editor.db.getAll(accessKeysListing).then(
            data => {
              ShowHidePageAnimation(false);
              // dbListPostRead: To fix Listing fields
              processGenericFuncArray(
                editor, 'dbListPostRead', data, formMode
              ).then(
                funcResponse => setRows(funcResponse.fieldValues),
                error => setStatus(
                  errorAndReEnter(
                    error, (debug ? '[GCE-M-030]' : null)
                  )
                )
              )
            },
            error => {
              console_debug_log(`GenericCrudEditor / Listing - ERROR:`)
              console.error(error);
              ShowHidePageAnimation(false);
              setStatus(
                errorAndReEnter(
                  error, (debug ? ' [GCE-M-040]' : null)
                  )
                );
            }
          );
        },
        error => {
          console_debug_log(`GenericCrudEditor / dbListPreRead - ERROR:`)
          console.error(error);
          setStatus(
            errorAndReEnter(
              error, (debug ? ' [GCE-M-050]' : null)
            )
          )
        }
      );
    }
  }, [currentPage, rowsPerPage, editor, formMode, searchFilters]);

  const handleCancel = (config = {}) => {
    if ((typeof config['searchFilters'] !== 'undefined')) {
      setSearchFilters(config['searchFilters']);
      setSearchText(config['searchText']);
    }
    if ((typeof config['nextAction'] !== 'undefined')) {
      setFormMode([
        config['nextAction'],
        config['id'],
        config['infoMsg'],
        "INFO",
      ]);
    } else {
      setFormMode([ACTION_LIST, null]);
    }
  };

  const handleNew = () => {
    setFormMode([ACTION_CREATE, null]);
  };

  const handleView = (id) => {
    setFormMode([ACTION_READ, id]);
  };

  const handleModify = (id) => {
    setFormMode([ACTION_UPDATE, id]);
  };

  const handleDelete = (id) => {
    setFormMode([ACTION_DELETE, id]);
  };

  const goToNewPage = (newPage) => {
    setInfoMsg('');
    setCurrentPage(newPage);
  }

  const handleRowsPerPageChange = (event) => {
    if (!event.target.value) {
      return;
    }
    setInfoMsg('');
    setRowsPerPage(event.target.value);
  }

  const handleRefresh = (newPage) => {
    // select_cache = {};
    initCache();
    window.location.reload(true);
  }

  const rowId = (row) => {
    if (debug) {
      console_debug_log(`rowId | editor.primaryKeyName: ${editor.primaryKeyName} | row:`, row)
    }
    const response = typeof row._id === 'undefined' ? row[editor.primaryKeyName] : editor.db.convertId(row._id);
    return response;
  }

  if (!editor) {
    if (status) {
      return (
        <div className={ERROR_MSG_CLASS}>
            {status}
            {debug && "[GCEM-NES]"}
        </div>
      );
    }
    return (
      WaitAnimation()
    );
  }

  if (!rows && !status) {
    return (
      WaitAnimation()
    );
  }

  if (status) {
    return (
      <div className={ERROR_MSG_CLASS}>
        {status}
        {debug && "[GCEM-ST]"}
      </div>
    );
  }

  if (rows && typeof rows['totalPages'] !== 'undefined' && rows['totalPages'] == null) {
    return 'Rows ok but not totalPages - ERROR # 3';
  }

  if (formMode[0] !== ACTION_LIST) {
    return (
      <>
        <FormPage
          mode_par={formMode[0]}
          id_par={formMode[1]}
          onCancel_par={handleCancel}
          setInfoMsg_par={setInfoMsg}
          editor_par={editor}
          handleFormPageActions={props.handleFormPageActions}
          message={typeof formMode[2] !== 'undefined' ? formMode[2] : ''}
          messageType={typeof formMode[3] !== 'undefined' ? formMode[3] : ''}
        />
      </>
    );
  }

  return (
    <>
      {infoMsg && (
        <div className={INFO_MSG_CLASS}>
          {infoMsg}
        </div>
      )}
      {rows && (
        // <div className="container mx-auto">
        <div 
            className="w-screen bg-gray-300 fyn_jumbotron"
        >
          <h1 className="text-2xl font-bold mb-4">
            {editor.title + " - " + MSG_ACTION_LIST}
            <span className="pl-2 align-bottom">
              <button
                onClick={handleRefresh}
                className={`${BUTTON_LISTING_CLASS} text-xs` /* mb-4 */}
              >
                <FontAwesomeIcon icon="recycle" />
              </button>
            </span>
          </h1>
          <table
            className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
          >
            <thead>
              <tr
                key={`${editor.baseUrl}_thead`}
              >
                {Object.keys(editor.fieldElements).map(
                  (key) =>
                    editor.fieldElements[key].listing && (
                      <th
                        key={key}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase break-words"
                      >
                        {editor.fieldElements[key].label}
                      </th>
                    )
                )}
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                >
                  <div>
                    <span className="pr-2">{MSG_ACTIONS}</span>
                    <button
                      onClick={handleNew}
                      className={`${BUTTON_LISTING_CLASS} mr-2`}
                    >
                      <FontAwesomeIcon icon="plus" /> {MSG_ACTION_NEW}
                    </button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {rows && typeof rows.resultset !== 'undefined' &&
                rows.resultset.map((row) => (
                  <tr
                    // key={rowId(row)}
                    key={`${editor.baseUrl}_row_${rowId(row)}`}
                  >
                    {Object.keys(editor.fieldElements).map(
                      (key) =>
                        editor.fieldElements[key].listing && (
                          <td
                            key={key}
                            className="px-6 py-4 break-words text-sm text-gray-800 dark:text-gray-200"
                          >
                            {
                              getSelectDescription(
                                editor.fieldElements[key],
                                row
                              )  // Show column value or select description
                            }
                          </td>
                        )
                    )}
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"
                    >
                      <div>
                        <button
                          // type="button"
                          onClick={() => handleView(rowId(row))}
                          className={`${BUTTON_LISTING_CLASS} mr-2`}
                        >
                          <FontAwesomeIcon icon="eye" />
                        </button>
                        <button
                          // type="button"
                          onClick={() => handleModify(rowId(row))}
                          className={`${BUTTON_LISTING_CLASS} mr-2`}
                        >
                          <FontAwesomeIcon icon="edit" />
                        </button>
                        <button
                          // type="button"
                          onClick={() => handleDelete(rowId(row))}
                          className={`${BUTTON_LISTING_CLASS}`}
                        >
                          <FontAwesomeIcon icon="trash" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="mt-4 flex items-center">
            <button
              disabled={currentPage === 1}
              onClick={() => goToNewPage(currentPage - 1)}
              className={`${currentPage === 1 ? "opacity-50" : ""
                } ${BUTTON_LISTING_CLASS}`}
            >
              {MSG_PREVIOUS}
            </button>
            <span id="NavigationAnimation" className="ml-3 mr-3 hidden">
              {WaitAnimation()}
            </span>
            <span className="text-sm ml-2 mr-2">
              {MSG_PAGE} {currentPage} {MSG_OF} {rows.totalPages}
            </span>
            <button
              disabled={currentPage === rows.totalPages}
              onClick={() => goToNewPage(currentPage + 1)}
              className={`${currentPage === rows.totalPages ? "opacity-50" : ""
                } ${BUTTON_LISTING_CLASS}`}
            >
              {MSG_NEXT}
            </button>
            <div className="mt-2 flex items-center">
              <label
                htmlFor="newRowsPerPage"
                className="ml-3 mr-2 text-sm"
              >
                {MSG_ROWS_PER_PAGE}:
              </label>
              <input
                type="number"
                min="1"
                max="500"
                id="newRowsPerPage"
                value={rowsPerPage}
                className="mb-2 w-6 h-6 px-2 text-sm"
                onChange={handleRowsPerPageChange}
              />
            </div>
            <div>
              <CrudEditorSearch
                id={editor.baseUrl}
                fieldElements={editor.fieldElements}
                handleCancel={handleCancel}
                value={searchText}
              />
            </div>
          </div>
          {status && (
            <div className={ERROR_MSG_CLASS}>
              {status}
            </div>
          )}
        </div>
      )}
      {(debug ? debugCache("GenericCrudEditorMain") : '')}
    </>
  );
};

export const ConvertToComponents = (editorDataObj, registry) => {
  /*
   Convert the following editorData elements to components using the registry
   as a brigde between the string elements from the JSON file
   and the components objects.

   component: ...,

   fieldElements: [ ...
      select_elements: ...,

      dataPopulator: ...,
      component: ..,

    // 1-N relationships
    childComponents: [ ... ],

    // Specific functions
    dbListPreRead: [ ... ]
    dbListPostRead: [ ... ]
    dbPreRead: [ ... ]
    dbPostRead: [ ... ]
    dbPreValidations: [ ... ]
    validations: [ ... ]
    dbPreWrite: [ ... ]
    dbPostWrite: [ ... ]
   */
  const editorDataObjArray = [
    'component',
  ];
  editorDataObjArray.forEach(element => {
    if (typeof editorDataObj[element] !== 'undefined' &&
      typeof editorDataObj[element] === 'string') {
      editorDataObj[element] = registry[editorDataObj[element]];
    }
  });

  // Do the same for the rest of elements in fieldElements array
  const fieldElementsArray = [
    'component',
    'select_elements',
    'dataPopulator',
  ];
  editorDataObj['fieldElements'] = editorDataObj['fieldElements'].map((fieldElement) => {
    fieldElementsArray.forEach(element => {
      if (typeof fieldElement[element] !== 'undefined' &&
        typeof fieldElement[element] === 'string') {
        fieldElement[element] = registry[fieldElement[element]];
      }
    });
    return fieldElement;
  });

  const relatedObjsArray = [
    'childComponents',
    'dbListPreRead',
    'dbListPostRead',
    'dbPreRead',
    'dbPostRead',
    'dbPreValidations',
    'validations',
    'dbPreWrite',
    'dbPostWrite'
  ];
  relatedObjsArray.forEach(element => {
    if (typeof editorDataObj[element] !== 'undefined') {
      editorDataObj[element] = editorDataObj[element].map((childComponent) => {
        if (typeof childComponent === 'string') {
          childComponent = registry[childComponent];
        }
        return childComponent;
      });
    }
  });

  return editorDataObj;
}

// export const GetFormData = (jsonFileName, registry, calleeName = null) => {
export const GetFormData = (editorData, registry, calleeName = null) => {
  if (typeof registry === 'undefined') {
    registry = {};
  }
  // const editorData = getConfigsJsonFile(jsonFileName);
  let editorDataObj = ConvertToComponents(editorData, registry);
  editorDataObj["calleeName"] = calleeName;
  return editorDataObj;
}
