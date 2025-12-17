import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import DeletePrescription from "./DeletePrescription";

// =======================
// MOCKS React Router
// =======================
const mockNavigate = vi.fn();
const mockDeleteHandler = vi.fn();

const mockPrescriptions = [
  {
    id: "1",
    nom: "Dupont",
    prenom: "Jean",
    nomMolecule: "Paracétamol",
    date: "2023-10-10",
    ramq: "DUPJ 1234 5678",
    telephone: "514-000-0000",
    force: "500mg",
    quantite: "30",
    nomMedecin: "Dr. Smith"
  }
];

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useOutletContext: () => ({
      prescriptions: mockPrescriptions,
      deletePrescriptionHandler: mockDeleteHandler,
    }),
  };
});

describe("DeletePrescription Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers(); 
  });

  it("affiche le titre et la liste de sélection", () => {
    render(
      <BrowserRouter>
        <DeletePrescription />
      </BrowserRouter>
    );

    expect(screen.getByText(/Supprimer une Prescription/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Sélectionner une prescription/i)).toBeInTheDocument();
  });

  it("affiche les détails de la prescription quand une option est sélectionnée", async () => {
    render(
      <BrowserRouter>
        <DeletePrescription />
      </BrowserRouter>
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "1" } });

    expect(screen.getByText(/Détails de la prescription/i)).toBeInTheDocument();

    const previewContainer = screen.getByText(/Détails de la prescription/i).closest('.prescription-preview');
    
    expect(previewContainer).toHaveTextContent(/Paracétamol/i);
    expect(previewContainer).toHaveTextContent(/DUPJ 1234 5678/i);
    expect(previewContainer).toHaveTextContent(/500mg/i);
  });

  // =======================
  // FLUX DE CONFIRMATION
  // =======================
  it("affiche le dialogue de confirmation lors du clic sur Supprimer", () => {
    render(
      <BrowserRouter>
        <DeletePrescription />
      </BrowserRouter>
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "1" } });

    const deleteBtn = screen.getByRole("button", { name: /^Supprimer$/i });
    fireEvent.click(deleteBtn);

    expect(screen.getByText(/Êtes-vous sûr de vouloir supprimer/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Oui, supprimer/i })).toBeInTheDocument();
  });

  it("cache le dialogue si l'utilisateur annule", () => {
    render(
      <BrowserRouter>
        <DeletePrescription />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "1" } });
    fireEvent.click(screen.getByRole("button", { name: /^Supprimer$/i }));

    const cancelBtn = screen.getByRole("button", { name: /Annuler/i });
    fireEvent.click(cancelBtn);

    expect(screen.queryByText(/Êtes-vous sûr de vouloir supprimer/i)).not.toBeInTheDocument();
  });

  // =======================
  // ACTION DE SUPPRESSION ET REDIRECTION
  // =======================
  it("appelle le handler, affiche le succès et redirige après 1.5s", async () => {
    render(
      <BrowserRouter>
        <DeletePrescription />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "1" } });
    fireEvent.click(screen.getByRole("button", { name: /^Supprimer$/i }));
    
    const confirmBtn = screen.getByRole("button", { name: /Oui, supprimer/i });
    fireEvent.click(confirmBtn);

    expect(mockDeleteHandler).toHaveBeenCalledWith("1");
    
    expect(screen.getByText(/Prescription supprimée avec succès/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(mockNavigate).toHaveBeenCalledWith("/medecins");
  });
});