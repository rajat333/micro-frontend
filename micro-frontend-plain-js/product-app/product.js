import { EventBus } from "http://localhost:3005/event-bus.js";

let rootElement = null;

export function mountProducts(container) {
  console.log("🚀 mountProduct called", rootElement);

  rootElement = document.createElement("div");
  const shadow = rootElement.attachShadow({ mode: "open" });

  const products = [
    { id: 1, name: "Laptop", price: 60000 },
    { id: 2, name: "Phone", price: 30000 }
  ];

  shadow.innerHTML = `
    <style>
      h3 { color: green; }
      button { margin-left: 8px; }
      div { margin-bottom: 4px; }
    </style>

    <h3>Products</h3>
    <div id="products">
      ${products
        .map(
          p =>
            `<div>${p.name} - ₹${p.price} <button data-id="${p.id}">Add to Cart</button></div>`
        )
        .join("")}
    </div>
  `;

  shadow.addEventListener("click", e => {
    console.log("product shadown dom click---", e);
    const btn = e.target.closest("button[data-id]");
    console.log("btn---", btn);
    if (!btn) return;

    const product = products.find(p => p.id == btn.dataset.id);
    console.log("product for emit cart:add event", product);
    EventBus.emit("cart:add", product);
  });

  container.appendChild(rootElement);
}

export function unmountProducts() {
  console.log("Unmount Product");
  rootElement?.remove();
  rootElement = null;
}
