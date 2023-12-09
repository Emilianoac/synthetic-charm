<script setup lang="ts">
  import { reactive, ref, type Ref} from "vue"
  import { useRoute } from "vue-router"
  import db from "@/firebase/config"
  import {collection, getDocs, query, where } from "firebase/firestore"
  import { colorModifier } from "@/composables/userColorModifier"
  import playIcon from "@/assets/play.svg"
  import pauseIcon from "@/assets/pause.svg"

  import type { Musician } from "@/interfaces/musician"
  import {isMusician} from "@/typeGuards/isMusician"

  const route = useRoute()

  const musician = reactive({
    data: null as Musician | null,
    currentSong: {
      progressIntervalId: 0,
      element: null as HTMLAudioElement | null,
      id: null as number | null,
      progressPercentage: 0 as number ,
    },
    error: {
      message: "Error" as string,
      state: false as boolean
    },
    profileImageLoaded: false as boolean,
  })
  const songRefs: Ref<Record<string, HTMLAudioElement>> = ref({})

  async function getData(): Promise<void> {
    try {
      const q = query(collection(db,"musicians"), where("slug", "==", route.params.id))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        querySnapshot.forEach( doc => {
          let data = {... doc.data(), id: doc.id} 
          if(isMusician(data)) {
            musician.data = data  
            document.title = `${musician.data.name} | Synthethic Charm`  
            document.documentElement.style.setProperty("--color-musico-1", musician.data.color)
            document.documentElement.style.setProperty("--color-musico-2", colorModifier(musician.data.color, -130))
            document.documentElement.style.setProperty("--bg-image", `url(${musician.data.profileImage.url})`)

            let metaThemeColor = document.querySelector<HTMLMetaElement>("meta[name=theme-color]")
            if (metaThemeColor) metaThemeColor.setAttribute("content", musician.data.color)
            
          } else {
            throw new Error("Musician data is incomplete.")
          }
        })
      } else {
        throw new Error("That musician does not exist.")
      }
    }
    catch(err: any) {
      musician.error.state = true
      musician.error.message = err.message
      console.log(err)
    }
  }
  getData()

  function playSong(song: HTMLAudioElement, id: number): void {
    musician.currentSong.id = id

    song.volume = 0.5

    const songDuration = Math.ceil(song.duration)
    let currentTime = 0
    let percentage = 0

    if (musician.currentSong.progressIntervalId) {
      clearInterval(musician.currentSong.progressIntervalId)
    }

    musician.currentSong.progressIntervalId = setInterval(() => {
      currentTime++
      percentage = (currentTime / songDuration) * 100
      musician.currentSong.progressPercentage = percentage

      if (percentage > 100) {
        musician.currentSong.progressPercentage = 0
        clearInterval(musician.currentSong.progressIntervalId)
      }
    }, 1000) as unknown as number

    if (musician.currentSong.element && musician.currentSong.element !== song) {  
      musician.currentSong.element.pause()
      musician.currentSong.element.currentTime = 0
      musician.currentSong.progressPercentage = 0
    }

    if (musician.currentSong.element) {
      musician.currentSong.element.removeEventListener("ended", onSongEnd)
    }

    if (song.paused) {
      song.play()
      song.addEventListener("ended", onSongEnd)
    } else {
      clearInterval(musician.currentSong.progressIntervalId)
      musician.currentSong.progressPercentage = 0
      song.pause()
      song.currentTime = 0
      musician.currentSong.id = null
    }

    musician.currentSong.element = song.paused ? null : song
    musician.currentSong.id = song.paused ? null : id
  }

  function onSongEnd() {
    musician.currentSong.element = null
    musician.currentSong.id = null
  }
</script>

<template>
  <div class="container my-4">  
    <div v-if="musician.error.state">
      <div class="text-center">
        <h1 class="fw-bold text-uppercase">{{  musician.error.message }}</h1>
        <RouterLink class="btn btn-link text-light p-0" to="/"><i class="fas fa-arrow-left"></i> Go to home</RouterLink>
      </div>
    </div>
    <template v-else>
      <template v-if="musician.data">
        <div class="row mb-4">
          <div class="col-12">
            <RouterLink class="btn btn-link p-0 text-light" to="/"><i class="fas fa-arrow-left"></i> Back to home</RouterLink>
          </div>
        </div>
        <div class="perfil-musico">
          <div class="perfil-musico__imagen">
            <h1 class="fw-bold text-uppercase mb-1">{{ musician.data.name }}</h1>
            <p class="mb-3">{{ musician.data.musical_genre }}</p>
            <img 
              class="gato-imagen img-fluid" 
              :style="`border: 5px solid ${musician.data.color} `"
              :src="musician.data.profileImage.url" 
              :title="musician.data.name"
              @load="musician.profileImageLoaded = true"
            />
          </div>
          <div class="perfil-musico__informacion">
            <div class="musico-datos">
              <dl class="">
                <dt>Country</dt>
                <dd>{{ musician.data.country}}</dd>
                
                <dt>Age</dt>
                <dd>{{ musician.data.age }}</dd>
  
                <dt>Instrument</dt>
                <dd>{{ musician.data.instrument}}</dd>
  
                <dt>Biography</dt>
                <dd>{{ musician.data.bio }}</dd>
  
                <dt>Facts</dt>
                <dd>{{ musician.data.fun_fact }}</dd>
              </dl>
            </div>
          </div>
          <div class="perfil-musico__albumes">
            <div class="album">
              <div class="album__header">
                <div class="album__info">
                  <p class="fw-bold mb-1">{{ musician.data.name }}</p>
                  <p class="mb-1">{{ musician.data.albums[0].title }}</p>
                  <p class="small">{{ musician.data.albums[0].year }}</p>
                </div>
                <img class="album__cover img-fluid" :src="musician.data.albums[0].cover.url" />
              </div>
              <ul class="album__canciones mt-2">
                <li class="canciones__header">
                  <p>#</p>
                  <p>Name</p>
                  <p>Duration</p>
                </li>
                <li v-for="(song, i) in musician.data.albums[0].songs">
                  <div class="cancion__btn d-flex align-items-center">
                    <button 
                      @click="playSong(songRefs[i], i)"
                      :style="`background-image: url(${musician.currentSong.id == i ? pauseIcon : playIcon})`">
                    </button>
                  </div>
                  <p>{{ song.title }}</p>
                  <p>00:30</p>
                  <audio 
                    :id="`song-${i+1}`" 
                    ref="songRefs"
                    hidden 
                    controls 
                    :src="song.audio.url">
                  </audio>
                  <div 
                    :style="`width:${musician.currentSong.id == i ? musician.currentSong.progressPercentage : 0}%`" 
                    class="progress-percentage">
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>     
      </template>
    </template>
  </div>
</template>

<style lang="scss">

  .perfil-musico {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 50px;
    grid-row-gap: 50px;

    .perfil-musico__imagen {

      h1 {
        font-size: 2.1em;
      }

      img {
        border-radius: 50%;
      }
    }

    .perfil-musico__informacion {

      .musico-datos {
  
        dl {
  
          dd {
            border: 1px solid var(--color-musico-2);
            background: var(--color-primario-lighten-opacity);
            border-radius: var(--border-radius);
            backdrop-filter: blur(20px);
            margin-top: 0.5em;
            padding: 0.6em;
  
          }
        }
      }
    }

    .perfil-musico__albumes {

      .album {

        .album__header,
        .album__canciones {
          border: 1px solid var(--color-musico-2);
          background: var(--color-primario-lighten-opacity);
          border-radius: var(--border-radius);
          padding: 1.5em;
        }
        
        .album__header {
          display: grid;
          grid-template-columns: 1fr 1fr;

          .album__cover {
            max-width: 120px;
            display: block;
            margin: auto;
            margin-right: 0;
            border-radius: 8px;
          }
        }

        .album__canciones {
          padding: 1.5em;
          list-style-type: none;
          width: 100%;
          margin-bottom: 0;

          .canciones__header {
            p {
              font-weight: bold;
            }
          }
          
          li {
            display: grid;
            grid-template-columns: 55px 1.8fr 1fr;
            border-bottom: 1px solid var(--color-primario-darken);
            padding: 0.5em 0;
            position: relative;

            .cancion__btn {

              button {
                background: white;
                background-size: 20px;
                background-repeat: no-repeat;
                background-position: center;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                border: 0;

                &:hover {
                  opacity: 0.8;
                }
              }
            }

            p {
              margin-bottom: 0;
              font-size: 0.9em;
            }
            
            .progress-percentage {
              position: absolute;
              bottom: 0;
              height: 3px;
              background: dodgerblue;
              bottom: 0;
              width: 10%;
            }
          }
        }
      }
    }
  }

  @media(max-width: 1200px) {

    .perfil-musico {
      grid-template-columns: 1fr;

      .perfil-musico__imagen {
        
        img {
          margin: auto;
          display: block;
          width: 100%;
          max-width: 400px;
          max-height: 400px;
        }
      }
    }
  }

  @media(max-width: 575px) {

    .perfil-musico {

      .perfil-musico__imagen {

        h1 {
          font-size: 1.3em;
        }
      }
    }
  }
</style>