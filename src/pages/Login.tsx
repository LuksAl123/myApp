import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading, useIonRouter } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { logInOutline, personCircleOutline } from 'ionicons/icons';
import FCC from '../assets/fcc.svg';
import Intro from '../components/Intro';
import { Preferences } from '@capacitor/preferences';
import { doLogin } from '../firebaseConfig';

const INTRO_KEY = 'intro-seen';

const Login: React.FC = () => {
    const router = useIonRouter();
    const [introSeen, setIntroSeen] = useState(true);
    const [present, dismiss] = useIonLoading();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const checkStorage = async () => {
            const seen = await Preferences.get({ key: INTRO_KEY });
            setIntroSeen(seen.value === 'true');
        }
        checkStorage();
    }, []);
    
    const login = async (event: React.FormEvent) => {
        event.preventDefault();
        await present('Logging in...');

        const res = await doLogin(username, password);
        console.log(`${res ? 'Login success' : 'Login failed'}`);

        setTimeout(async () => {
            dismiss();
            if (res) {
                router.push('/app', 'root');
            }
        }, 2000);
    };

    const finishIntro = async() => {
        setIntroSeen(true);
        await Preferences.set({ key: INTRO_KEY, value:'true' });
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
                    <IonToolbar color={'success'}>
                        <IonTitle>Free Code Camp</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent scrollY={false} className="ion-padding">
                    <IonGrid fixed>
                        <IonRow class="ion-justify-content-center">
                            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                                <div className="ion-text-center ion-padding">
                                    <img src={FCC} alt='FCC Logo' width={'50%'} />
                                </div>
                            </IonCol>
                        </IonRow>

                        <IonRow class="ion-justify-content-center">
                            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                                <IonCard>
                                    <IonCardContent>
                                        <form onSubmit={login}>
                                            <IonInput mode="md" fill="outline" labelPlacement="floating" label="Email" type="email" placeholder="example@email.com" onIonChange={(e: any) => setUsername(e.target.value)}></IonInput>
                                            <IonInput mode="md" className="ion-margin-top" fill="outline" labelPlacement="floating" label="Password" type="password" placeholder="******" onIonChange={(e: any) => setPassword(e.target.value)}></IonInput>
                                            <IonButton type="submit" expand="block" className="ion-margin-top">
                                                Login
                                                <IonIcon icon={logInOutline} slot="end" />
                                            </IonButton>
                                            <IonButton routerLink="/register" color={'secondary'} type="button" expand="block" className="ion-margin-top">
                                                Create Account
                                                <IonIcon icon={personCircleOutline} slot="end" />
                                            </IonButton>

                                            <IonButton onClick={seeIntroAgain} fill="clear" size="small" color={'medium'} type="button" expand="block" className="ion-margin-top">
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