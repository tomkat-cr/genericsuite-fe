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
  // faArrowRight,
  // faRecycle,
} from "@fortawesome/fontawesome-free-solid";

// import { getConfigsJsonFile } from "../_helpers/json-utilities";
import { errorAndReEnter } from "../helpers/error-and-reenter.jsx";
import { useUser } from '../helpers/UserContext.jsx';

import {
  MainSectionContext,
  MainSectionProvider,
} from './generic.editor.rfc.provider.jsx';
import {
  FormPage,
} from './generic.editor.rfc.formpage.jsx';
import {
  getSelectDescription,
} from './generic.editor.rfc.selector.jsx';
import {
  processGenericFuncArray,
} from './generic.editor.rfc.specific.func.jsx';
import {
  setEditorParameters,
  getEditoObj,
} from './generic.editor.rfc.common.jsx';
import {
  CrudEditorSearch,
} from './generic.editor.rfc.search.jsx';
import {
  console_debug_log,
} from './logging.service.jsx';
import { imageDirectory } from "../constants/general_constants.jsx";

import {
  ShowHidePageAnimation,
  WaitAnimation
} from "./wait.animation.utility.jsx";

import {
  BUTTON_LISTING_CLASS,
  ERROR_MSG_CLASS,
  INFO_MSG_CLASS,
} from "../constants/class_name_constants.jsx";
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
} from "../constants/general_constants.jsx";

fontawesome.library.add(
  faPlus,
  faEye,
  faEdit,
  faTrashAlt,
  faCheck,
  faList,
  // faArrowRight,
  // faRecycle,
);

// 2024-08-11
// tailwind and bootstrap together
// https://stackoverflow.com/questions/62688037/can-use-both-tailwind-css-and-bootstrap-4-at-the-same-time
// google: tailwind react bootstrap does not work
// https://stackoverflow.com/questions/64557697/tailwindcss-not-working-in-create-react-app
// import styles from "index.css"

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
  const { currentUser } = useUser();

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
        editor, 'dbListPreRead', accessKeysListing, formMode, currentUser
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
                editor, 'dbListPostRead', data, formMode, currentUser
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
      <>
        {status}
        {debug && "[GCEM-ST]"}
      </>
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
        <div
          className={INFO_MSG_CLASS}
        >
          {infoMsg}
        </div>
      )}
      {rows && (
        <div 
            // className="w-screen bg-gray-300 fyn_jumbotron"
            // className="w-screen bg-gray-300"
        >
          <h1
            className="text-2xl font-bold mb-4"
          >
            {editor.title + " - " + MSG_ACTION_LIST}
            <span
              className="pl-2 align-bottom"
            >
              <button
                onClick={handleRefresh}
                className={`${BUTTON_LISTING_CLASS} text-xs` /* mb-4 */}
              >
                {/* <FontAwesomeIcon icon="recycle" /> */}
                <img src={imageDirectory + "arrows_rotate_solid.svg"}
                  width="14" height="14" alt="Reload"
                  // className={"text-white fill-white"}
                />
              </button>
            </span>
          </h1>
          <div
            className="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25"
          >
            <div
              // className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"
            >
              <div
                className="relative rounded-xl overflow-auto"
              >
                <div
                  className="shadow-sm overflow-hidden my-8"
                >
                  <table
                    // className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                    // className="min-w-full"
                    // className="table-auto"
                    className="border-collapse table-auto w-full text-sm"
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
                                // scope="col"
                                // className="pr-2 text-xs font-medium text-gray-500 uppercase break-words"
                                className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
                                >
                                {editor.fieldElements[key].label}
                              </th>
                            )
                          )}
                        <th
                          // scope="col"
                          // // className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                          className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
                        >
                          <div>
                            <span
                                // className="pr-2 text-xs font-medium text-gray-500 uppercase break-words"
                            >
                              {/* {MSG_ACTIONS}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}&nbsp;
                            </span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      // // className="divide-y divide-gray-200 dark:divide-gray-700"
                      className="bg-white dark:bg-slate-800"
                    >
                      {rows && typeof rows.resultset !== 'undefined' &&
                        rows.resultset.map((row) => (
                          <tr
                            id={`${editor.baseUrl}_row_${rowId(row)}_row`}
                            key={`${editor.baseUrl}_row_${rowId(row)}`}
                            // className="odd:bg-white even:bg-slate-50"
                            onMouseOver={() => {
                              const element = document.getElementById(`${editor.baseUrl}_row_${rowId(row)}_controls`);
                              // const magic_button = document.getElementById(`${editor.baseUrl}_row_${rowId(row)}_magic_button`);
                              // magic_button.classList.add('hidden');
                              const row_element = document.getElementById(`${editor.baseUrl}_row_${rowId(row)}_row`);
                              row_element.classList.add('bg-white');
                              element.classList.remove('hidden');
                            }}
                            onMouseLeave={() => {
                              const element = document.getElementById(`${editor.baseUrl}_row_${rowId(row)}_controls`);
                              // const magic_button = document.getElementById(`${editor.baseUrl}_row_${rowId(row)}_magic_button`);
                              // magic_button.classList.remove('hidden');
                              const row_element = document.getElementById(`${editor.baseUrl}_row_${rowId(row)}_row`);
                              row_element.classList.remove('bg-white');
                              element.classList.add('hidden');
                            }}
                          >
                            {Object.keys(editor.fieldElements).map(
                              (key) =>
                                editor.fieldElements[key].listing && (
                                  <td
                                    key={key}
                                    // // className="px-6 py-0 break-words text-sm text-gray-50 dark:text-gray-50"
                                    // className="break-words text-sm"
                                    className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
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
                              // Action buttons
                              // className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"
                              // className="whitespace-nowrap text-sm"
                              className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
                            >
                              <div
                                // className="flex items-center"
                            >
                                {/* <div
                                  id={`${editor.baseUrl}_row_${rowId(row)}_magic_button`}
                                  className="visible"
                                >
                                  <FontAwesomeIcon icon="arrow-right" />
                                </div> */}
                                <div
                                  id={`${editor.baseUrl}_row_${rowId(row)}_controls`}
                                  className="hidden"
                                >
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
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

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
            <button
              onClick={handleNew}
              className={`${BUTTON_LISTING_CLASS} mr-2`}
            >
              <FontAwesomeIcon icon="plus" /> {MSG_ACTION_NEW}
            </button>
          </div>
          {status && (
            <div className={ERROR_MSG_CLASS}>
              {status}
              {debug && "[GCE-99]"}
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
    'aux_component',
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
