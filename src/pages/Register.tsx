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
  IonLoading,
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
import useToast from "../hooks/useToast";
import { useFirebaseAuth } from "../firebaseConfig";


const Register: React.FC = () => {
  const router = useIonRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [busy, setBusy] = useState<boolean>(false);

  const { presentToast } = useToast();
  const { registerUser } = useFirebaseAuth();

  async function register(event: any) {
    event.preventDefault();
    setBusy(true); 

    if (password !== cpassword) {
      presentToast("Passwords do not match");
      setBusy(false); 
      return; 
    }

    if (username.trim() === '' || password.trim() === '') {
      presentToast("Username and password are required");
      setBusy(false);
      return;
    }

    const res = await registerUser(username, password);
    if (res) {
      presentToast("You have registered successfully!");
    }
    setBusy(false); 
  }

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

      <IonLoading message="Registration in progress!" duration={0} isOpen={busy} />

      <IonContent scrollY={false}>
        <IonGrid fixed>
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
              <IonCard>
                <IonCardContent>
                  <form onSubmit={register}>
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