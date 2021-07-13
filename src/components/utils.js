const PUBLIC_URL = process.env.PUBLIC_URL;

/** URL used to connect to the back-end of the application, picking between the
 * appropiate both for development and for production
 */
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

/** Función para convertir de un objeto a un string query para URL */
function toQueryString(query) {
  return Object.keys(query)
    .map((key) => key + "=" + query[key])
    .join("&");
}

export { PUBLIC_URL, BACKEND_URL, toQueryString };
