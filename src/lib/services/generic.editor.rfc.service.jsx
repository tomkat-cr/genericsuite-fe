// GenericCrudEditor (GCE) service main

import React, { useState, useEffect, useContext } from "react";

// import { getConfigsJsonFile } from "../_helpers/json-utilities";
import { GsIcons } from "../helpers/IconsLib.jsx";
import { errorAndReEnter } from "../helpers/error-and-reenter.jsx";
import { useUser } from '../helpers/UserContext.jsx';
import { useAppContext } from "../helpers/AppContext.jsx";

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
  BUTTON_LISTING_DISABLED_CLASS,
  // BUTTON_RIGHT_SPACE_CLASS,
  BUTTON_LISTING_NEW_CLASS,
  BUTTON_LISTING_REFRESH_CLASS,
  BUTTON_COMPOSED_LABEL_CLASS,
  INFO_MSG_CLASS,
  HIDDEN_CLASS,
  VISIBLE_CLASS,
  APP_TOP_DIV_CLASS,
  // APP_LEVEL1_DIV_CLASS,
  APP_TITLE_H1_CLASS,
  APP_TITLE_RECYCLE_BUTTON_CLASS,
  APP_LEVEL2_DIV_CLASS,
  // APP_LISTING_LEVEL2_DIV_CLASS,
  // APP_LISTING_LEVEL3_DIV_CLASS,
  // APP_LISTING_LEVEL4_DIV_CLASS,
  APP_LISTING_TABLE_CLASS,
  APP_LISTING_TABLE_HDR_THEAD_CLASS,
  APP_LISTING_TABLE_HDR_TR_CLASS,
  APP_LISTING_TABLE_HDR_TH_CLASS,
  APP_LISTING_TABLE_HRD_ACTIONS_COL_CLASS,
  APP_LISTING_TABLE_BODY_TBODY_CLASS,
  APP_LISTING_TABLE_BODY_TR_ODD_CLASS,
  APP_LISTING_TABLE_BODY_TR_EVEN_CLASS,
  APP_LISTING_TABLE_BODY_TD_ODD_CLASS,
  APP_LISTING_TABLE_BODY_TD_EVEN_CLASS,
  APP_LISTING_TABLE_BODY_TD_ACTIONS_ODD_CLASS,
  APP_LISTING_TABLE_BODY_TD_ACTIONS_EVEN_CLASS,
  APP_LISTING_TOOLBAR_TOP_DIV_CLASS,
  APP_LISTING_TOOLBAR_PAGE_NUM_SECTION_CLASS,
  APP_LISTING_TOOLBAR_ROW_PER_PAGE_SECTION_CLASS,
  APP_LISTING_TOOLBAR_ROW_PER_PAGE_LABEL_CLASS,
  APP_LISTING_TOOLBAR_ROW_PER_PAGE_INPUT_CLASS,
  APP_LISTING_TOOLBAR_WAIT_ANIMATION_CLASS,
  APP_LISTING_TOOLBAR_PAGINATION_SECTION_CLASS,
  APP_LISTING_TABLE_BODY_TR_ACTIONS_EVEN_CLASS,
  APP_LISTING_TABLE_BODY_TR_ACTIONS_ODD_CLASS,
  APP_LISTING_TOOLBAR_TOP_DIV_NOT_WIDE_CLASS,
  APP_LISTING_TOOLBAR_TOP_DIV_WIDE_CLASS,
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
  const { theme, isWide } = useAppContext();

  const actionsHandlerAllowsMouseOver = true;
  const actionsHandlerAllowsMagicButton = false;

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

  const actionsHandler = (mode, row) => {
    const element = document.getElementById(`${editor.baseUrl}_row_${rowId(row)}_controls`);
    const magicButtonElement = document.getElementById(`${editor.baseUrl}_row_${rowId(row)}_magicButton`);
    const rowElement = document.getElementById(`${editor.baseUrl}_row_${rowId(row)}_row`);
    const bgColorStype = ['bg-slate-300', 'odd:bg-slate-300'];
    if (mode === 'show') {
      // Highlight row
      bgColorStype.map((key) => { rowElement.classList.add(key) });
      // If mouse over allowed, show controls
      if (actionsHandlerAllowsMouseOver) {
        if (actionsHandlerAllowsMagicButton) {
          magicButtonElement.classList.add('hidden');
        }
        element.classList.remove('hidden');
      }
    }
    if (mode === 'hide') {
      // Remove row highlight
      bgColorStype.map((key) => { rowElement.classList.remove(key) });
      // If mouse over allowed, hide controls
      if (actionsHandlerAllowsMouseOver) {
        if (actionsHandlerAllowsMagicButton) {
          magicButtonElement.classList.remove('hidden');
        }
        element.classList.add('hidden');
      }
    }
    if (mode === 'toggle') {
      // Turn off previous opened controls
      rows.resultset.map((thisRow) => {
        const thisRowElement = document.getElementById(`${editor.baseUrl}_row_${rowId(thisRow)}_controls`);
        if (!thisRowElement.classList.contains('hidden')) {
          thisRowElement.classList.add('hidden');
        }
      });
      if (element.classList.contains('hidden')) {
        // Controls hidden in this row
        bgColorStype.map((key) => { rowElement.classList.add(key) });
        if (actionsHandlerAllowsMagicButton) {
          magicButtonElement.classList.add('hidden');
        }
        element.classList.remove('hidden');
      } else {
        // Controls activated in this row
        bgColorStype.map((key) => { rowElement.classList.remove(key) });
        if (actionsHandlerAllowsMagicButton) {
          magicButtonElement.classList.remove('hidden');
        }
        element.classList.add('hidden');
      }
    }
  }


  if (!editor) {
    if (status) {
      return (
        <div>
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
    <div
      key={`${editor.baseUrl}_top_div`}
      className={`${APP_TOP_DIV_CLASS} ${theme.contentBg}`}
    >
      {/* Information messsage */}
      {infoMsg && (
        <div
          key={`${editor.baseUrl}_info_msg`}
          className={INFO_MSG_CLASS}
        >
          {infoMsg}
        </div>
      )}
      {/* Listing space */}
      {rows && (
        <>
          {/* Listing title */}
          <CrudEditorListingTitle
            baseUrl={editor.baseUrl}
            title={editor.title}
            handleRefresh={handleRefresh}
          />
          <div
            key={`${editor.baseUrl}_level2_div`}
            className={APP_LEVEL2_DIV_CLASS}
          >
            <table
              key={`${editor.baseUrl}_table`}
              className={APP_LISTING_TABLE_CLASS}
            >
              {/* Listing header */}
              <thead
                key={`${editor.baseUrl}_thead`}
                className={APP_LISTING_TABLE_HDR_THEAD_CLASS}
              >
                <tr
                  key={`${editor.baseUrl}_thead_tr`}
                  className={APP_LISTING_TABLE_HDR_TR_CLASS}
                >
                  {Object.keys(editor.fieldElements).map(
                    (key) =>
                      editor.fieldElements[key].listing && (
                        <th
                          // scope="col"
                          key={`${editor.baseUrl}_${key}_thead_th`}
                          className={APP_LISTING_TABLE_HDR_TH_CLASS}
                        >
                          {editor.fieldElements[key].label}
                        </th>
                      )
                  )}
                  {actionsHandlerAllowsMagicButton && (
                    <th
                      // scope="col"
                      key={`${editor.baseUrl}_actions`}
                      className={APP_LISTING_TABLE_HDR_TH_CLASS}
                    >
                      <div
                        key={`${editor.baseUrl}_actions_div`}
                        className={APP_LISTING_TABLE_HRD_ACTIONS_COL_CLASS}
                      >
                          {MSG_ACTIONS}
                      </div>
                    </th>
                  )}
                </tr>
              </thead>
              {/* Listing rows */}
              <tbody
                key={`${editor.baseUrl}_tbody`}
                className={APP_LISTING_TABLE_BODY_TBODY_CLASS}
              >
                {rows && typeof rows.resultset !== 'undefined' &&
                  rows.resultset.map((row, index) => (
                    // To avoid use of <> to group 2 <tr> (one for the row and one for the actions)
                    // because it throws the warning:
                    // "Warning: Each child in a list should have a unique "key" prop."
                    // we use <React.Fragment> instead
                    <React.Fragment key={`${editor.baseUrl}_row_${rowId(row)}_tr_enclosure`}>
                      <tr
                        id={`${editor.baseUrl}_row_${rowId(row)}_row`}
                        key={`${editor.baseUrl}_row_${rowId(row)}_row`}
                        className={index % 2 ? `${APP_LISTING_TABLE_BODY_TR_ODD_CLASS}` : `${theme.secondary} ${APP_LISTING_TABLE_BODY_TR_EVEN_CLASS}`}
                        onMouseOver={() => {
                          actionsHandler('show', row);
                        }}
                        onClick={() => {
                          actionsHandler('toggle', row);
                        }}
                        onMouseLeave={() => {
                          actionsHandler('hide', row);
                        }}
                      >
                        {Object.keys(editor.fieldElements).map(
                          (key) =>
                            editor.fieldElements[key].listing && (
                              <td
                                key={`${editor.baseUrl}_row_${rowId(row)}_${key}_td`}
                                className={index % 2 ? APP_LISTING_TABLE_BODY_TD_ODD_CLASS : APP_LISTING_TABLE_BODY_TD_EVEN_CLASS}
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
                        {actionsHandlerAllowsMagicButton && (
                          <td
                            // Action buttons
                            key={`${editor.baseUrl}_row_${rowId(row)}_magicButton_td`}
                            colSpan={Object.keys(editor.fieldElements).length + 1}
                            className={index % 2 ? APP_LISTING_TABLE_BODY_TD_ACTIONS_ODD_CLASS : APP_LISTING_TABLE_BODY_TD_ACTIONS_EVEN_CLASS}
                          >
                            <div
                              id={`${editor.baseUrl}_row_${rowId(row)}_magicButton`}
                              key={`${editor.baseUrl}_row_${rowId(row)}_magicButton`}
                              className={VISIBLE_CLASS}
                            >
                              <GsIcons icon="menu-dots-more" />
                            </div>
                          </td>
                        )}
                      </tr>
                      <tr
                        id={`${editor.baseUrl}_row_${rowId(row)}_controls`}
                        key={`${editor.baseUrl}_row_${rowId(row)}_controls`}
                        className={(index % 2 ? APP_LISTING_TABLE_BODY_TR_ACTIONS_ODD_CLASS : `${theme.secondary} ${APP_LISTING_TABLE_BODY_TR_ACTIONS_EVEN_CLASS}`) + " " + HIDDEN_CLASS}
                        onMouseOver={() => {
                          actionsHandler('show', row);
                        }}
                        onClick={() => {
                          actionsHandler('toggle', row);
                        }}
                        onMouseLeave={() => {
                          actionsHandler('hide', row);
                        }}
                      >
                        <td
                          // Action buttons
                          key={`${editor.baseUrl}_row_${rowId(row)}_controls_td`}
                          colSpan={Object.keys(editor.fieldElements).length + 1}
                          className={index % 2 ? APP_LISTING_TABLE_BODY_TD_ACTIONS_ODD_CLASS : APP_LISTING_TABLE_BODY_TD_ACTIONS_EVEN_CLASS}
                        >
                          <button
                            key={`${editor.baseUrl}_row_${rowId(row)}_controls_eye`}
                            onClick={() => handleView(rowId(row))}
                            // className={`${BUTTON_LISTING_CLASS} ${BUTTON_RIGHT_SPACE_CLASS}`}
                            className={`${BUTTON_LISTING_CLASS}`}
                          >
                            <GsIcons icon="eye" />
                          </button>
                          <button
                            key={`${editor.baseUrl}_row_${rowId(row)}_controls_edit`}
                            onClick={() => handleModify(rowId(row))}
                            // className={`${BUTTON_LISTING_CLASS} ${BUTTON_RIGHT_SPACE_CLASS}`}
                            className={`${BUTTON_LISTING_CLASS}`}
                          >
                            <GsIcons icon="edit" />
                          </button>
                          <button
                            key={`${editor.baseUrl}_row_${rowId(row)}_controls_trash`}
                            onClick={() => handleDelete(rowId(row))}
                            className={`${BUTTON_LISTING_CLASS}`}
                          >
                            <GsIcons icon="trash" />
                          </button>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
          </div>
          {/* Toolbar */}
          <div
            key={`${editor.baseUrl}_toolbar`}
            className={APP_LISTING_TOOLBAR_TOP_DIV_CLASS + " " + (isWide ? APP_LISTING_TOOLBAR_TOP_DIV_WIDE_CLASS :  APP_LISTING_TOOLBAR_TOP_DIV_NOT_WIDE_CLASS)}
          >
            <CrudEditorPagination
              id={editor.baseUrl + "_pagination"}
              currentPage={currentPage}
              totalPages={rows.totalPages}
            />
            <CrudEditorRowsPerPage
              id={editor.baseUrl + "_newRowsPerPage"}
              rowsPerPage={rowsPerPage}
              handleRowsPerPageChange={handleRowsPerPageChange}
            />
            <CrudEditorSearch
              id={editor.baseUrl + "_searchText"}
              fieldElements={editor.fieldElements}
              handleCancel={handleCancel}
              value={searchText}
            />
            <CrudEditorNewButton
              id={editor.baseUrl + "_newButton"}
              handleNew={handleNew}
            />
          </div>
          {status && (
            <div>
              {status}
              {debug && "[GCE-99]"}
            </div>
          )}
        </>
      )}
      {(debug ? debugCache("GenericCrudEditorMain") : '')}
    </div>
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
    'formula',
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

export const GetFormData = (editorData, registry, calleeName = null) => {
  if (typeof registry === 'undefined') {
    registry = {};
  }
  let editorDataObj = ConvertToComponents(editorData, registry);
  editorDataObj["calleeName"] = calleeName;
  return editorDataObj;
}

const CrudEditorRowsPerPage = ({ id, rowsPerPage, handleRowsPerPageChange }) => {
  const { theme } = useAppContext();
  return (
    <div
      className={APP_LISTING_TOOLBAR_ROW_PER_PAGE_SECTION_CLASS}
    >
      <label
        htmlFor="newRowsPerPage"
        className={APP_LISTING_TOOLBAR_ROW_PER_PAGE_LABEL_CLASS}
      >
        {MSG_ROWS_PER_PAGE}:
      </label>
      {/* <input
        type="number"
        min="1"
        max="500"
        id="newRowsPerPage"
        value={rowsPerPage}
        className={APP_LISTING_TOOLBAR_ROW_PER_PAGE_INPUT_CLASS}
        onChange={handleRowsPerPageChange}
      /> */}
      <select
        id="newRowsPerPage"
        className={APP_LISTING_TOOLBAR_ROW_PER_PAGE_INPUT_CLASS + " " + theme.input}
        onChange={handleRowsPerPageChange}
        defaultValue={rowsPerPage}
      >
        <option
          key={ROWS_PER_PAGE}
          value={ROWS_PER_PAGE}
        >
          {ROWS_PER_PAGE}
        </option>
        {Array.from({ length: 10 }, (_, i) => (i + 1) * 10).map(value => (
          <option
            key={value}
            value={value}
          >
            {value}
          </option>
        ))}
        {rowsPerPage > 100 && (
          <option
            key={rowsPerPage}
            value={rowsPerPage}
          >
            {rowsPerPage}
          </option>
        )}
      </select>
    </div>
  );
}

const CrudEditorPagination = ({ id, currentPage, totalPages }) => {
  return (
    <div
      id={id}
      className={APP_LISTING_TOOLBAR_PAGINATION_SECTION_CLASS}
    >
      <button
        disabled={currentPage === 1}
        onClick={() => goToNewPage(currentPage - 1)}
        className={`${currentPage === 1 ? BUTTON_LISTING_DISABLED_CLASS : BUTTON_LISTING_CLASS}`}
      >
        <GsIcons
          icon="less-than"
          alt={MSG_PREVIOUS}
        />
      </button>
      <div
        id={id + "_nav_animation"}
        className={APP_LISTING_TOOLBAR_WAIT_ANIMATION_CLASS}
      >
        {WaitAnimation()}
      </div>
      <div
        className={APP_LISTING_TOOLBAR_PAGE_NUM_SECTION_CLASS}
      >
        {MSG_PAGE} {currentPage} {MSG_OF} {totalPages}
      </div>
      <button
        disabled={currentPage === totalPages}
        onClick={() => goToNewPage(currentPage + 1)}
        className={`${currentPage === totalPages ? BUTTON_LISTING_DISABLED_CLASS : BUTTON_LISTING_CLASS}`}
      >
        <GsIcons
          icon="greater-than"
          alt={MSG_NEXT}
        />
      </button>
    </div>
  );
}

const CrudEditorNewButton = ({ id, handleNew }) => {
  return (
    <button
      id={id}
      onClick={handleNew}
      className={BUTTON_LISTING_NEW_CLASS}
    >
      <div
        className={BUTTON_COMPOSED_LABEL_CLASS}
      >
          <GsIcons icon="plus" />&nbsp;{MSG_ACTION_NEW}
      </div>
    </button>
  );
}

const CrudEditorListingTitle = ({ baseUrl, title, handleRefresh }) => {
  return (
    <h2
      key={`${baseUrl}_title`}
      className={APP_TITLE_H1_CLASS}
    >
      {title + " - " + MSG_ACTION_LIST}
      <span
        className={APP_TITLE_RECYCLE_BUTTON_CLASS}
      >
        <button
          onClick={handleRefresh}
          className={BUTTON_LISTING_REFRESH_CLASS}
        >
          <GsIcons icon='arrows-rotate' />
        </button>
      </span>
    </h2>
  );
}
