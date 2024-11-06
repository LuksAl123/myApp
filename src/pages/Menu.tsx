import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { Redirect, Route, useHistory } from "react-router";
import List from "./List";
import Settings from "./Settings";
import { homeOutline, logOutOutline, newspaperOutline } from "ionicons/icons";
import { logoutUser } from "../firebaseConfig";

const Menu: React.FC = () => {
  const paths = [
    { name: "Home", url: "/app/list", icon: homeOutline },
    { name: "Settings", url: "/app/settings", icon: newspaperOutline },
  ];

  const history = useHistory();
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    await logoutUser();
    setBusy(false);
    history.replace('/');
  }

  return (
    <IonPage>
      <IonSplitPane contentId="main">
        <IonMenu contentId="main">
          <IonHeader>
            <IonToolbar color={"secondary"}>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {paths.map((item, index) => (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  detail={true}
                  routerLink={item.url}
                  routerDirection="none"
                >
                  <IonIcon slot="start" icon={item.icon} />
                  {item.name}
                </IonItem>
              </IonMenuToggle>
            ))}

            <IonMenuToggle autoHide={false}>
              <IonButton onClick={logout} expand="full" routerLink="/" routerDirection="root">
                <IonIcon slot="start" icon={logOutOutline} />
                Logout
              </IonButton>
            </IonMenuToggle>
          </IonContent>
        </IonMenu>

        <IonRouterOutlet id="main">
          <Route exact path="/app/list" component={List} />
          <Route path="/app/settings" component={Settings} />
          <Route exact path="/app">
            <Redirect to="/app/list" />
          </Route>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonPage>
  );
};

export default Menu;
