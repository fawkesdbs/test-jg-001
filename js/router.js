const pageTitle = "Joshua Generation";

document.addEventListener("click", (e) => {
  const { target } = e;
  if (!target.matches("nav a")) {
    return;
  }
  e.preventDefault();
  route();
});

const routes = {
  404: {
    page: "../pages/404.html",
    title: "404 | " + pageTitle,
    description: "Page not found",
  },
  "/": {
    page: "../pages/home/index.html",
    title: "Home | " + pageTitle,
    description: "This is the home page",
  },
  "/events": {
    page: "../pages/events/index.html",
    title: "Events | " + pageTitle,
    description: "This is the events page",
  },
  "/blogs": {
    page: "../pages/blogs/index.html",
    title: "Blogs | " + pageTitle,
    description: "This is the blogs page",
  },
  "/gallery": {
    page: "../pages/gallery/index.html",
    title: "Gallery | " + pageTitle,
    description: "This is the gallery page",
  },
  "/contact": {
    page: "../pages/contact/index.html",
    title: "Contact Us | " + pageTitle,
    description: "This is the contact page",
  },
};

const locationHandler = async () => {
  const location = window.location.pathname;
  if (location.length == 0) {
    location = "/";
  }
  const route = routes[location] || routes["404"];
  const html = await fetch(route.page).then((response) => response.text());
  document.getElementById("content").innerHTML = html;
  document.title = route.title;
  document
    .querySelector('meta[name="description"]')
    .setAttribute("content", route.description);
};

const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  locationHandler();
};

window.onpopstate = locationHandler;
window.route = route;
locationHandler();
