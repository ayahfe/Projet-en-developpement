import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";

// =======================
// MOCK AuthContext
// =======================
const loginMock = vi.fn();

vi.mock("../AuthContext", () => ({
  useAuth: () => ({
    login: loginMock,
  }),
}));

describe("Login page", () => {
  beforeEach(() => {
    loginMock.mockClear();
  });

  // =======================
  // RENDU DU FORMULAIRE
  // =======================
  test("affiche le formulaire de connexion", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /se connecter/i })
    ).toBeInTheDocument();
  });

  // =======================
  // CHAMPS REQUIS
  // =======================
  test("les champs email et mot de passe sont requis", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/email/i)).toBeRequired();
    expect(screen.getByLabelText(/mot de passe/i)).toBeRequired();
  });

  // =======================
  // SAISIE UTILISATEUR
  // =======================
  test("l'utilisateur peut saisir son email et son mot de passe", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/mot de passe/i);

    fireEvent.change(emailInput, {
      target: { value: "test@test.com" },
    });
    fireEvent.change(passwordInput, {
      target: { value: "123456" },
    });

    expect(emailInput.value).toBe("test@test.com");
    expect(passwordInput.value).toBe("123456");
  });

  // =======================
  // SOUMISSION OK
  // =======================
  test("appelle la fonction login lors de la soumission", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: "123456" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /se connecter/i })
    );

    expect(loginMock).toHaveBeenCalledTimes(1);
  });

  // =======================
  // BOUTON PRÉSENT
  // =======================
  test("le bouton de connexion est accessible via le rôle button", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("button", { name: /se connecter/i })
    ).toBeInTheDocument();
  });

  // =======================
  // EMAIL MANQUANT
  // =======================
  test("affiche une erreur si l'email est vide", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: "123456" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /se connecter/i })
    );

    expect(loginMock).not.toHaveBeenCalled();
  });

  // =======================
  // MOT DE PASSE MANQUANT
  // =======================
  test("affiche une erreur si le mot de passe est vide", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@test.com" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /se connecter/i })
    );

    expect(loginMock).not.toHaveBeenCalled();
  });

  // =======================
  // FORMULAIRE INVALIDE
  // =======================
  test("empêche la soumission si le formulaire est invalide", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", { name: /se connecter/i })
    );

    expect(loginMock).not.toHaveBeenCalled();
  });

  // =======================
  // ERREUR LOGIN
  // =======================
  test("affiche un message d'erreur si login échoue", async () => {
    loginMock.mockRejectedValueOnce(new Error("Erreur login"));

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@test.com" },
    });

    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: "wrong" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /se connecter/i })
    );

    expect(
      await screen.findByText(/erreur/i)
    ).toBeInTheDocument();
  });
  test("désactive le bouton pendant la connexion", async () => {
  loginMock.mockResolvedValueOnce();

  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "test@test.com" },
  });

  fireEvent.change(screen.getByLabelText(/mot de passe/i), {
    target: { value: "123456" },
  });

  fireEvent.click(screen.getByRole("button", { name: /se connecter/i }));

  expect(
    screen.getByRole("button", { name: /connexion/i })
  ).toBeDisabled();
});
vi.mock("../../lib/supabaseClient", () => ({
  supabase: {
    auth: {
      getUser: vi.fn(() => ({
        data: { user: null },
      })),
    },
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn(),
    })),
  },
}));

test("affiche une erreur si utilisateur introuvable", async () => {
  loginMock.mockResolvedValueOnce();

  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "test@test.com" },
  });

  fireEvent.change(screen.getByLabelText(/mot de passe/i), {
    target: { value: "123456" },
  });

  fireEvent.click(screen.getByRole("button", { name: /se connecter/i }));

  expect(
    await screen.findByText(/utilisateur introuvable/i)
  ).toBeInTheDocument();
});

});
