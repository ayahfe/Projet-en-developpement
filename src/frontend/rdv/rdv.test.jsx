import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CalendrierRdv from "./rdv";

// =======================
// MOCK AuthContext
// =======================
const mockUseAuth = vi.fn();
let mockAppointments = [];


vi.mock("../AuthContext", () => ({
  useAuth: () => mockUseAuth(),
}));

// =======================
// MOCK Supabase
// =======================
const mockSelect = vi.fn();
const mockInsert = vi.fn();

vi.mock("../../supabaseClient", () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn(() =>
          Promise.resolve({
            data: mockAppointments,
            error: null,
          })
        ),
      })),
      insert: vi.fn(() => ({
        select: vi.fn(() =>
          Promise.resolve({
            data: [{ ...mockAppointments[0], id: 999 }],
            error: null,
          })
        ),
      })),
    })),
  },
}));


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

  mockAppointments = [
    {
      id: 3,
      patient_name: "Fatima",
      doctor_name: "Dr. Laila",
      email: "f@test.com",
      date: new Date().toISOString().split("T")[0],
      time: "12:00",
      status: "upcoming",
    },
  ];

  render(<CalendrierRdv />);

  fireEvent.click(await screen.findByText("Fatima"));

  expect(await screen.findByText("Détails")).toBeInTheDocument();
});

it("ouvre la modale de création quand l'utilisateur est connecté et clique sur Nouveau RDV", async () => {
  mockUseAuth.mockReturnValue({ user: { id: 1 } });

  render(<CalendrierRdv />);

  fireEvent.click(await screen.findByText(/Nouveau RDV/i));

  expect(
    await screen.findByText(/nouveau rendez-vous/i)
  ).toBeInTheDocument();
});

it("ne déclenche pas d'alerte quand l'utilisateur est connecté", async () => {
  mockUseAuth.mockReturnValue({ user: { id: 1 } });

  render(<CalendrierRdv />);

  fireEvent.click(await screen.findByText(/Nouveau RDV/i));

  expect(global.alert).not.toHaveBeenCalled();
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
  it("affiche un rendez-vous en cours", async () => {
  mockUseAuth.mockReturnValue({ user: { id: 1 } });

  mockAppointments = [
    {
      id: 10,
      patient_name: "Youssef",
      email: "y@test.com",
      doctor_name: "Dr. Amal",
      date: new Date().toISOString().split("T")[0],
      time: "09:00",
      status: "en cours",
    },
  ];

  render(<CalendrierRdv />);

  const card = await screen.findByText("Youssef");

  expect(card.closest(".apt-card")).toHaveClass("in-progress");
});

it("affiche un rendez-vous annulé avec la bonne classe", async () => {
  mockUseAuth.mockReturnValue({ user: { id: 1 } });

  mockAppointments = [
    {
      id: 20,
      patient_name: "Julie",
      email: "s@test.com",
      doctor_name: "Dr. Karim",
      date: new Date().toISOString().split("T")[0],
      time: "10:00",
      status: "annulé",
    },
  ];

  render(<CalendrierRdv />);

  const card = await screen.findByText("Julie");

  expect(card.closest(".apt-card")).toHaveClass("cancelled");
});
//TEST INTEGRATION 1
it("permet à un utilisateur connecté d'ouvrir le formulaire de création", async () => {
  mockUseAuth.mockReturnValue({ user: { id: 1 } });

  render(<CalendrierRdv />);

  fireEvent.click(screen.getByText(/Nouveau RDV/i));

  expect(
    await screen.findByText(/Nouveau Rendez-vous/i)
  ).toBeInTheDocument();
});
//TEST INTEGRATION 2
it("empêche un utilisateur non connecté de créer un rendez-vous", async () => {
  mockUseAuth.mockReturnValue({ user: null });

  render(<CalendrierRdv />);

  fireEvent.click(screen.getByText(/Nouveau RDV/i));

  expect(global.alert).toHaveBeenCalled();
});

//TROISIEME TEST INTEGRATION 
it("affiche un rendez-vous existant dans le calendrier", async () => {
  mockUseAuth.mockReturnValue({ user: { id: 1 } });

  mockAppointments = [
    {
      id: 1,
      patient_name: "Integration Test",
      email: "i@test.com",
      doctor_name: "Dr. Amal",
      date: new Date().toISOString().split("T")[0],
      time: "10:00",
      status: "upcoming",
    },
  ];

  render(<CalendrierRdv />);

  expect(
    await screen.findByText("Integration Test")
  ).toBeInTheDocument();
});

  
});
