// GenericCrudEditor select components

import React, { useEffect, useState, useContext } from 'react';

import {
  MainSectionContext,
} from './generic.editor.rfc.provider.jsx';
import {
  getEditorData,
} from './generic.editor.rfc.common.jsx';
import {
  console_debug_log,
} from './logging.service.jsx';
import { dbApiService } from "./db.service.jsx";

import { MSG_SELECT_AN_OPTION } from "../constants/general_constants.jsx";

const debug = false;

export const GenericSelectGenerator = (props) => {
  const [state, setState] = useState(null);
  const [config, setConfig] = useState(null);
  const [rows, setRows] = useState(null);
  const {
    getCachedData,
    putCachedData,
    typeofCachedData,
    debugCache,
  } = useContext(MainSectionContext);

  useEffect(() => {
    setConfig(initConfig(props));
  }, [props]);

  useEffect(() => {
    const setRowsAndCache = (data) => {
      // select_cache[config.select_name] = data;
      putCachedData(config.select_name, data);
      setRows(data);
    }
    // if (config && typeof select_cache[config.select_name] !== 'undefined') {
    if (config && typeofCachedData(config.select_name) !== 'undefined') {
      // setRows(select_cache[config.select_name]);
      if (debug) {
        console_debug_log(`>> GENERICSELECTGENERATOR # 0 | config.select_name: ${config.select_name} | getCachedData(config.select_name):}`);
        console_debug_log(getCachedData(config.select_name));
      }
      setRows(getCachedData(config.select_name));
    } else {
      try {
        let accessKeysListing = {};
        if (config && config.dbFilter) {
          accessKeysListing = {
            ...accessKeysListing,
            ...config.dbFilter,
          };
          if (debug) {
            console_debug_log('>> GENERICSELECTGENERATOR # 1 | accessKeysListing:', accessKeysListing);
          }
        };
        config && config.dbService.getAll(accessKeysListing)
          .then(
            data => setRowsAndCache(data),
            error => setState(error)
          )
      } catch (error) {
        console.error(config.editor.title + '-Select | error object:', error);
      };
    }
  }, [config, getCachedData, putCachedData, typeofCachedData]);

  const initConfig = (props) => {
    const editor = getEditorData(props);
    return {
      dbService: new dbApiService({ url: editor.dbApiUrl }),
      filter:
        typeof props.filter !== 'undefined' ? props.filter : null,
      dbFilter: 
        typeof props.dbFilter !== 'undefined' ? props.dbFilter : null,
      show_description:
        typeof props.show_description !== 'undefined'
          ? props.show_description
          : false,
      description_fields:
        typeof props.description_fields !== 'undefined'
          ? props.description_fields
          : ["name"],
      editor: editor,
      select_name: editor.name,
    };
  }

  if (rows === null) {
    // Still not ready...
    return '';
  }

  if (state) {
    // Some error happens
    return state.toString();
  }

  const { filter, show_description, description_fields } = config;

  selectAnOptionItem = {}
  selectAnOptionItem['_id'] = null;
  selectAnOptionItem[config.description_fields[0]] = MSG_SELECT_AN_OPTION;
  for (let i = 1; i < config.description_fields.length; i++) {
    selectAnOptionItem[config.description_fields[i]] = '';
  }

  const selectOptions = [
    ...[...[selectAnOptionItem]],
    ...rows.resultset,
  ];

  if (debug) {
    debugCache("GenericSelectGenerator");
  }

  const buildDescription = (option, fieldArray) => {
    let description = '';
    fieldArray.forEach((field) => {
      description += option[field] + ' ';
    });
    return description;
  }

  return selectOptions
    .filter((option) => 
      filter === null ? true : config.dbService.convertId(option._id) === filter
    )
    .map((option) => {
      if (show_description) {
        return buildDescription(option, description_fields);
      }
      return (
        <option
          key={config.dbService.convertId(option._id)}
          value={config.dbService.convertId(option._id)}
        >
          {buildDescription(option, description_fields)}
        </option>
      );
    });
};

export const GenericSelectDataPopulator = (props) => {
  const [state, setState] = useState(null);
  const [config, setConfig] = useState(null);
  const [rows, setRows] = useState(null);
  const {
    getCachedData,
    putCachedData,
    typeofCachedData,
  } = useContext(MainSectionContext);

  const initConfig = (props) => {
    const editor = getEditorData(props);
    return {
      dbService: new dbApiService({ url: editor.dbApiUrl }),
      filter: props.filter !== undefined ? props.filter : null,
      dbFilter: props.dbFilter !== undefined ? props.dbFilter : null,
      editor: editor,
      select_name: editor.name,
      title_field_name:
        props.title_field_name !== undefined
          ? props.show_description
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
    if (state) {
      return state.toString();
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

  useEffect(() => {
    const setRowsAndCache = (data) => {
      putCachedData(config.select_name, data);
      setRows(data);
    }
    async function getData() {
      try {
        let accessKeysListing = {};
        if (config && config.dbFilter) {
          accessKeysListing = {
            ...accessKeysListing,
            ...config.dbFilter,
          };
        };
        console_debug_log('>> GENERICSELECTGENERATOR # 2 | accessKeysListing:');
        console_debug_log(accessKeysListing);
        config && config.dbService.getAll(accessKeysListing)
          .then(
            data => setRowsAndCache(data),
            error => setState(error)
          );
      } catch (error) {
        console_debug_log(config.editor.title + "-Select | error object:");
        console_debug_log(error);
      }
    }
    if (config && typeofCachedData(config.select_name) !== 'undefined') {
      setRows(getCachedData(config.select_name));
    } else {
      getData();
    }
  }, [config, getCachedData, putCachedData, typeofCachedData]);

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
        show_description={true}
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
      />
    );
  }
  // Returns plain value
  return value;
};
