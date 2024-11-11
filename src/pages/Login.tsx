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
  IonLoading,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import { logInOutline, personCircleOutline } from "ionicons/icons";
import FCC from "../assets/fcc.svg";
import Intro from "../components/Intro";
import { Preferences } from "@capacitor/preferences";
import { useFirebaseAuth } from "../firebaseConfig";
import useToast from "../hooks/useToast";
import { AuthContext } from "../contexts/AuthContext";

const INTRO_KEY = "intro-seen";

const Login: React.FC = () => {
  const router = useIonRouter();
  const { presentToast } = useToast();
  const { loginUser } = useFirebaseAuth();
  const [introSeen, setIntroSeen] = useState(true);
  // const [present, dismiss] = useIonLoading();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState<boolean>(false);
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { setAuth, auth } = authContext;

  useEffect(() => {
    const checkStorage = async () => {
      const seen = await Preferences.get({ key: INTRO_KEY });
      setIntroSeen(seen.value === "true");
    };
    checkStorage();
  }, []);
  
  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    setBusy(true);

    const res: any = await loginUser(username, password);

    console.log(res);
    
    if (res) {
      presentToast("You have logged in!");
      setAuth({email: res.email});
      setBusy(false);
      setTimeout(() => {
        router.push("/app", "root");
      }, 300);
    } else {
      setBusy(false);
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

          <IonLoading message="Please wait..." duration={0} isOpen={busy} />

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
