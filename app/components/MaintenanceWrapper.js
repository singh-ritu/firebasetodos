"use client"; // Make sure this runs on the client

import { useState, useEffect } from "react";
import { initialiseFirebaseRealtimeDB } from "@/firebase/firebaseconfig";
import MaintenanceScreen from "./MaintenanceScreen";

export default function MaintenanceWrapper({ children }) {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);

  useEffect(() => {
    initialiseFirebaseRealtimeDB(setIsMaintenanceMode);
  }, []);

  useEffect(() => {
    console.log(isMaintenanceMode);
  }, [isMaintenanceMode]);

  if (isMaintenanceMode) {
    return <MaintenanceScreen />;
  }

  return children;
}
