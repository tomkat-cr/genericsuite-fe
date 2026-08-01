// GenericCrudEditor select components

import React, { useContext, useEffect, useState } from 'react';

import { dbApiService } from "./db.service.jsx";
import {
  getEditorData,
} from './generic.editor.rfc.common.jsx';
import {
  MainSectionContext,
} from './generic.editor.rfc.provider.jsx';
import {
  console_debug_log,
} from './logging.service.jsx';

import { MSG_SELECT_AN_OPTION } from "../constants/general_constants.jsx";

const debug = true;

export const buildDescription = (itemData, fieldArray) => {
  let description = '';
  fieldArray.forEach((field) => {
    description += itemData[field] + ' ';
  });
  return description.trim();
}

export const useRelatedTableRows = (currentObj) => {
  /*
   * Fetches (with cache) the related table rows for a select_table field.
   * Returns { rows, errorState, convertKey } where convertKey normalizes
   * the related_key value of a row to a comparable string.
   */
  const [errorState, setErrorState] = useState(null);
  const [rows, setRows] = useState(null);
  const { fetchOrCache } = useContext(MainSectionContext);
  const relatedTable = currentObj.related_table;
  const relatedKey = currentObj.related_key || '_id';
  const dbFilter = currentObj.related_filter || {};

  useEffect(() => {
    if (!relatedTable) {
      setErrorState('select_table: missing related_table attribute');
      return;
    }
    const dbService = new dbApiService({ url: relatedTable });
    // Include related_key and related_filter in the cache key: two
    // select_table fields can share the same related_table but scope
    // different subsets of rows via related_filter (or key off a
    // different related_key), and must not collide on the same cache
    // entry (see genericsuite-mobile crud_editor.dart for the matching
    // fix on the Flutter side).
    const cacheKey =
      `select_table_${relatedTable}_${relatedKey}_${JSON.stringify(dbFilter)}`;
    fetchOrCache(cacheKey, () => dbService.getAll(dbFilter))
      .then(
        data => setRows(data),
        error => setErrorState(error)
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [relatedTable, fetchOrCache]);

  const convertValue = (value) => {
    const dbService = new dbApiService({ url: relatedTable });
    return relatedKey === '_id'
      ? dbService.convertId(value)
      : String(value);
  };

  const convertKey = (row) => convertValue(row[relatedKey]);

  return { rows, errorState, convertKey, convertValue };
};

export const buildSelectTableDescription = (row, currentObj) => {
  const descriptionFields = currentObj.description_fields || ['name'];
  const separator = typeof currentObj.description_separator !== 'undefined'
    ? currentObj.description_separator : ' ';
  return descriptionFields
    .map((field) => row[field])
    .filter((value) => value !== null && typeof value !== 'undefined')
    .join(separator);
};

export const SelectTableDescription = ({ currentObj, dbRow }) => {
  /*
   * Client-side fallback: shows the related record description for a
   * select_table field when the backend didn't provide
   * `{name}_description` (older backend versions).
   */
  const { rows, errorState, convertKey, convertValue } = useRelatedTableRows(currentObj);

  if (errorState) {
    return errorState.toString();
  }
  if (rows === null) {
    return '';
  }
  const fkValue = dbRow[currentObj.local_field || currentObj.name];
  if (fkValue === null || typeof fkValue === 'undefined') {
    return '';
  }
  const match = rows.resultset.find(
    (row) => convertKey(row) === convertValue(fkValue)
  );
  if (!match) {
    return '';
  }
  return buildSelectTableDescription(match, currentObj);
};

export const SelectTableOptions = ({ currentObj }) => {
  /*
   * Options generator for a select_table field's editable dropdown.
   * Fetches (with cache) the related table rows and renders one
   * <option> per row, plus the "Select an option" placeholder.
   */
  const { rows, errorState, convertKey } = useRelatedTableRows(currentObj);

  if (errorState) {
    return (
      <option value="">{errorState.toString()}</option>
    );
  }
  if (rows === null) {
    return null;
  }
  return [
    <option key="_placeholder" value="">{MSG_SELECT_AN_OPTION}</option>,
    ...rows.resultset.map((row) => {
      const keyValue = convertKey(row);
      return (
        <option key={keyValue} value={keyValue}>
          {buildSelectTableDescription(row, currentObj)}
        </option>
      );
    }),
  ];
};

export const GenericSelectGenerator = (props) => {
  /*
   * Select options generator component.
   * Return the description for the select value if show_description is true,
   * otherwise returns one or more <option>...</option> for a <select>, sending
   * a request to the API, and adding a <option>...</option> with the key and description for each row returned
   *
   * Parameters:
   *  filter: filter by _id. Default to no filter (null)
   *  dbFilter: database query filter. Default to no filter (null)
   *  show_description: if true, show description in the listing page or read-only form page, otherwise builds the <option>. Default is false
   *  description_fields: array of fields to show in the description. Default is ["name"]
   */
  const [errorState, setErrorState] = useState(null);
  const [config, setConfig] = useState(null);
  const [rows, setRows] = useState(null);
  const {
    // getCachedData,
    // putCachedData,
    // typeofCachedData,
    debugCache,
    fetchOrCache,
  } = useContext(MainSectionContext);

  useEffect(() => {
    setConfig(initConfig(props));
  }, [props]);

  useEffect(() => {
    if (config) {
      const accessKeysListing = config.dbFilter || {};
      fetchOrCache(config.select_name, () => config.dbService.getAll(accessKeysListing))
        .then(
          data => setRows(data),
          error => setErrorState(error)
        )
        .catch(error => {
          console.error(config.editor.title + '-Select | error object:', error);
        });
    }
  }, [config, fetchOrCache]);

  const initConfig = (props) => {
    const editor = getEditorData(props);
    return {
      // dbService: database service instance
      dbService: new dbApiService({ url: editor.dbApiUrl }),
      // editor: editor configuration
      editor: editor,
      // select_name: name of the select, taken from the editor name
      select_name: editor.name,
      // filter: filter by _id. Default to no filter (null)
      filter:
        typeof props.filter !== 'undefined' ? props.filter : null,
      // dbFilter: database query filter. Default to no filter (null)
      dbFilter:
        typeof props.dbFilter !== 'undefined' ? props.dbFilter : null,
      // show_description: if true, show description in the listing page or read-only form page. Default is false
      show_description:
        typeof props.show_description !== 'undefined'
          ? props.show_description
          : false,
      // description_fields: array of fields to show in the description. Default is ["name"]
      description_fields:
        typeof props.description_fields !== 'undefined'
          ? props.description_fields
          : ["name"],
    };
  }

  if (rows === null) {
    // Still not ready...
    return '';
  }

  if (errorState) {
    // Some error happens
    return errorState.toString();
  }

  const { filter, show_description, description_fields, dbService } = config;

  let selectAnOptionItem = {}
  selectAnOptionItem['_id'] = null;
  selectAnOptionItem[description_fields[0]] = MSG_SELECT_AN_OPTION;
  for (let i = 1; i < description_fields.length; i++) {
    selectAnOptionItem[description_fields[i]] = '';
  }

  const selectOptions = [
    ...[...[selectAnOptionItem]],
    ...rows.resultset,
  ];

  if (debug) {
    debugCache("GenericSelectGenerator");
  }

  return selectOptions
    .filter((option) =>
      filter === null ? true : dbService.convertId(option._id) === filter
    )
    .map((option) => {
      if (show_description) {
        return buildDescription(option, description_fields);
      }
      return (
        <option
          key={dbService.convertId(option._id)}
          value={dbService.convertId(option._id)}
        >
          {buildDescription(option, description_fields)}
        </option>
      );
    });
};

export const GenericSelectDataPopulator = (props) => {
  /*
   * Generic select data populator component.
   * Return the data for a select, sending a request to the API, and adding a <option>...</option> with the key and description for each row returned
   *
   * Parameters:
   *  filter: filter by _id. Default to no filter (null)
   *  dbFilter: database query filter. Default to no filter (null)
   *  columns: columns to show in the listing page or read-only form page. Default is "" meaning all columns
   *  title_field_name: field name to show in the title. Default is "title"
   *  value_field_name: field name to show in the value. Default is "value"
   *  key_name: field name to show in the key. Default is "_id"
   */
  const [errorState, setErrorState] = useState(null);
  const [config, setConfig] = useState(null);
  const [rows, setRows] = useState(null);
  const {
    // getCachedData,
    // putCachedData,
    // typeofCachedData,
    fetchOrCache,
  } = useContext(MainSectionContext);

  const initConfig = (props) => {
    const editor = getEditorData(props);
    return {
      dbService: new dbApiService({ url: editor.dbApiUrl }),
      filter: props.filter !== undefined ? props.filter : null,
      dbFilter: props.dbFilter !== undefined ? props.dbFilter : null,
      editor: editor,
      select_name: editor.name,
      // columns: props.columns !== undefined
      //   ? props.columns
      //   : '',
      title_field_name:
        props.title_field_name !== undefined
          ? props.title_field_name
          : "title",
      value_field_name:
        props.value_field_name !== undefined
          ? props.value_field_name
          : "value",
      key_name:
        props.key_name !== undefined
          ? props.key_name
          : "_id",
    };
  }

  const returnData = () => {
    const { filter, title_field_name, value_field_name, key_name, dbService } = config;
    if (!rows) {
      return '';
    }
    if (errorState) {
      return errorState.toString();
    }
    const array_options = rows.resultset
      .filter((option) =>
        filter === null ? true : dbService.convertId(option[key_name]) === filter
      )
      .map((option) => {
        let element = {};
        element[title_field_name] = option.name;
        element[value_field_name] = dbService.convertId(option[key_name])
        return element;
      });
    return putSelectOptionsFromArray(array_options);
  }

  useEffect(() => {
    setConfig(initConfig(props));
  }, [props]);

  if (config) {
    const accessKeysListing = config.dbFilter || {};
    // if (config.columns !== '') {
    //   accessKeysListing['gs_listing_columns'] = config.columns;
    // }
    fetchOrCache(config.select_name, () => config.dbService.getAll(accessKeysListing))
      .then(
        data => setRows(data),
        error => setErrorState(error)
      );
  }

  return returnData();
};

export const putSelectOptionsFromArray = (
  select_array_elements,
  title_field_name = "title",
  value_field_name = "value"
) => {
  let emptyElement = {};
  emptyElement[title_field_name] = MSG_SELECT_AN_OPTION;
  emptyElement[value_field_name] = null;
  if (debug) {
    console_debug_log(`putSelectOptionsFromArray | title_field_name: ${title_field_name} | value_field_name: ${value_field_name} | select_array_elements:`, select_array_elements);
  }
  const selectOptions = [...[emptyElement], ...select_array_elements];
  return selectOptions.map((option) => (
    <option key={option[value_field_name]} value={option[value_field_name]}>
      {option[title_field_name]}
    </option>
  ));
}

export const getSelectDescription = (currentObj, dbRow) => {
  if (debug) {
    console_debug_log("getSelectDescription - currentObj, dbRow:", currentObj, dbRow);
  }
  // Component select (with specific select component and data populator)
  if (currentObj.type === 'select_component') {
    const filter = (
      typeof dbRow[currentObj.name] !== "undefined" ?
        dbRow[currentObj.name].toString() : null
    )
    return (
      <currentObj.component
        filter={filter}
        dbRow={dbRow}
        show_description={true}
        currentObj={currentObj}
      />
    );
  }
  // Related table select (1-1 relationship)
  if (currentObj.type === 'select_table') {
    const descAttr = currentObj.name + '_description';
    if (typeof dbRow[descAttr] !== 'undefined' && dbRow[descAttr] !== null) {
      return dbRow[descAttr];
    }
    return (
      <SelectTableDescription
        currentObj={currentObj}
        dbRow={dbRow}
      />
    );
  }
  // Generic select
  if (currentObj.type === 'select') {
    return currentObj.select_elements
      .filter((option) =>
        dbRow[currentObj.name] && option.value === dbRow[currentObj.name].toString()
      )
      .map((option) => option.title);
  }
  // Verify if the attribute (field) exists, if not, the value will be Null
  let value = null;
  if (typeof dbRow[currentObj.name] !== 'undefined') {
    value = dbRow[currentObj.name];
  }
  // Show specific component
  if (currentObj.type === 'component' || typeof currentObj.component !== 'undefined') {
    return (
      <currentObj.component
        value={value}
        dbRow={dbRow}
        listing="1"
        currentObj={currentObj}
      />
    );
  }
  // Returns plain value
  return value;
};
