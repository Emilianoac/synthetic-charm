<script setup lang="ts">
  import {reactive } from "vue"
  import db from "@/firebase/config"
  import { collection, getDocs } from "firebase/firestore"

  import type {Musician} from "@/interfaces/musician"
  import  {isMusician} from "@/typeGuards/isMusician"

  import Skeleton from "@/components/Skeleton.vue"

  const musicians = reactive<{ data: Musician[] }>({
    data: [],
  })

  async function getProjects() {
    try {
      let res = await getDocs(collection(db,"musicians"))
      res.docs.map(doc => {
        let docData =  { ...doc.data(), id: doc.id }
        if(isMusician(docData)) {
          musicians.data.push(docData)
        }
      })
    }
    catch(err) {
      console.log(err)
    }  
  }
  getProjects()

</script>

<template>
  <div class="container my-4">
    <!-- GALERIA DE MUSICOS -->
    <section class="galeria-musicos">
      <div class="row" v-if="musicians.data.length">
        <div class="col-6 col-md-4 col-lg-3 mt-4" v-for="(musico, i) in musicians.data">
          <article class="card-musico">
            <RouterLink :to="{ name: 'musicianProfile', params: {id: musico.slug} }">
              <img :style="`border-color:${musico.color}`" class="img-fluid" :src="musico.profileImage.url"/>
              <h4 class="mt-2 fw-bold small">{{musico.name }}</h4>
              <p class="small muted mt-2">{{ musico.musical_genre }}</p>
            </RouterLink>
          </article>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-6 col-md-4 col-lg-3 mt-4" v-for="(musico, i) in 8">
          <Skeleton width="100%" height="300px"/>
          <Skeleton width="90px" height="20px" margin="1em 0 0.5em 0"/>
          <Skeleton width="50px" height="20px"/>
        </div>
      </div>
    </section>
  </div>
</template>


<style lang="scss">

  .galeria-musicos {

    .card-musico {

      img {
        min-height: 250px;
        width: 100%;
        object-fit: cover;
        border-radius: var(--border-radius);
        border: 4px solid black;
      }

      a {
        text-decoration: none;
        color: var(--color-texto);
      }

      &:hover {
        opacity: 0.9;
      }
    }
  }
</style>
