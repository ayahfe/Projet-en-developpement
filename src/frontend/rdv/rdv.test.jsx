import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CalendrierRdv from "./rdv";

// =======================
// MOCK AuthContext
// =======================
const mockUseAuth = vi.fn();

vi.mock("../AuthContext", () => ({
  useAuth: () => mockUseAuth(),
}));

// =======================
// MOCK Supabase
// =======================
const mockSelect = vi.fn();
const mockInsert = vi.fn();

vi.mock("../../supabaseClient", () => {
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];

  return {
    supabase: {
      from: vi.fn(() => ({
        select: vi.fn(() => ({
          order: vi.fn(() =>
            Promise.resolve({
              data: [
                {
                  id: 1,
                  patient_name: "Fatima",
                  email: "f@test.com",
                  doctor_name: "Dr. Laila",
                  date: dateStr,     // ⚠️ DATE DE LA SEMAINE COURANTE
                  time: "10:00",     // ⚠️ HEURE DANS 8–20
                  status: "upcoming",
                },
              ],
              error: null,
            })
          ),
        })),
        insert: vi.fn(() => ({
          select: vi.fn(() =>
            Promise.resolve({
              data: [],
              error: null,
            })
          ),
        })),
      })),
    },
  };
});


// =======================
// MOCK alert
// =======================
global.alert = vi.fn();

describe("CalendrierRdv", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSelect.mockResolvedValue({ data: [], error: null });
  });

  // =======================
  // RENDU DE BASE
  // =======================
  it("affiche le titre du calendrier", async () => {
    mockUseAuth.mockReturnValue({ user: null });

    render(<CalendrierRdv />);

    expect(
      await screen.findByText(/Calendrier des Rendez-vous/i)
    ).toBeInTheDocument();
  });

  // =======================
  // BANNIÈRE LOGIN
  // =======================
  it("affiche le message si l'utilisateur n'est pas connecté", async () => {
    mockUseAuth.mockReturnValue({ user: null });

    render(<CalendrierRdv />);

    expect(
      await screen.findByText(/vous devez vous connecter/i)
    ).toBeInTheDocument();
  });

  // =======================
  // BOUTON NOUVEAU RDV (NON CONNECTÉ)
  // =======================
  it("affiche une alerte si on clique sur Nouveau RDV sans être connecté", async () => {
    mockUseAuth.mockReturnValue({ user: null });

    render(<CalendrierRdv />);

    fireEvent.click(await screen.findByText(/Nouveau RDV/i));

    expect(global.alert).toHaveBeenCalled();
  });

  // =======================
  // OUVERTURE MODALE (CONNECTÉ)
  // =======================
  it("ouvre la modale de détails quand on clique sur un rendez-vous", async () => {
  mockUseAuth.mockReturnValue({ user: { id: 1 } });

  render(<CalendrierRdv />);

  const rdv = await screen.findByText("Fatima");
  fireEvent.click(rdv);

  expect(await screen.findByText("Détails")).toBeInTheDocument();
  const modal = await screen.findByText("Détails");
expect(modal).toBeInTheDocument();

expect(
  modal.parentElement.querySelector("p:nth-of-type(3)")
).toHaveTextContent("Dr. Laila");

});


  // =======================
  // STATUS – ANNULÉ
  // =======================
  it("affiche un rendez-vous avec le statut upcoming (par défaut)", async () => {
  mockUseAuth.mockReturnValue({ user: { id: 1 } });

  render(<CalendrierRdv />);

  const card = await screen.findByText("Fatima");

  expect(card).toBeInTheDocument();
  expect(card.closest(".apt-card")).toHaveClass("upcoming");
});

  


  // =======================
  // NAVIGATION SEMAINE
  // =======================
  it("permet de naviguer entre les semaines", async () => {
    mockUseAuth.mockReturnValue({ user: null });

    render(<CalendrierRdv />);

    const next = screen.getAllByRole("button")[0];
    const prev = screen.getAllByRole("button")[1];

    fireEvent.click(next);
    fireEvent.click(prev);

    expect(next).toBeInTheDocument();
    expect(prev).toBeInTheDocument();
  });

  // =======================
  // OUVERTURE DÉTAILS RDV
  // =======================
  it("ouvre la modale de détails quand on clique sur un rendez-vous", async () => {
    mockUseAuth.mockReturnValue({ user: { id: 1 } });

    mockSelect.mockResolvedValueOnce({
      data: [
        {
          id: 3,
          patient_name: "Fatima",
          doctor_name: "Dr. Laila",
          email: "f@test.com",
          date: new Date().toISOString().split("T")[0],
          time: "12:00",
          status: "upcoming",
        },
      ],
      error: null,
    });

    render(<CalendrierRdv />);

    fireEvent.click(await screen.findByText("Fatima"));

    expect(await screen.findByText(/Détails/i)).toBeInTheDocument();
  });
});
