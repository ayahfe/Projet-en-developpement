import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Signup from "./Signup";

// 🔹 Mock navigate
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// 🔹 Mock fetch (API signup)
global.fetch = vi.fn();

// 🔹 Mock alert
global.alert = vi.fn();

describe("Signup page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("affiche le formulaire d'inscription", () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^mot de passe$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmez/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /créer un compte/i })
    ).toBeInTheDocument();
  });

  test("affiche une erreur si les mots de passe ne correspondent pas", async () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@test.com" },
    });

    fireEvent.change(screen.getByLabelText(/^mot de passe$/i), {
      target: { value: "123456" },
    });

    fireEvent.change(screen.getByLabelText(/confirmez/i), {
      target: { value: "abcdef" },
    });

    // ✅ OBLIGATOIRE : accepter les conditions
    fireEvent.click(screen.getByLabelText(/conditions/i));

    fireEvent.click(
      screen.getByRole("button", { name: /créer un compte/i })
    );

    expect(
      await screen.findByText(/ne correspondent pas/i)
    ).toBeInTheDocument();

    expect(fetch).not.toHaveBeenCalled();
  });

  test("appelle l'API signup et redirige vers login", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@test.com" },
    });

    fireEvent.change(screen.getByLabelText(/^mot de passe$/i), {
      target: { value: "123456" },
    });

    fireEvent.change(screen.getByLabelText(/confirmez/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByLabelText(/conditions/i));

    fireEvent.click(
      screen.getByRole("button", { name: /créer un compte/i })
    );

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });

  test("le bouton est désactivé pendant la création", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@test.com" },
    });

    fireEvent.change(screen.getByLabelText(/^mot de passe$/i), {
      target: { value: "123456" },
    });

    fireEvent.change(screen.getByLabelText(/confirmez/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByLabelText(/conditions/i));

    const button = screen.getByRole("button", {
      name: /créer un compte/i,
    });

    fireEvent.click(button);

    expect(button).toBeDisabled();
  });
});
