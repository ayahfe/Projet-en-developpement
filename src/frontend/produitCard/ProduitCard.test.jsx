import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import ProduitCard from "./ProduitCard";

// 🔹 Mock CartContext
const mockAddToCart = vi.fn();

vi.mock("../cart/CartContext", () => ({
  useCart: () => ({
    addToCart: mockAddToCart,
  }),
}));

describe("ProduitCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("affiche les produits avec un bouton Ajouter au panier", () => {
    render(<ProduitCard />);

    const buttons = screen.getAllByRole("button", {
      name: /ajouter au panier/i,
    });

    expect(buttons.length).toBeGreaterThan(0);
  });

  test("appelle addToCart lors du clic sur un bouton", () => {
    render(<ProduitCard />);

    const buttons = screen.getAllByRole("button", {
      name: /ajouter au panier/i,
    });

    fireEvent.click(buttons[0]);

    expect(mockAddToCart).toHaveBeenCalledTimes(1);
  });

  test("les boutons Ajouter au panier sont activés", () => {
    render(<ProduitCard />);

    const buttons = screen.getAllByRole("button", {
      name: /ajouter au panier/i,
    });

    expect(buttons[0]).toBeEnabled();
  });
});
