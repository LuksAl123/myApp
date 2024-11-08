import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import List from "./pages/List";
import Settings from "./pages/Settings";
import React, { useState, useContext } from "react";
import AuthGuard from './guards/AuthGuard';
import { AuthContext } from "./Contexts/AuthContext";

setupIonicReact();

const App: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { auth } = authContext;

  const onLogin = () => {
    authContext.setAuth(true);
  };

  const onLogout = () => {
    authContext.setAuth(false);
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* Check if user is authenticated */}
          {auth ? (
            // Private routes for authenticated users
            <>
              <Route component={Menu} path="/app" exact />
              <Route component={List} path="/list" exact />
              <Route component={Settings} path="/settings" exact />
            </>
          ) : (
            // Public routes for non-authenticated users
            <>
              <Route exact path="/">
                <Login onLogin={onLogin} />
              </Route>
              <Route component={Register} path="/register" exact />
            </>
          )}
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;