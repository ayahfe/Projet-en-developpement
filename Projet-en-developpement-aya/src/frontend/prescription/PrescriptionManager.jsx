import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { PRESCRIPTIONS } from "../../data/prescriptions";

const getNextInitialId = (initialPrescriptions) => {
  if (!initialPrescriptions || initialPrescriptions.length === 0) {
    return 1;
  }

  const maxId = initialPrescriptions.reduce((max, rx) => {
    const currentId = parseInt(rx.id, 10) || 0;
    return Math.max(max, currentId);
  }, 0);
  return maxId + 1;
};

const PrescriptionManager = () => {
  const [prescriptions, setPrescriptions] = useState(() => {
    const storedPrescriptions = localStorage.getItem("prescriptions");

    if (storedPrescriptions) {
      return JSON.parse(storedPrescriptions);
    } else {
      return PRESCRIPTIONS;
    }
  });

  const [nextId, setNextId] = useState(() => {
    const initialRxList =
      JSON.parse(localStorage.getItem("prescriptions")) || PRESCRIPTIONS;
    const storedNextId = localStorage.getItem("nextPrescriptionId");

    if (storedNextId) {
      return parseInt(storedNextId, 10);
    }

    return getNextInitialId(initialRxList);
  });

  useEffect(() => {
    localStorage.setItem("prescriptions", JSON.stringify(prescriptions));
  }, [prescriptions]);

  useEffect(() => {
    localStorage.setItem("nextPrescriptionId", nextId.toString());
    console.log("Next ID saved to localStorage:", nextId);
  }, [nextId]);

  const addPrescriptionHandler = (newRx) => {
    const newIncrementalId = nextId.toString();

    const rxWithId = {
      ...newRx,
      id: newIncrementalId,
    };

    setPrescriptions((prevRx) => {
      return [...prevRx, rxWithId];
    });
    setNextId((prevId) => prevId + 1);
    console.log("Prescription ajoutée dans l'état avec ID:", newIncrementalId);
  };

  const modifyPrescriptionHandler = (id, updatedData) => {
    setPrescriptions((prevRx) => {
      return prevRx.map((rx) =>
        rx.id === id ? { ...rx, ...updatedData } : rx
      );
    });
    console.log("Prescription modifiée:", id);
  };

  const deletePrescriptionHandler = (id) => {
    setPrescriptions((prevRx) => {
      return prevRx.filter((rx) => rx.id !== id);
    });
    console.log("Prescription supprimée:", id);
  };
  return (
    <Outlet
      context={{
        prescriptions,
        addPrescriptionHandler,
        modifyPrescriptionHandler,
        deletePrescriptionHandler,
      }}
    />
  );
};

export default PrescriptionManager;
