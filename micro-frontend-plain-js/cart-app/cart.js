import { EventBus } from "http://localhost:3005/event-bus.js";

let cart = [];
let userName = "";
export function mountCart(containerEl) {

  const shadow = containerEl.attachShadow({ mode: "open" });

  function render() {
    console.log("cart------", cart);
    shadow.innerHTML = `
      <style>
        h3 { color: #333; }
        div { margin-bottom: 4px; }
      </style>
      <h3>Cart</h3>
      ${userName} <br/><br/>
      ${cart.map(i => `<div>${i.name}</div>`).join("") || "<i>Empty</i>"}
    `;
  }

  render();

//   window.addEventListener("cart:add", e => {
//     console.log("cart event listen", e);
//     cart.push(e.detail);
//     render(el);
//   });
    EventBus.on("cart:add", product => {
      console.log("cart push", product);
        cart.push(product?.detail);
        render();
    });

    EventBus.on("user:login", user => {
        console.log("User logged in:", user.name);
        userName = user.name;
        render();
    });
}
