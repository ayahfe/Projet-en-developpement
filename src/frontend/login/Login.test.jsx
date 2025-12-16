import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";


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

  // Rendu du formulaire
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
//Test les champs requis
  test("les champs email et mot de passe sont requis", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/email/i)).toBeRequired();
    expect(screen.getByLabelText(/mot de passe/i)).toBeRequired();
  });

  // Test le saisi utilisateur
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

  // test pour soumettre un formulaire
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

  // Test pour les boutons présents
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
});
