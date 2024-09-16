// Components
import { About, AboutBody } from './components/About/About.jsx';
import { App } from './components/App/App.jsx';
import { HomePage } from './components/HomePage/HomePage.jsx';
import { LoginPage } from './components/LoginPage/LoginPage.jsx';
import { GeneralConfig_EditorData, GeneralConfig } from './components/SuperAdminOptions/GeneralConfig.jsx';
import { Users_EditorData, Users, UsersValidations, UsersDbListPreRead, UsersPasswordValidations, UsersDbPreWrite } from './components/SuperAdminOptions/Users.jsx';
import { UsersProfile_EditorData, UserProfileEditor } from './components/UsersMenu/UserProfile.jsx';
import { UsersConfig_EditorData, UsersConfig } from './components/UsersMenu/UsersConfig.jsx';
import { AppFooter } from './components/AppFooter/AppFooter.jsx';
// Constants
import * as appConstants from './constants/app_constants.jsx';
import * as classNameConstants from './constants/class_name_constants.jsx';
import * as generalConstants from './constants/general_constants.jsx';
// Helpers
import * as authHeader from './helpers/auth-header.jsx';
import * as conversions from './helpers/conversions.jsx';
import * as dateTimestamp from './helpers/date-timestamp.jsx';
import * as dictUtilities from './helpers/dict-utilities.jsx';
import * as errorAndReenter from './helpers/error-and-reenter.jsx';
import * as history from './helpers/history.jsx';
import * as jsonUtilities from './helpers/json-utilities.jsx';
import * as media from './helpers/media.jsx';
import * as ModalPopUp from './helpers/ModalPopUp.jsx';
import * as PrivateRoute from './helpers/PrivateRoute.jsx';
import * as ui from './helpers/ui.jsx';
import * as urlParams from './helpers/url-params.jsx';
import * as IconsLib from './helpers/IconsLib.jsx';
import * as UserContext from './helpers/UserContext.jsx';
import * as AppContext from './helpers/AppContext.jsx';
import * as NavLib from './helpers/NavLib.jsx';
// Services
import * as authenticationService from './services/authentication.service.jsx';
import * as blobFilesUtilities from './services/blob.files.utilities.jsx';
import * as dbService from './services/db.service.jsx';
import * as genericEditorRfcCommon from './services/generic.editor.rfc.common.jsx';
import * as genericEditorRfcFormpage from './services/generic.editor.rfc.formpage.jsx';
import * as genericEditorRfcProvider from './services/generic.editor.rfc.provider.jsx';
import * as genericEditorRfcSearchEngineButton from './services/generic.editor.rfc.search.engine.button.jsx';
import * as genericEditorRfcSearch from './services/generic.editor.rfc.search.jsx';
import * as genericEditorRfcSelector from './services/generic.editor.rfc.selector.jsx';
import * as genericEditorRfcService from './services/generic.editor.rfc.service.jsx';
import * as genericEditorRfcSpecificFunc from './services/generic.editor.rfc.specific.func.jsx';
import * as genericEditorRfcSuggestionDropdown from './services/generic.editor.rfc.suggestion.dropdown.jsx';
import * as genericEditorRfcTimestamp from './services/generic.editor.rfc.timestamp.jsx';
import * as genericEditorRfcUi from './services/generic.editor.rfc.ui.jsx';
import * as genericEditorSinglepage from './services/generic.editor.singlepage.jsx';
import * as genericEditorUtilities from './services/generic.editor.utilities.jsx';
import * as genericMenuService from './services/generic.menu.service.jsx';
import * as loggingService from './services/logging.service.jsx';
import * as logoutService from './services/logout.service.jsx';
import * as ramdomize from './services/ramdomize.jsx';
import * as responseHandlersService from './services/response.handlers.service.jsx';
import * as waitAnimationUtility from './services/wait.animation.utility.jsx';
// Images
// const appLogoEmblem = 'app_log_emblem.svg';
const appLogoCircle = 'app_logo_circle.svg';
const appLogoLandscape = 'app_logo_landscape.svg';
// const appLogoSquare = 'app_logo_square.svg';
// const arrowsRotateSolid = 'arrows_rotate_solid.svg';
// const clip = 'clip.svg';
// const googleLogo = 'google_logo.svg';
// const madebyLogoEmblem = 'madeby_logo_emblem.svg';
// const madebyLogoSquare = 'madeby_logo_square.svg';
// const spark = 'spark.svg';

export {
    // Components
    About, AboutBody,
    App,
    HomePage,
    LoginPage,
    GeneralConfig, GeneralConfig_EditorData,
    Users_EditorData, Users, UsersValidations, UsersDbListPreRead, UsersPasswordValidations, UsersDbPreWrite,
    UsersProfile_EditorData, UserProfileEditor,
    UsersConfig_EditorData, UsersConfig,
    AppFooter,
    appConstants,
    classNameConstants,
    generalConstants,
    // Helpers
    authHeader,
    conversions,
    dateTimestamp,
    dictUtilities,
    errorAndReenter,
    history,
    jsonUtilities,
    media,
    ModalPopUp,
    PrivateRoute,
    ui,
    urlParams,
    IconsLib,
    UserContext,
    AppContext,
    NavLib,
    // Services
    authenticationService,
    blobFilesUtilities,
    dbService,
    // genericEditorRfcAiButton,
    genericEditorRfcCommon,
    genericEditorRfcFormpage,
    genericEditorRfcProvider,
    genericEditorRfcSearchEngineButton,
    genericEditorRfcSearch,
    genericEditorRfcSelector,
    genericEditorRfcService,
    genericEditorRfcSpecificFunc,
    genericEditorRfcSuggestionDropdown,
    genericEditorRfcTimestamp,
    genericEditorRfcUi,
    genericEditorSinglepage,
    genericEditorUtilities,
    genericMenuService,
    loggingService,
    logoutService,
    ramdomize,
    responseHandlersService,
    waitAnimationUtility,
    // Images
    // appLogoEmblem,
    appLogoCircle,
    appLogoLandscape,
    // appLogoSquare,
    // arrowsRotateSolid,
    // clip,
    // googleLogo,
    // madebyLogoEmblem,
    // madebyLogoSquare,
    // spark,
}