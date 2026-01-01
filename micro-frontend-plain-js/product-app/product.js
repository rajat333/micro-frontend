import { EventBus } from "http://localhost:3005/event-bus.js";

export function mountProducts(containerEl) {
    const products = [
      { id: 1, name: "Laptop", price: 60000 },
      { id: 2, name: "Phone", price: 30000 }
    ];

    const shadow = containerEl.attachShadow({ mode: "open" });
  
    shadow.innerHTML = `
                <style>
                  div { margin-bottom: 8px; }
                  button {
                    background: green;
                    color: white;
                    border: none;
                    padding: 4px 8px;
                    cursor: pointer;
                  }
                </style>

                <h3>Products</h3>
                ${products.map(
                  p => `<div>${p.name} - ₹${p.price} <button data-id="${p.id}">Add</button></div>`
                ).join("")}
          `;

    // el.innerHTML = `
    //   <h3>Products</h3>
    //   ${products
    //     .map(
    //       p => `
    //     <div>
    //       ${p.name} - ₹${p.price}
    //       <button data-id="${p.id}">Add</button>
    //     </div>
    //   `
    //     )
    //     .join("")}
    // `;
  
    shadow.querySelectorAll("button").forEach(btn => {
      btn.onclick = () => {
        console.log("btn-----", btn);
        const product = products.find(p => p.id == btn.dataset.id);
        console.log("product--", product);
        EventBus.emit("cart:add", { detail: product });
        // window.dispatchEvent(
        //   new CustomEvent("cart:add", { detail: product })
        // );
      };
    });
  }
  