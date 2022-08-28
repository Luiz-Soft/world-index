export default [
  /*{
      path: "*",
      name: "notfound",
      component: () => import("../views/NotFound"),
      meta: {
        title: "Página não encontrada",
      },
    },*/
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home"),
    meta: {
      title: "Countries Index",
    },
  },
  {
    path: "/details/:country",
    name: "Details",
    component: () => import("../views/Details"),
    props: (route) => ({
      country: route.params.country,
      countryCode: route.params.countryCode,
    }),
    meta: {
      title: "Details",
    },
  },
];
