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
import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import List from "./List";
import Settings from "./Settings";
import { homeOutline, logOutOutline, newspaperOutline } from "ionicons/icons";
import { AuthContext } from "../contexts/AuthContext";

const Menu: React.FC = () => {
  const { auth, deleteUserData } = useContext(AuthContext);

  const paths = [
    { name: "Home", url: "/app/list", icon: homeOutline },
    { name: "Settings", url: "/app/settings", icon: newspaperOutline },
  ];

  return (
    <IonPage>
      <IonSplitPane contentId="main">
        <IonMenu contentId="main">
          <IonHeader>
            <IonToolbar color="secondary">
              <IonTitle>Menu</IonTitle>
            </IonToolbar>

            <IonToolbar color="light">
              <div className="ion-padding" style={{ textAlign: 'center' }}>
                <p style={{ fontWeight: 'bold', color: 'dark' }}>
                  {auth?.email}
                </p>
              </div>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {paths.map((item, index) => (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem detail={true} routerLink={item.url} routerDirection="none">
                  <IonIcon slot="start" icon={item.icon} />
                  {item.name}
                </IonItem>
              </IonMenuToggle>
            ))}

            <IonMenuToggle autoHide={false}>
            <IonButton expand="full" onClick={deleteUserData}>
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
