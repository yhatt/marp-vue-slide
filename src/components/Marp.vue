<template>
  <MarpWorker :markdown="markdown" v-slot="slides">
    <div class="marp-container" :class="classObject" @mousemove="activate">
      <swiper v-if="slides" ref="swiperRef" :options="swiperOptions" @ready="$emit('ready')">
        <swiper-slide v-for="(s, i) in slides" :key="i" class="marp-swiper-slide">
          <MarpSlide :slide="s.slide"/>
        </swiper-slide>
      </swiper>
      <div v-else class="marp-loading">
        <img src="../assets/marp-loading.svg">
      </div>
    </div>
  </MarpWorker>
</template>

<script>
import { MarpWorker, MarpSlide } from '@marp-team/marp-vue'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

export default {
  name: 'Marp',
  props: {
    markdown: String,
    index: { type: Number, default: 0 },
    swiper: { type: Object, default: () => ({}) },
  },
  data: () => ({ active: false }),
  components: { MarpWorker, MarpSlide, swiper, swiperSlide },
  computed: {
    classObject() {
      return { 'marp-active': !!this.active }
    },
    slides() {
      return this.swiperInstance && this.swiperInstance.slides
    },
    swiperInstance() {
      return this.$refs.swiperRef ? this.$refs.swiperRef.swiper : undefined
    },
    swiperOptions() {
      return {
        slidesPerView: 1,
        spaceBetween: 0,
        ...this.swiper,
        initialSlide: this.index,
        allowTouchMove: false,
      }
    },
  },
  methods: {
    activate() {
      if (this.active) clearTimeout(this.active)
      this.active = setTimeout(() => {
        this.active = undefined
      }, 1000)
    },
  },
  watch: {
    index(idx) {
      if (this.swiperInstance) this.swiperInstance.slideTo(idx)
    },
  },
}
</script>

<style lang="scss" scoped>
.marp-loading {
  display: flex;
  width: var(--marp-width, 100vw);
  height: var(--marp-height, 100vh);
  align-items: center;
  justify-content: center;
  background: #f0f0f0;

  img {
    width: 10%;
  }
}

.marp-swiper-slide {
  background: #000;

  /deep/ [data-marpit-svg] {
    width: var(--marp-width, 100vw);
    height: var(--marp-height, 100vh);
  }
}

.marp-container {
  cursor: none;
  position: relative;
  width: var(--marp-width, 100vw);
  height: var(--marp-height, 100vh);

  * {
    cursor: inherit;
  }

  &.marp-active {
    cursor: default;
  }
}
</style>
