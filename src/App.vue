<template>
  <div id="app">
    <div class="screen">
      <Marp ref="marp" :markdown="markdown" :swiper="swiper" :index="index" @ready="ready"/>
    </div>
    <div class="print">
      <MarpWorker :markdown="markdown"/>
    </div>
  </div>
</template>

<script>
import { MarpWorker } from '@marp-team/marp-vue'
import screenfull from 'screenfull'
import { mapState } from 'vuex'
import store from "./store"
import Marp from './components/Marp.vue'
import key from './key'

export default {
  name: 'app',
  components: { Marp, MarpWorker },
  data: () => ({
    swiper: {
      effect: 'coverflow',
      speed: 300,
    },
  }),
  store,
  computed: {
    ...mapState({ markdown: s => s.marp.markdown, index: s => s.marp.index }),
    marp() {
      return this.$refs.marp
    },
  },
  mounted() {
    window.addEventListener('storage', e => store.dispatch('reload', e))

    document.addEventListener('keydown', e => {
      const press = key(e)

      if (press === 'fullscreen' && screenfull) {
        screenfull.toggle(document.body)
      } else if (press === 'presenter') {
        window.open(
          'presenter.html',
          'marp-presenter-view',
          'menubar=0,toolbar=0,width=960,height=540'
        )
      } else if (press) {
        store.dispatch(press)
      }

      if (press) e.preventDefault()
    })
  },
  methods: {
    ready() {
      store.dispatch('marp/updatePages', this.marp.slides.length)
    },
  },
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  background: #000;
}
</style>

<style scoped>
.print {
  height: 0;
  overflow: hidden;
}

@media print {
  .print {
    height: auto;
  }
  .screen {
    display: none;
  }
}
</style>
