import { createRouter, createWebHashHistory } from "vue-router"
import Home from "../views/Home.vue"

const setHomeStyle = () => {
  document.documentElement.style.setProperty('--color-musico-1', "#242424")
  document.documentElement.style.setProperty('--color-musico-2', "#242424")
  document.documentElement.style.setProperty('--bg-image', `url()`)
  document.title = "Synthetic Charm | Artificial musician profiles"

  let metaThemeColor = document.querySelector<HTMLMetaElement>("meta[name=theme-color]")
  if (metaThemeColor) metaThemeColor.setAttribute("content", "#242424")
}

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter: setHomeStyle
    },
    {
      path: "/musician/:id",
      name: "musicianProfile",
      meta: {
        title: ""
      },
      props: true,
      component: () => import("../views/Profile.vue")
    }
  ]
})

export default router
