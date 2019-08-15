<template>
  <div
    class="backgrounds animated"
    :class="showed ? 'fadeIn' : 'fadeOut'"
    ref="background"
    :style="'background-image: url(' + selected.path + ')'"
    v-if="selected"
  >
    <div class="mask">
      <div class="infos">
        <a target="_blank" :href="selected.url" class="title"
          >{{ selected.title }} <i class="fas fa-link"></i
        ></a>
        <small>{{ selected.user }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import { backgrounds } from "../settings";

export default {
  props: [],
  data() {
    return {
      viewed: [],
      images: backgrounds,
      selected: false,
      showed: true
    };
  },
  methods: {
    loadViwedBackground() {},
    alternateBackground() {
      let self = this;
      setInterval(function() {
        self.switchBackground();
      }, 35000);
    },
    switchBackground() {
      let self = this;
      self.showed = false;
      setTimeout(function() {
        self.getViewedBackground();
        self.showed = true;
      }, 700);
    },
    getViewedBackground() {
      let index = false;
      let loop = 0;
      while (index == false) {
        let i = Math.floor(Math.random() * this.images.length);
        let exist = false;
        let viewed = null;
        for (viewed in this.viewed) {
          if (this.viewed[viewed] === i) {
            exist = true;
          }
        }
        if (exist === false) {
          index = i;
        }
        if (loop > this.images.length * 100) {
          this.viewed = [];
        }
        loop++;
      }
      this.viewed.push(index);
      let image = this.images[index];
      this.selected = image;
    }
  },
  mounted() {
    this.getViewedBackground();
    this.loadViwedBackground();
    this.alternateBackground();
  }
};
</script>

<style lang="scss">
.backgrounds {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-size: cover;
  background-position: center center;
  .mask {
    width: 100vw;
    height: 100vh;
    background-color: rgba(#000, 0.3);
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    .infos {
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      line-height: 1.2;
      opacity: 0.6;
      .title {
        color: #fff;
        text-decoration: none !important;
        font-weight: 600;
        i {
          font-size: 0.7em;
        }
      }
      small {
        color: #ddd;
      }
    }
  }
}
</style>
