import { routes } from "./routes.js";

const headerRoot = document.getElementById("header-root");
const appRoot = document.getElementById("main");

let currentApp = null;
let headerRootEl = null;

/* ---------------- HEADER ---------------- */

async function loadHeader() {
  const headerModule = await import("http://localhost:3001/header.js");
  headerRootEl = headerModule.mountHeader(headerRoot);

  // Listen to navigation
  window.addEventListener("navigate", e => {
    const path = e.detail;
    history.pushState(null, "", path);
    loadApp(path);

    // Highlight active link using returned root
    headerModule.updateActiveRoute(path, headerRootEl);
  });
}

/* ---------------- ROUTER ---------------- */

async function loadApp(route) {
  console.log("Route", route);

  const routeConfig = routes[route];
  if (!routeConfig) {
    appRoot.innerHTML = "<h2>404</h2>";
    return;
  }

  if (currentApp?.unmount) {
    console.log("if unmounting");
    currentApp.unmount();
    currentApp = null;
  }

  appRoot.innerHTML = "";

  const module = await import(routeConfig.url);
  const mount = module[routeConfig.mountFn];
  const unmount = module[routeConfig.unmountFn];

  mount(appRoot);
  currentApp = { unmount };

  console.log("Mount done");
}

window.addEventListener("popstate", () => {
  console.log("popstate----");
  loadApp(window.location.pathname);
});

/* ---------------- INIT ---------------- */

(async function init() {
  await loadHeader();

  const path =
    window.location.pathname === "/" ? "/product" : window.location.pathname;

  loadApp(path);
})();
