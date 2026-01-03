import { EventBus } from "http://localhost:3005/event-bus.js";
import { Store } from "http://localhost:3005/store.js";

let rootElement = null;
// let cart = [];

export function mountCart(container) {
  console.log("🚀 mountCart called", rootElement);

  // if (rootElement) return; // prevent double mount

  rootElement = document.createElement("div");
  const shadow = rootElement.attachShadow({ mode: "open" });

  function render() {
    console.log("in render---", Store.cart);
    shadow.innerHTML = `
      <style>
        h3 { color: blue; }
        div { margin-bottom: 4px; }
      </style>

      <h3>Cart</h3>
      ${
        Store.cart.length
          ? Store.cart.map(i => `<div>${i.name} - ₹${i.price}</div>`).join("")
          : "<p>Your cart is empty</p>"
      }
    `;
  }

  render();
  container.appendChild(rootElement);

  // Listen for cart:add
  rootElement._onCartAdd = product => {
    console.log("Cart received product:", product);
    Store.cart.push(product);
    render();
  };
  EventBus.on("cart:add", rootElement._onCartAdd);
}

export function unmountCart() {
  console.log("Unmount Cart");
  if (rootElement?._onCartAdd) {
    EventBus.off("cart:add", rootElement._onCartAdd);
  }
  rootElement?.remove();
  rootElement = null;
  // cart = [];
}
