const { MENU_LINKS } = require("../MVC7/constants/navigation");

const cartController = require("./cartController");

exports.getHomeView = (request, response) => {
  const cartCount = cartController.getProductsCount();

  response.render("home.ejs", {
    headTitle: "Shop - Home",
    path: "/",
    activeLinkPath: "/",
    menuLinks: MENU_LINKS,
    cartCount,
  });
};
