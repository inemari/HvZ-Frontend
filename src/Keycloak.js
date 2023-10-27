import Keycloak from "keycloak-js";


// Initialize a new Keycloak instance using the keycloak.json configuration file.
const keycloak = new Keycloak("/keycloak.json");

/**
 * Initialize Keycloak and silently check for an existing login. Should be called before render() of app.
 */
export const initialize = () => {
  const config = {
    checkLoginIframe: false,
    onLoad: "check-sso",
    silentCheckSsoRedirectUri:
      window.location.origin + "/silent-check-sso.html",
  };
  return keycloak.init(config);
};

export default keycloak;