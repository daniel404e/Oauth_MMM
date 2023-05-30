import { useCallback, useState } from "react";
import Modal from "../components/Modal";
import { useSocialAuth } from "../hooks/useSocialAuth";
import { FETCH_OPTIONS, env } from "../constants";

export function DashboardPage() {
  const { user, setUser } = useSocialAuth();
  console.log(`🚀 -> DashboardPage -> user:`, user);
  const [showModal, setShowModal] = useState(!user.phoneNumber);

  const handleUpdatePhoneNumber = useCallback(
    async (phoneNumber) => {
      const response = await fetch(
        `${env.VITE_API_ENDPOINT}/auth/oauth-complete`,
        {
          ...FETCH_OPTIONS,
          method: "POST",
          body: JSON.stringify({ phoneNumber, ...user }),
        }
      );
      if (response.status === 200) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setShowModal(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <div className="container-fluid">
      <h1 className="text-3xl font-bold">Dashboard page!</h1>
      <h2 className="text-2xl font-bold">Welcome, {user.email}</h2>
      {!user.phoneNumber && <h3>Verify your phone number</h3>}
      {showModal && (
        <Modal setOpenModal={setShowModal} onOK={handleUpdatePhoneNumber} />
      )}
    </div>
  );
}
