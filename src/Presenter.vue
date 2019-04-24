<template>
  <MarpWorker :markdown="markdown" v-slot="slides">
    <div id="presenter" ref="presenter" :data-pages="slides && slides.length">
      <header class="header" v-if="slides">
        <div class="page">Page {{index + 1}} / {{slides.length}}</div>
      </header>
      <div class="timer" :class="{ active: timerStart }">
        <div class="timer-display">{{ timerDisplay }}</div>
        <button class="timer-start" v-if="!timerStart" @keydown.stop @click="startTimer">Start</button>
        <button class="timer-reset" v-if="timerStart" @keydown.stop @click="resetTimer">Reset</button>
      </div>
      <div class="current" v-if="slides">
        <MarpSlide :slide="slides[index].slide" v-if="slides[index]"/>
      </div>
      <div class="next" v-if="slides && (index + 1) < slides.length" ref="next" @click="clickNext">
        <MarpSlide :slide="slides[index + 1].slide" v-if="slides[index + 1]"/>
      </div>
      <div class="note" v-if="slides && slides[index]" @keydown.stop>
        <p v-for="(comment, i) in slides[index].comments" v-text="comment" :key="i"/>
      </div>
    </div>
    <span v-if="slides" v-once>{{ready()}}</span>
  </MarpWorker>
</template>

<script>
import { mapState } from 'vuex'
import { MarpWorker, MarpSlide } from '@marp-team/marp-vue'
import store from "./store"
import key from './key'

export default {
  name: 'presenter',
  components: { MarpWorker, MarpSlide },
  store,
  data: () => ({
    timer: undefined,
    timerStart: undefined,
  }),
  computed: {
    ...mapState({ markdown: s => s.marp.markdown, index: s => s.marp.index }),
    pages() {
      return this.$refs.presenter && this.$refs.presenter.dataset.pages
    },
    timerDisplay() {
      const second = this.timer != null ? this.timer / 1000 : 0
      const s = `${Math.floor(second) % 60}`.padStart(2, '0')
      const m = `${Math.floor(second / 60) % 60}`.padStart(2, '0')
      const h = `${Math.floor(second / 3600)}`.padStart(2, '0')

      return `${h}:${m}:${s}`
    },
  },
  mounted() {
    window.addEventListener('storage', e => store.dispatch('reload', e))

    document.addEventListener('keydown', e => {
      const press = key(e)

      if (['prev', 'next', 'first', 'last'].includes(press)) {
        store.dispatch(press)
        e.preventDefault()
      }
    })

    this.startTimer()
  },
  methods: {
    ready() {
      this.$nextTick(() => store.dispatch('marp/updatePages', this.pages))
    },
    clickNext({ target }) {
      if (
        target !== this.$refs.next &&
        target.getAttribute('data-marpit-svg') == null
      ) {
        store.dispatch('next')
      }
    },
    startTimer() {
      this.timerStart = new Date().getTime()

      const tick = () => {
        if (this.timerStart == null) return

        this.timer = new Date().getTime() - this.timerStart
        window.requestAnimationFrame(tick)
      }

      tick()
    },
    resetTimer() {
      this.timer = undefined
      this.timerStart = undefined
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

<style lang="scss" scoped>
#presenter {
  display: grid;
  font-size: 14px;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 2em repeat(3, calc(33.33333% - 2em / 3));
  height: 100vh;
  width: 100vw;

  /deep/ [data-marpit-svg] {
    box-sizing: border-box;
    height: 100%;
    user-select: none;
    width: 100%;

    section {
      pointer-events: none;
    }
  }

  .header {
    background: #333;
    color: #888;
    display: flex;
    grid-column: 1/3;
    grid-row: 1/2;
    line-height: 2em;

    .page {
      flex: 1;
      padding: 0 0.5em;
    }
  }

  .current {
    grid-column: 1/2;
    grid-row: 2/4;
    overflow: hidden;
    padding: 30px;
  }

  .timer {
    align-items: center;
    color: #333;
    display: flex;
    flex-direction: column;
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
    grid-column: 2/3;
    grid-row: 2/2;
    justify-content: center;
    padding: 30px;

    &.active {
      color: #eee;
    }

    button {
      appearance: none;
      background: transparent;
      border: 2px solid #888;
      color: #888;
      cursor: pointer;
      font-size: calc(14px + 0.5vw);
      outline: 0;
      padding-left: calc(5px + 2vw);
      padding-right: calc(5px + 2vw);
      transition: color 0.15s linear, border 0.15s linear;
      user-select: none;

      &:hover {
        border-color: #ccc;
        color: #ccc;

        &:active {
          transition: none;
          background: #333;
        }
      }

      &:focus {
        border-color: #0288d1;
      }
    }

    &-display {
      color: inherit;
      font-size: 4.5vw;
      line-height: 1;
      padding-bottom: 15px;
      transition: color 0.3s linear;
    }
  }

  .next {
    grid-column: 2/3;
    grid-row: 3/4;
    padding: 30px;

    /deep/ [data-marpit-svg] > foreignObject {
      cursor: pointer;
    }
  }

  .note {
    background: #333;
    color: #ccc;
    font-size: 16px;
    grid-column: 1/3;
    grid-row: 4/5;
    overflow: auto;
    padding: 1em;
    word-break: break-all;
    white-space: pre-wrap;

    > p:first-child {
      margin-top: 0;
    }
  }
}
</style>
