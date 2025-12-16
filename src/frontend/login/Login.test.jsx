import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";

// ✅ Mock du AuthContext
vi.mock("../AuthContext", () => ({
  useAuth: () => ({
    login: vi.fn(),
  }),
}));

describe("Login page", () => {
  test("affiche le formulaire de connexion", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /se connecter/i })).toBeInTheDocument();
  });
});
