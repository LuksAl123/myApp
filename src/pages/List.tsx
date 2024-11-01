import React, { useEffect, useRef, useState } from "react";
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonChip,
  IonContent,
  IonDatetime,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonModal,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import { addOutline, trashBinOutline } from "ionicons/icons";
import "./List.css";

const List: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [showAlert] = useIonAlert();
  const [showToast] = useIonToast();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const modal = useRef<HTMLIonModalElement>(null);
  const cardModal = useRef<HTMLIonModalElement>(null);
  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);
  const page = useRef(null);
  const [activeSegment, setActiveSegment] = useState<any>("details");

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  useIonViewWillEnter(async () => {
    const users = await getUsers();
    setUsers(users);
    setFilteredUsers(users); // initialize filtered list
    setLoading(false);
  });

  const getUsers = async () => {
    const data = await fetch("https://randomuser.me/api?results=10");
    const users = await data.json();
    return users.results;
  };

  const clearList = () => {
    showAlert({
      header: "Confirm!",
      message: "Are you sure you want to delete all users?",
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Delete",
          handler: () => {
            setUsers([]);
            setFilteredUsers([]);
            showToast({
              message: "All users deleted",
              duration: 2000,
              color: "danger",
            });
          },
        },
      ],
    });
  };

  const doRefresh = async (event: any) => {
    const data = await getUsers();
    setUsers(data);
    setFilteredUsers(data); // reset filtered list on refresh
    event.detail.complete();
  };

  const handleSearch = (event: CustomEvent) => {
    // Capture the raw input value, allowing for spaces
    const rawSearchTerm = event.detail.value;
    const searchTerm = rawSearchTerm.toLowerCase().replace(/\s+/g, " ").trim();
    setSearchText(rawSearchTerm); // Update with the raw input value

    setFilteredUsers(
      users.filter((user) => {
        const fullName = `${user.name.first} ${user.name.last}`
          .toLowerCase()
          .replace(/\s+/g, " ")
          .trim();
        return (
          fullName.includes(searchTerm) ||
          user.name.first.toLowerCase().includes(searchTerm) ||
          user.name.last.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm)
        );
      })
    );
  };

  return (
    <IonPage ref={page}>
      <IonHeader>
        <IonToolbar color={"success"}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>List</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={clearList}>
              <IonIcon
                slot="icon-only"
                icon={trashBinOutline}
                color={"light"}
              />
            </IonButton>
          </IonButtons>
        </IonToolbar>

        <IonToolbar color={"success"}>
          <IonSearchbar value={searchText} onIonInput={handleSearch} />
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={(ev) => doRefresh(ev)}>
          <IonRefresherContent />
        </IonRefresher>

        {loading &&
          [...Array(10)].map((_, index) => (
            <IonCard key={index}>
              <IonCardContent className="ion-no-padding">
                <IonItem lines="none">
                  <IonAvatar slot="start">
                    <IonSkeletonText />
                  </IonAvatar>
                  <IonLabel>
                    <IonSkeletonText animated style={{ width: "150px" }} />
                    <p>
                      <IonSkeletonText />
                    </p>
                  </IonLabel>
                  <IonChip slot="end" color={"primary"}></IonChip>
                </IonItem>
              </IonCardContent>
            </IonCard>
          ))}

        {filteredUsers.map((user, index) => (
          <IonCard key={index} onClick={() => setSelectedUser(user)}>
            <IonCardContent className="ion-no-padding">
              <IonItem lines="none">
                <IonAvatar slot="start">
                  <IonImg src={user.picture.large} />
                </IonAvatar>
                <IonLabel>
                  {user.name.first} {user.name.last}
                  <p>{user.email}</p>
                </IonLabel>
                <IonChip slot="end" color={"primary"}>
                  {user.nat}
                </IonChip>
              </IonItem>
            </IonCardContent>
          </IonCard>
        ))}

        {/* Rest of your code for Modals */}
      </IonContent>
    </IonPage>
  );
};

export default List;
