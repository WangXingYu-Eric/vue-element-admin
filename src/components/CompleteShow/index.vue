<template>
  <div>
    <el-popover v-if="popover" placement="right-start" width="300" trigger="hover" :content="completeStr">
      <span slot="reference" ref="showSpan">{{ abstractStr }}</span>
    </el-popover>
    <span v-if="!popover" ref="showSpan">{{ completeStr }}</span>
  </div>
</template>

<script>
export default {
  name: 'CompleteShow',
  props: {
    completeStr: {
      type: String,
      default: ''
    },
    minWidth: {
      type: [Number, Object],
      required: false,
      default: null
    }
  },
  data() {
    return {
      popover: false,
      abstractStr: this.completeStr
    }
  },
  watch: {
    completeStr() {
      this.showComputed()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.showComputed()
    })
  },
  methods: {
    showComputed() {
      if (!this.completeStr) {
        this.popover = false
        return
      }
      const currentWidth = this.minWidth || (this.$refs.showSpan.parentNode.parentNode.offsetWidth - 20) // showSpan所在cell的宽度
      const element = document.createElement('span')
      element.innerText = this.completeStr
      document.documentElement.append(element)
      const completeStrLen = element.offsetWidth
      if (completeStrLen > currentWidth) {
        if (completeStrLen - currentWidth >= currentWidth) {
          for (let i = 1; i <= this.completeStr.length; i++) {
            element.innerText = this.completeStr.substring(0, i)
            const tempLen = element.offsetWidth
            if (currentWidth <= tempLen + 14) {
              this.popover = true
              this.abstractStr = this.completeStr.substring(0, i - 1) + '...'
              break
            }
          }
        } else {
          for (let i = this.completeStr.length; i > 0; i--) {
            element.innerText = this.completeStr.substring(0, i)
            const tempLen = element.offsetWidth
            if (currentWidth >= tempLen + 14) {
              this.popover = true
              this.abstractStr = this.completeStr.substring(0, i) + '...'
              break
            }
          }
        }
      } else {
        this.popover = false
      }
      document.documentElement.removeChild(element)
    }
  }
}
</script>

