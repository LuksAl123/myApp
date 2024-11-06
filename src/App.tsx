import { Route, useHistory } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonSpinner, setupIonicReact } from "@ionic/react";
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
import { useEffect, useState } from "react";
import { getCurrentUser } from "./firebaseConfig";
import List from "./pages/List";
import { useDispatch } from "react-redux";
import { setUserState } from "./redux/actions";

const RoutingSystem: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/">
          <Login />
        </Route>
        <Route component={List} path="/list" exact />
        <Route component={Register} path="/register" exact />
        <Route component={Menu} path="/app" />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

const App: React.FC = () => {

  const [busy, setBusy] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

  /*useEffect(() => {
    getCurrentUser().then((user : any) => {
      console.log('User:', user);
      if(user) {
        dispatch(setUserState(user.email));
        history.replace('/list');
      } else {
        history.replace('/');
      }
      setBusy(false);
      })
  }, [])*/

  return (
    <IonApp> 
      {< RoutingSystem />}
      {/*busy ? <IonSpinner /> : < RoutingSystem />*/}
    </IonApp>
  )
};

export default App;