import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
  } from "@ionic/react";
  import React from "react";
  import Intro from "../components/Intro";
  
  const INTRO_KEY = "intro-seen";
  
  const Dashboard: React.FC = () => {
    return (
          <IonPage>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Dashboard</IonTitle>
              </IonToolbar>
            </IonHeader>
  
            <IonContent scrollY={false} className="ion-padding">
              <p>Hello </p>
            </IonContent>
          </IonPage>
    )
}
  
  export default Dashboard;