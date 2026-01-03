export const routes = {
    "/cart": {
      url: "http://localhost:3003/cart.js",
      mountFn: "mountCart",
      unmountFn: "unmountCart"
    },
    "/product": {
      url: "http://localhost:3002/product.js",
      mountFn: "mountProducts",
      unmountFn: "unmountProduct"
    },
    "/": {
        url: "http://localhost:3002/product.js",
        mountFn: "mountHeader",
        unmountFn: "unmountHeader"
      }

  };
  