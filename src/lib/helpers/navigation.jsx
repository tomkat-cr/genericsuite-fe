// Navigation helpers to allow better testability by mocking these functions
// instead of direct window.location access which is non-configurable in JSDOM.

export const getWindowLocationOrigin = () => window.location.origin;

export const getWindowLocationHref = () => window.location.href;

export const getWindowLocation = () => window.location;

export const windowLocationReload = (hardReload = false) => window.location.reload(hardReload);

export const setWindowLocationHref = (url) => {
    window.location.href = url;
};
