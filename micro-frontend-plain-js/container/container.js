async function loadApp(url, mountFn, elId) {
    const module = await import(url);
    module[mountFn](document.getElementById(elId));
  }
  
  loadApp("http://localhost:3001/header.js", "mountHeader", "header");
  loadApp("http://localhost:3002/product.js", "mountProducts", "products");
  loadApp("http://localhost:3003/cart.js", "mountCart", "cart");
  