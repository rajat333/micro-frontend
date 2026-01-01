import { EventBus } from "http://localhost:3005/event-bus.js";

export function mountHeader(containerEl) {

    const shadow = containerEl.attachShadow({ mode: "open" });

    // el.innerHTML = `
    //   <header style="padding:12px;background:#1f2937;color:white">
    //     <h2>🛒 MyStore</h2>
    //     <button id="loginBtn">Login</button>
    //   </header>
    // `;
    // HTML + CSS inside shadow root
    shadow.innerHTML = `
                <style>
                    header {
                    padding: 12px;
                    background: #1f2937;
                    color: white;
                    }
                    button {
                    background: #2563eb;
                    color: white;
                    border: none;
                    padding: 6px 12px;
                    cursor: pointer;
                    }
                </style>

                <header>
                    <h2>🛒 MyStore</h2>
                    <button id="loginBtn">Login</button>
                </header>
            `;

        shadow.getElementById("loginBtn").onclick = () => {
        EventBus.emit("user:login", { userId: 101, name: "Rajat" });
        //   window.dispatchEvent(
        //     new CustomEvent("user:login", {
        //       detail: { userId: 101, name: "Rajat" }
        //     })
        //   );
    };
}
