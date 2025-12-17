import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Signup from "./Signup";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

global.fetch = vi.fn();

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
  
  //Test format du email incorrect
  test("affiche une erreur si l'email est invalide", async () => {
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "email-invalide" },
  });

  fireEvent.change(screen.getByLabelText(/^mot de passe$/i), {
    target: { value: "123456" },
  });

  fireEvent.change(screen.getByLabelText(/confirmez/i), {
    target: { value: "123456" },
  });

  fireEvent.click(screen.getByLabelText(/conditions/i));
  fireEvent.click(screen.getByRole("button", { name: /créer/i }));

  expect(
    await screen.findByText(/email/i)
  ).toBeInTheDocument();
});

test("affiche une erreur si le mot de passe est trop court", async () => {
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "test@test.com" },
  });

  fireEvent.change(screen.getByLabelText(/^mot de passe$/i), {
    target: { value: "123" },
  });

  fireEvent.change(screen.getByLabelText(/confirmez/i), {
    target: { value: "123" },
  });

  fireEvent.click(screen.getByLabelText(/conditions/i));
  fireEvent.click(screen.getByRole("button", { name: /créer/i }));

  expect(
    await screen.findByText(/trop court|minim|6 caractères/i)
  ).toBeInTheDocument();
});

// empeche inscription si l'utilisateur ne coche pas 
test("empêche l'inscription si les conditions ne sont pas acceptées", async () => {
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

  fireEvent.click(screen.getByRole("button", { name: /créer/i }));

  expect(fetch).not.toHaveBeenCalled();
});

//Test si l'API est appelé une seule fois meme en appuyant bcp sur le bouton
test("n'appelle l'API qu'une seule fois même si on clique plusieurs fois", async () => {
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

  const button = screen.getByRole("button", { name: /créer/i });

  fireEvent.click(button);
  fireEvent.click(button);

  expect(fetch).toHaveBeenCalledTimes(1);
});

});
