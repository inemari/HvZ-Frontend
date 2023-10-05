import Keycloak from 'keycloak-js';
import keycloakConfig from './keycloak.json'; // Import the configuration file

const keycloak = Keycloak(keycloakConfig);

/**
 * Initialize Keycloak and silently checking for an existing login.
 * @description Should be called before render() of app.
 * @returns { Promise<void> } Promise
 */
export const initialize = () => {
  const config = {
    checkLoginIframe: false,
  };
  return keycloak.init(config);
};

/** @type { Keycloak } keycloak */
export default keycloak;
