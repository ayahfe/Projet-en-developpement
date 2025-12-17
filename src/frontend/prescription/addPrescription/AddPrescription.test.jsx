import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import AddPrescription from "./AddPrescription";

// =======================
// MOCKS React Router
// =======================
const mockNavigate = vi.fn();
const mockAddPrescriptionHandler = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useOutletContext: () => ({
      addPrescriptionHandler: mockAddPrescriptionHandler,
    }),
  };
});

describe("AddPrescription Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // =======================
  // RENDU DE BASE
  // =======================
  it("affiche correctement le titre et les sections du formulaire", () => {
    render(
      <BrowserRouter>
        <AddPrescription />
      </BrowserRouter>
    );

    expect(screen.getByText(/Ajouter une Prescription/i)).toBeInTheDocument();
    expect(screen.getByText(/Informations Patient/i)).toBeInTheDocument();
    expect(screen.getByText(/Informations Prescription/i)).toBeInTheDocument();
    expect(screen.getByText(/Signature/i)).toBeInTheDocument();
  });

  // =======================
  // MISE À JOUR DES CHAMPS
  // =======================
  it("met à jour les valeurs des champs lors de la saisie", () => {
    render(
      <BrowserRouter>
        <AddPrescription />
      </BrowserRouter>
    );

    const inputNom = screen.getByLabelText(/Nom/i, { selector: 'input[name="nom"]' });
    fireEvent.change(inputNom, { target: { value: "Dupont", name: "nom" } });

    expect(inputNom.value).toBe("Dupont");
  });

  // =======================
  // SOUMISSION DU FORMULAIRE
  // =======================
  it("appelle le handler et redirige l'utilisateur après la soumission", async () => {
    render(
      <BrowserRouter>
        <AddPrescription />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Nom de l'institut/i), { target: { value: "Hôpital Général", name: "nomInstitut" } });
    fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: "2023-10-10", name: "date" } });
    fireEvent.change(screen.getByLabelText(/Numéro de RAMQ/i), { target: { value: "ABCD 1234 5678", name: "ramq" } });
    fireEvent.change(screen.getByLabelText(/Nom/i, { selector: 'input[name="nom"]' }), { target: { value: "Dupont", name: "nom" } });
    fireEvent.change(screen.getByLabelText(/Prénom/i), { target: { value: "Jean", name: "prenom" } });
    fireEvent.change(screen.getByLabelText(/Téléphone/i), { target: { value: "514-000-0000", name: "telephone" } });
    
    fireEvent.change(screen.getByLabelText(/Nom de la molécule/i), { target: { value: "Paracétamol", name: "nomMolecule" } });
    fireEvent.change(screen.getByLabelText(/Force/i), { target: { value: "500mg", name: "force" } });
    fireEvent.change(screen.getByLabelText(/Quantité/i), { target: { value: "30", name: "quantite" } });
    fireEvent.change(screen.getByLabelText(/Renouvellement/i), { target: { value: "2", name: "renouvellement" } });
    fireEvent.change(screen.getByLabelText(/Posologie/i), { target: { value: "1 par jour", name: "posologie" } });
    
    fireEvent.change(screen.getByLabelText(/Nom du médecin/i), { target: { value: "Dr. Smith", name: "nomMedecin" } });
    fireEvent.change(screen.getByLabelText(/License/i), { target: { value: "12345", name: "license" } });

    const submitBtn = screen.getByRole("button", { name: /Enregistrer/i });
    fireEvent.click(submitBtn);

    expect(mockAddPrescriptionHandler).toHaveBeenCalledWith(expect.objectContaining({
      nom: "Dupont",
      nomMolecule: "Paracétamol",
      nomInstitut: "Hôpital Général"
    }));
    
    expect(mockNavigate).toHaveBeenCalledWith("/medecins");
  });

  // =======================
  // VALIDATION HTML5
  // =======================
  it("possède l'attribut required sur les champs critiques", () => {
    render(
      <BrowserRouter>
        <AddPrescription />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Numéro de RAMQ/i)).toBeRequired();
    expect(screen.getByLabelText(/Nom de la molécule/i)).toBeRequired();
    expect(screen.getByLabelText(/License/i)).toBeRequired();
  });
});