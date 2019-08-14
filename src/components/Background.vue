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
export default {
  props: [],
  data() {
    return {
      viewed: [],
      images: [
        {
          user: "DBott",
          title: "15/409 - le paysage froid",
          url:
            "https://www.deviantart.com/dbott/art/15-409-le-paysage-froid-774212237",
          path:
            "/backgrounds/15_409___le_paysage_froid_by_dbott_dcsy1zh-pre.jpg"
        },
        {
          user: "Aura-2",
          title: "256",
          url: "https://www.deviantart.com/aura-2/art/256-757346128",
          path: "/backgrounds/256_by_aura_2_dciwk0g-pre.jpg"
        },
        {
          user: "Aura-2",
          title: "255",
          url: "https://www.deviantart.com/aura-2/art/255-757345499",
          path: "/backgrounds/255_by_aura_2_dciwjiz-pre.jpg"
        },
        {
          user: "mabuli",
          title: "Mist",
          url: "https://www.deviantart.com/mabuli/art/Mist-752097368",
          path: "/backgrounds/mist_by_mabuli_dcfs21k-fullview.jpg"
        },
        {
          user: "merl1ncz",
          title: "Unnamed landscape",
          url:
            "https://www.deviantart.com/merl1ncz/art/Unnamed-landscape-539101410",
          path: "/backgrounds/unnamed_landscape_by_merl1ncz_d8wytb6-pre.jpg"
        },
        {
          user: "merl1ncz",
          title: "Mazca",
          url: "https://www.deviantart.com/merl1ncz/art/Mazca-590691036",
          path: "/backgrounds/mazca_by_merl1ncz_d9rok4c-pre.jpg"
        }
      ],
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
