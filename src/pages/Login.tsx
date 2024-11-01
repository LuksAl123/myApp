import {
  IonButton,
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
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { logInOutline, personCircleOutline } from "ionicons/icons";
import FCC from "../assets/fcc.svg";
import Intro from "../components/Intro";
import { Preferences } from "@capacitor/preferences";
import { doLogin } from "../firebaseConfig";
import useToast from "../hooks/useToast";

const INTRO_KEY = "intro-seen";

const Login: React.FC = () => {
  const router = useIonRouter();
  const { presentToast } = useToast();

  const [introSeen, setIntroSeen] = useState(true);
  // const [present, dismiss] = useIonLoading();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkStorage = async () => {
      const seen = await Preferences.get({ key: INTRO_KEY });
      setIntroSeen(seen.value === "true");
    };
    checkStorage();
  }, []);

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const res = await doLogin(username, password);
    if (!res) {
      console.log("teste login error");
      presentToast("Error logging in with your credentials");
    } else {
      console.log("teste login successfull");
      presentToast("You have logged in!");

      router.push("/app", "root"); // Only push the route if login is successful
    }
  }

  const finishIntro = async () => {
    setIntroSeen(true);
    await Preferences.set({ key: INTRO_KEY, value: "true" });
  };

  const seeIntroAgain = () => {
    setIntroSeen(false);
    Preferences.remove({ key: INTRO_KEY });
  };

  return (
    <>
      {!introSeen ? (
        <Intro onFinish={finishIntro} />
      ) : (
        <IonPage>
          <IonHeader>
            <IonToolbar color={"success"}>
              <IonTitle>Free Code Camp</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent scrollY={false} className="ion-padding">
            <IonGrid fixed>
              <IonRow class="ion-justify-content-center">
                <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                  <div className="ion-text-center ion-padding">
                    <img src={FCC} alt="FCC Logo" width={"50%"} />
                  </div>
                </IonCol>
              </IonRow>

              <IonRow class="ion-justify-content-center">
                <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                  <IonCard>
                    <IonCardContent>
                      <form onSubmit={login}>
                        <IonInput
                          mode="md"
                          fill="outline"
                          labelPlacement="floating"
                          label="Email"
                          type="email"
                          placeholder="example@email.com"
                          onIonChange={(e: any) => setUsername(e.target.value)}
                        ></IonInput>
                        <IonInput
                          mode="md"
                          className="ion-margin-top"
                          fill="outline"
                          labelPlacement="floating"
                          label="Password"
                          type="password"
                          placeholder="******"
                          onIonChange={(e: any) => setPassword(e.target.value)}
                        ></IonInput>
                        <IonButton
                          type="submit"
                          expand="block"
                          className="ion-margin-top"
                        >
                          Login
                          <IonIcon icon={logInOutline} slot="end" />
                        </IonButton>
                        <IonButton
                          routerLink="/register"
                          color={"secondary"}
                          type="button"
                          expand="block"
                          className="ion-margin-top"
                        >
                          Create Account
                          <IonIcon icon={personCircleOutline} slot="end" />
                        </IonButton>

                        <IonButton
                          onClick={seeIntroAgain}
                          fill="clear"
                          size="small"
                          color={"medium"}
                          type="button"
                          expand="block"
                          className="ion-margin-top"
                        >
                          Watch intro again
                          <IonIcon icon={personCircleOutline} slot="end" />
                        </IonButton>
                      </form>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonPage>
      )}
    </>
  );
};

export default Login;
