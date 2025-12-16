import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartProvider, useCart } from "./CartContext";
import { describe, it, expect } from "vitest";

// Composant test pour accéder au contexte
function TestComponent() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  return (
    <div>
      <span data-testid="cart-length">{cart.length}</span>

      <button onClick={() => addToCart({ id: 1, name: "Test", price: 10 })}>
        add
      </button>

      <button onClick={() => addToCart({ id: 2, name: "Test2", price: 20 })}>
        add2
      </button>

      <button onClick={() => removeFromCart(1)}>
        remove
      </button>

      <button onClick={() => removeFromCart(999)}>
        remove-invalid
      </button>

      <button onClick={clearCart}>
        clear
      </button>

      {cart.map(item => (
        <div key={item.id} data-testid="cart-item">
          {item.name} x {item.quantity}
        </div>
      ))}
    </div>
  );
}

function renderWithProvider() {
  return render(
    <CartProvider>
      <TestComponent />
    </CartProvider>
  );
}

describe("CartContext", () => {

  it("le panier commence vide", () => {
    renderWithProvider();
    expect(screen.getByTestId("cart-length").textContent).toBe("0");
  });

  it("addToCart ajoute un produit", async () => {
    renderWithProvider();
    await userEvent.click(screen.getByText("add"));

    expect(screen.getByTestId("cart-length").textContent).toBe("1");
    expect(screen.getByText(/Test x 1/i)).toBeInTheDocument();
  });

  it("addToCart augmente la quantité si le produit existe déjà", async () => {
    renderWithProvider();
    await userEvent.click(screen.getByText("add"));
    await userEvent.click(screen.getByText("add"));

    expect(screen.getByText(/Test x 2/i)).toBeInTheDocument();
  });

  it("addToCart ajoute plusieurs produits différents", async () => {
    renderWithProvider();
    await userEvent.click(screen.getByText("add"));
    await userEvent.click(screen.getByText("add2"));

    expect(screen.getByTestId("cart-length").textContent).toBe("2");
    expect(screen.getByText(/Test2 x 1/i)).toBeInTheDocument();
  });

  it("removeFromCart supprime un produit existant", async () => {
    renderWithProvider();
    await userEvent.click(screen.getByText("add"));
    await userEvent.click(screen.getByText("remove"));

    expect(screen.getByTestId("cart-length").textContent).toBe("0");
  });

  it("removeFromCart ne modifie rien si l'id n'existe pas", async () => {
    renderWithProvider();
    await userEvent.click(screen.getByText("add"));
    await userEvent.click(screen.getByText("remove-invalid"));

    expect(screen.getByTestId("cart-length").textContent).toBe("1");
  });

  it("clearCart vide complètement le panier", async () => {
    renderWithProvider();
    await userEvent.click(screen.getByText("add"));
    await userEvent.click(screen.getByText("add2"));
    await userEvent.click(screen.getByText("clear"));

    expect(screen.getByTestId("cart-length").textContent).toBe("0");
  });

});
