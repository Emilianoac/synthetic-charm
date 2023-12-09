<script setup lang="ts">
  import { ref} from "vue"
  import { RouterLink, RouterView } from "vue-router"
  import Navbar from "./components/Navbar.vue"

</script>

<template>
  <Navbar/>
  <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
</template>

<style lang="scss">

  html {
    font-size: 16px;
    position: relative;
    color: var(--color-texto);
    background: linear-gradient(90deg, var(--color-primario) , var(--body-bg-color));
    background: linear-gradient(60deg, #1c1c1c, #e14b7d, #fd6f8b);
    background: linear-gradient(60deg,   #1d1d1d  300px, var(--color-musico-1) , var(--color-musico-2));
    background-repeat: no-repeat;
    height: 100%;
    background-attachment: fixed;
    transition: 0.5s ease-in-out;

    &::before {
      content: "";
      background: var(--bg-image);
      top: 0;
      position: absolute;
      filter: blur(10px);
      background-repeat: no-repeat;
      background-size: cover;
      height: 100vh;
      width: 100%;
      background-attachment: fixed;
      z-index: -1;
      opacity: 0.1;
    }
  }

  body {
    color: var(--color-texto);
    background-color: unset;
    height: 100%;
  }

  .route-enter-from {
    opacity: 0;
   }

  .route-enter-active {
    transition: all  0.3s ease-out;
  }

  .route-leave-to {
    opacity: 0;
    transform: translateX(-50px);
  }

  .route-leave-active {
    transition: all 0.3s ease-in;
  }

</style>