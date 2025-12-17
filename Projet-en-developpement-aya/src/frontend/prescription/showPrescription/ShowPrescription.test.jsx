import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import ShowPrescriptionList from "./ShowPrescription";

// =========================================================
// CONFIGURATION DU MOCK DYNAMIQUE
// =========================================================
let contextData = {
  prescriptions: [],
  deletePrescriptionHandler: vi.fn(),
};

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useOutletContext: () => contextData,
  };
});

describe("ShowPrescriptionList Component", () => {
  const mockPrescriptions = [
    {
      id: "1",
      nom: "Dupont",
      prenom: "Jean",
      nomMolecule: "Aspirine",
      date: "2023-10-10",
      nomInstitut: "Santé Plus",
      ramq: "DUPJ123",
      telephone: "514-111-2222",
      force: "500mg",
      quantite: "30",
      renouvellement: "2",
      posologie: "1 par jour",
      nomMedecin: "Dr. Smith",
      license: "L12345"
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    contextData = {
      prescriptions: [...mockPrescriptions],
      deletePrescriptionHandler: vi.fn(),
    };
    vi.stubGlobal('confirm', vi.fn(() => true));
  });

  // ==================================
  // TESTS D'AFFICHAGE
  // ==================================
  it("affiche la liste des prescriptions correctement", () => {
    render(
      <BrowserRouter>
        <ShowPrescriptionList />
      </BrowserRouter>
    );

    expect(screen.getByText(/Prescriptions/i)).toBeInTheDocument();
    expect(screen.getByText(/Dupont/i)).toBeInTheDocument();
    expect(screen.getByText(/Aspirine/i)).toBeInTheDocument();
  });

  it("affiche un message quand la liste est vide", () => {
    contextData.prescriptions = [];

    render(
      <BrowserRouter>
        <ShowPrescriptionList />
      </BrowserRouter>
    );

    expect(screen.getByText(/Aucune prescription disponible/i)).toBeInTheDocument();
    expect(screen.queryByText(/Dupont/i)).not.toBeInTheDocument();
  });

  // ==================================
  // TESTS D'ACTIONS
  // ==================================
  it("contient un lien de modification avec l'ID correct", () => {
    render(
      <BrowserRouter>
        <ShowPrescriptionList />
      </BrowserRouter>
    );

    const modifyLink = screen.getByRole("link", { name: /Modifier/i });
    expect(modifyLink.getAttribute("href")).toBe("/medecins/modify/1");
  });

  it("appelle le handler de suppression après confirmation", () => {
    const deleteSpy = vi.fn();
    contextData.deletePrescriptionHandler = deleteSpy;

    render(
      <BrowserRouter>
        <ShowPrescriptionList />
      </BrowserRouter>
    );

    const deleteBtn = screen.getByRole("button", { name: /Supprimer/i });
    fireEvent.click(deleteBtn);

    expect(confirm).toHaveBeenCalled();
    expect(deleteSpy).toHaveBeenCalledWith("1");
  });

  it("n'appelle pas le handler si l'utilisateur annule la confirmation", () => {
    const deleteSpy = vi.fn();
    contextData.deletePrescriptionHandler = deleteSpy;
    
    vi.stubGlobal('confirm', vi.fn(() => false));

    render(
      <BrowserRouter>
        <ShowPrescriptionList />
      </BrowserRouter>
    );

    const deleteBtn = screen.getByRole("button", { name: /Supprimer/i });
    fireEvent.click(deleteBtn);

    expect(deleteSpy).not.toHaveBeenCalled();
  });
});