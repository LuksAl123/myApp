import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import React, { useState } from "react";
import {
  checkmarkDoneOutline,
  logInOutline,
  personCircleOutline,
} from "ionicons/icons";

const Register: React.FC = () => {
  const router = useIonRouter();

  const doRegister = (event: any) => {
    event.preventDefault();
    console.log("doRegister");
    router.goBack();
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"success"}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Create Account</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent scrollY={false}>
        <IonGrid fixed>
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
              <IonCard>
                <IonCardContent>
                  <form onSubmit={doRegister}>
                    <IonInput
                      fill="outline"
                      labelPlacement="floating"
                      label="Email"
                      type="email"
                      placeholder="example@email.com"
                      onIonChange={(e: any) => setUsername(e.target.value)}
                    ></IonInput>
                    <IonInput
                      className="ion-margin-top"
                      fill="outline"
                      labelPlacement="floating"
                      label="Password"
                      type="password"
                      placeholder="******"
                      onIonChange={(e: any) => setPassword(e.target.value)}
                    ></IonInput>
                    <IonInput
                      className="ion-margin-top"
                      fill="outline"
                      labelPlacement="floating"
                      label="CPassword"
                      type="password"
                      placeholder="******"
                      onIonChange={(e: any) => setCPassword(e.target.value)}
                    ></IonInput>
                    <IonButton
                      type="submit"
                      expand="block"
                      className="ion-margin-top"
                    >
                      Create my account
                      <IonIcon icon={checkmarkDoneOutline} slot="end" />
                    </IonButton>
                  </form>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register;
