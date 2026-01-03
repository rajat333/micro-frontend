
export function mountHeader(container) {
    const root = document.createElement("div");
    container.appendChild(root);
    console.log("header mount");
    const shadow = root.attachShadow({ mode: "open" });

    shadow.innerHTML = `
      <style>
        nav {
          background: #222;
          padding: 10px;
        }
        a {
          color: white;
          margin-right: 16px;
          cursor: pointer;
          text-decoration: none;
        }
      </style>
  
      <nav>
        <a href="/product" data-link>Product</a>
        <a href="/cart" data-link>Cart</a>
      </nav>
    `;

    shadow.addEventListener("click", e => {
        const link = e.target.closest("[data-link]");
        if (!link) return;

        e.preventDefault();
        const href = link.getAttribute("href");

        window.dispatchEvent(
            new CustomEvent("navigate", {
                detail: href,
                bubbles: true,
                composed: true
            })
        );
    });
    // Save reference to shadow inside root
    root._shadow = shadow;

    return root; // return root so container.js can call updateActiveRoute
}

/// Update active link dynamically
export function updateActiveRoute(path, root) {
    if (!root?._shadow) return;
    root._shadow.querySelectorAll("[data-link]").forEach(a => {
        if (a.getAttribute("href") === path) {
            a.classList.add("active");
        } else {
            a.classList.remove("active");
        }
    });
}