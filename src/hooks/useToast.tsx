import { useIonToast } from "@ionic/react";

const useToast = () => {
  const [present] = useIonToast();

  const presentToast = (message: string) => {
    present({
      message,
      duration: 2000,
      position: "bottom",
    });
  };

  return { presentToast };
};

export default useToast;
