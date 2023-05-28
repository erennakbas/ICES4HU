import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import ConfigService from "src/services/configService";
const configService = ConfigService();
//import Alert from "@material-ui/lab/Alert";

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...// if payload (user) is provided, then is authenticated
      (user
        ? {
            isAuthenticated: true,
            isLoading: false,
            user,
          }
        : {
            isLoading: false,
          }),
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;
    console.log("hayırlı işler")
    console.log(user);
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem("authenticated") === "true";
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      const user = {
        id: "5e86809283e28b96d2d38537",
        name: "Anika Visser",
        email: "anika.visser@devias.io",
      };

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user,
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE,
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const skip = () => {
    try {
      window.sessionStorage.setItem("authenticated", "true");
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: "5e86809283e28b96d2d38537",
      name: "Anika Visser",
      email: "anika.visser@devias.io",
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user,
    });
  };
  //COMMENT
  const signIn = async (id, password) => {
    //const params = new URLSearchParams();
    //params.append("schoolId", id);
    //params.append("password", password);
    //console.log(id + password);
    const params = {
      schoolId: id,
      password: password,
    };
    await axios
      .post(`${configService.url}/login`, params)
      .then(async function (response) {
        if (response !== null) {
          console.log(response);
          //let result = response.data.result;
          //if (response.data !== null) {
          //<Alert variant="outlined" severity="success">
          //  This is a success alert — check it out!
          //</Alert>;
          try {
            window.sessionStorage.setItem("authenticated", "true");
          } catch (err) {
            console.error(err);
          }

          const user = {
            id: response.data.id,
            schoolId: response.data.schoolId,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            department:response.data.department,
            role: response.data.role,
          };

          dispatch({
            type: HANDLERS.SIGN_IN,
            payload: user,
          });
        } else {
          //alert("Cant Login");
        }
      })
      .catch(function (error) {
        console.log(error);
        throw new Error("Please check your user id and password");
      });
    /*
    if (id !== "b21945944" || password !== "Password123!") {
      throw new Error("Please check your user id and password");
    }
*/
  };

  const signUp = async (signUpBody, router) => {
    try {
      await axios.post(`${configService.url}/enrollment_requests/signup`, signUpBody);
      alert("We've successfully got your enrollment request!");
      router.push("login");
    } catch (err) {
      console.log(err);
    }
  };

  const signOut = () => {
    window.sessionStorage.setItem("authenticated", "false");
    dispatch({
      type: HANDLERS.SIGN_OUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
