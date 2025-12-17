import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import ModifyPrescription from "./ModifyPrescription";

// =======================
// MOCKS React Router
// =======================
const mockNavigate = vi.fn();
const mockModifyHandler = vi.fn();

const mockPrescriptions = [
  {
    id: "123",
    nomInstitut: "Clinique A",
    date: "2023-12-01",
    ramq: "TEST 1234 5678",
    nom: "Martin",
    prenom: "Luc",
    telephone: "514-111-2222",
    nomMolecule: "Ibuprofène",
    force: "400mg",
    quantite: "20",
    renouvellement: "3",
    posologie: "1 aux 8 heures",
    nomMedecin: "Dr. House",
    license: "66778"
  }
];

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: "123" }), 
    useOutletContext: () => ({
      prescriptions: mockPrescriptions,
      modifyPrescriptionHandler: mockModifyHandler,
    }),
  };
});

vi.stubGlobal('alert', vi.fn());

describe("ModifyPrescription Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ==================================
  // RENDU ET CHARGEMENT DES DONNÉES
  // ==================================
  it("charge et affiche les données de la prescription existante", () => {
    render(
      <BrowserRouter>
        <ModifyPrescription />
      </BrowserRouter>
    );

    expect(screen.getByText(/Modifier la Prescription \(ID: 123\)/i)).toBeInTheDocument();
    
    // Vérification que les champs sont pré-remplis
    expect(screen.getByLabelText(/Nom de l'institut/i).value).toBe("Clinique A");
    expect(screen.getByLabelText(/Nom de la molécule/i).value).toBe("Ibuprofène");
    expect(screen.getByLabelText(/Nom/i, { selector: 'input[name="nom"]' }).value).toBe("Martin");
  });

  // ==================================
  // MODIFICATION ET SOUMISSION
  // ==================================
  it("appelle le handler avec les nouvelles données lors de la soumission", () => {
    render(
      <BrowserRouter>
        <ModifyPrescription />
      </BrowserRouter>
    );

    const inputMolecule = screen.getByLabelText(/Nom de la molécule/i);
    fireEvent.change(inputMolecule, { target: { value: "Aspirine", name: "nomMolecule" } });

    const submitBtn = screen.getByRole("button", { name: /Sauvegarder/i });
    fireEvent.click(submitBtn);

    expect(mockModifyHandler).toHaveBeenCalledWith("123", expect.objectContaining({
      nomMolecule: "Aspirine",
      nom: "Martin" 
    }));
    
    expect(mockNavigate).toHaveBeenCalledWith("/medecins");
  });

  // ==================================
  // ANNULATION
  // ==================================
  it("redirige vers la liste lors du clic sur Annuler", () => {
    render(
      <BrowserRouter>
        <ModifyPrescription />
      </BrowserRouter>
    );

    const cancelBtn = screen.getByRole("button", { name: /Annuler/i });
    fireEvent.click(cancelBtn);

    expect(mockNavigate).toHaveBeenCalledWith("/medecins");
  });

  // ==================================
  // CAS D'ERREUR : ID INEXISTANT
  // ==================================
  it("redirige et affiche une alerte si la prescription n'est pas trouvée", () => {
    const findSpy = vi.spyOn(mockPrescriptions, 'find').mockReturnValue(undefined);

    render(
      <BrowserRouter>
        <ModifyPrescription />
      </BrowserRouter>
    );

    expect(alert).toHaveBeenCalledWith(expect.stringContaining("Prescription non trouvée"));
    
    expect(mockNavigate).toHaveBeenCalledWith("/medecins", { replace: true });

    findSpy.mockRestore();
  });
});