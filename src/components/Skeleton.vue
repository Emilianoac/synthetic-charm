<script setup lang="ts">
  const props = defineProps({
    width: {
      default: "100%",
      type: String,
    },
    height: {
      default: "200px",
      type: String
    },
    bRadius: {
      default: "4px",
      type: String
    },
    margin: {
      default: "0",
      type: String,
    }
  })
</script>

<template>
  <div 
    class="skeleton" 
    :style="`width: ${width}; height: ${height}; border-radius: ${bRadius}; margin: ${margin}`">
  </div>
</template>


<style lang="scss">

  .skeleton {
    width: 100%;
    height: 200px;
    background: linear-gradient(40deg,  var(--color-musico-2) 40px, var(--color-musico-1) 80px 50px, var(--color-musico-2));
    background-position: 0;
    background-repeat: no-repeat;
    background-size: 600% 600%;
    border-radius: 6px;
    animation: loader-bg 2s ease-in-out infinite;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
  }

    
  @keyframes loader-bg {
    0% {
      background-position: 0% 82%;
    }

    50% {
      background-position: 100% 19%;
    }

    100% {
      background-position: 0% 82%;
    }
  }
</style>