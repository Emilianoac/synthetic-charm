<script setup lang="ts">
  import SiteLogo from "./Logotype.vue"
</script>

<template>
  <nav class="navbar-sitio sticky-top">
    <div class="container">
      <div class="navbar-container d-flex justify-content-center align-items-center">
        <RouterLink class="navbar-logo mx-auto" to="/">
          <SiteLogo/>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">

  .navbar-sitio {
    background: linear-gradient(to bottom,var(--color-musico-2) ,#0000);
    backdrop-filter: blur(10px);
    padding: 0.8em 0;

    .navbar-container {

      .navbar-logo {
        display: block;
        margin: auto;
        margin-left: 0;

        img {
          max-width: 250px;
          width: 100%;
        }
      }
    }
  }
</style>