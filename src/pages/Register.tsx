import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import React from 'react';
import { checkmarkDoneOutline, logInOutline, personCircleOutline } from 'ionicons/icons';

const Register: React.FC = () => {
    const router = useIonRouter();

    const doRegister = (event: any) => {
        event.preventDefault();
        console.log('doRegister');
        router.goBack();
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'success'}>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                    <IonTitle>Create Account</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollY={false}>
                <IonCard>
                <IonCardContent>
                    <form onSubmit={doRegister}>
                        <IonInput fill="outline" labelPlacement="floating" label="Email" type="email" placeholder="example@email.com" ></IonInput>
                        <IonInput className="ion-margin-top" fill="outline" labelPlacement="floating" label="Password" type="password" placeholder="******" ></IonInput>
                        <IonButton type="submit" expand="block" className="ion-margin-top">
                            Create my account
                            <IonIcon icon={checkmarkDoneOutline} slot="end" />
                        </IonButton>
                    </form>
                </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Register;