<!--粒子背景效果组件-->
<template>
  <div id="particles" />
</template>

<script>
import config from './config.json'
import './style.css'

export default {
  name: 'Particles',

  mounted() {
    require('particles.js')
    this.$nextTick(() => {
      this.initParticlesJS()
    })
  },

  methods: {
    initParticlesJS() {
      /* eslint-disable */
        particlesJS('particles', config)
      }
    }
  }
</script>
