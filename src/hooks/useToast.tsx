import { useIonToast } from "@ionic/react";

const useToast = () => {
  const [present] = useIonToast();

  const presentToast = (message: string, duration = 2000) => {
    present({
      message,
      duration,
      position: "bottom",
    });
  };

  return { presentToast };
};

export default useToast;
