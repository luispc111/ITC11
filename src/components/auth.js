import axios from "axios";
import Cookies from "js-cookie";
import { PUBLIC_URL, BACKEND_URL } from "./utils";

/** ID de cliente de Google Cloud Platform para inicio de sesión con Google. */
const G_CLIENT_ID = "78830882271-iabhrh1kgh03rbb0js65vh0iftf6jkjh.apps.googleusercontent.com";

/** Nombre de la cookie utilizada para guardar la sesión de usuario. */
const TOKEN_NAME = "pde_id";

/**
 * Llamar al back-end para autenticar sesión iniciada.
 * En caso de sesión no válida, regresa error o nulo.
 * En caso de sesión exitosa, regres información del usuario registrado.
 */
async function authenticate() {
  if (!Cookies.get(TOKEN_NAME)) return null;
  
  const resAuth = await axios
    .post(`${BACKEND_URL}/login/auth`, { token: Cookies.get(TOKEN_NAME) })
    .catch((err) => err);
  if (resAuth instanceof Error) return resAuth;

  const { matricula } = resAuth.data.verification;
  const resUserGet = await axios
    .get(`${BACKEND_URL}/users/${matricula}`)
    .catch((err) => err);
  if (resUserGet instanceof Error) return resUserGet;

  return resUserGet.data;
};

/** Guardar la sesión en una cookie y refrescar la página. */
async function login(profileObj, addToast) {
  const resLogin = await axios.post(`${BACKEND_URL}/login/`, profileObj).catch((err) => err);
  if (resLogin instanceof Error) {
    const errMsg = resLogin.response
      ? resLogin.response.data.msg
      : "Hubo un error de conexión al servidor.";
    addToast(`Error: ${errMsg}`, {
      appearance: 'error',
      autoDismiss: true,
    });
    return;
  }
  Cookies.set(TOKEN_NAME, resLogin.data.token, { expires: 365 });
  window.location = `${PUBLIC_URL}/#/`;
}

/** Remover cookie de la sesión. */
function logout() {
  Cookies.remove(TOKEN_NAME);
  window.location = `${PUBLIC_URL}/#/`;
};

export { G_CLIENT_ID, TOKEN_NAME, authenticate, login, logout };
