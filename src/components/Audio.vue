<template>
  <div class="audio-control">
    <div class="control">
      <input
        type="range"
        min="0"
        max="10"
        v-model="volume"
        class="range"
      />
      <button v-on:click="nextSound">
        <i class="fas fa-fast-forward"></i>
      </button>
      <button v-if="muted" v-on:click="muteToggle">
        <i class="fas fa-volume-mute"></i>
      </button>
      <button v-if="!muted" v-on:click="muteToggle">
        <i class="fas fa-volume-up"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["ended"],
  data() {
    return {
      muted: false,
      audio: null,
      volume: 5,
      playing: false,
      path: "/audio/ambiance/",
      sounds: [
        "ambiance1.mp3",
        "ambiance2.mp3",
        "ambiance3.mp3",
        "ambiance4.mp3",
        "ambiance5.mp3",
        "ambiance6.mp3",
        "ambiance7.mp3",
        "ambiance8.mp3",
        "ambiance9.mp3",
        "ambiance10.mp3",
        "ambiance11.mp3"
      ]
    };
  },
  methods: {
    selectSound() {
      let sound = this.sounds[Math.floor(Math.random() * this.sounds.length)];
      return sound;
    },
    startSound() {
      this.playing = this.selectSound();
      this.audio = new Audio(this.path + this.playing);
      this.audio.play();
    },
    nextSound() {
        this.playing = this.selectSound();
        console.log(this.audio);
        this.audio.pause();
        this.audio.load();
        this.audio.play();
    },
    muteToggle() {
      this.muted = !this.muted;
      if(this.muted) {
        this.volume = 0;
      } else {
        this.volume = 2;
      }
    }
  },
  watch: {
    play(val) {
      this.play = !val;
    },
    ended(val) {
      this.play = !val;
    }
  },
  mounted() {
    this.startSound();
  }
};
</script>

<style lang="scss">
.audio-control {
  position: fixed;
  top: 0;
  right: 0;
  padding: 15px;
  display: flex;

  .control {
    display: flex;
    align-items: center;
  }
  button {
    background-color: transparent;
    border: none;
    outline: none;
    i {
      font-size: 1.1em;
      color: #fff;
      text-shadow: 0 0 2px rgba(#000, 0.7);
    }
  }

  .range::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-color: #ababab;
    border-radius: 50%;
    height: 10px;
    width: 10px;
    box-shadow: 0 0 4px 1px rgba(#000, 0.5);
  }

  .range {
    -webkit-appearance: none;
    background-color: #e6e6e6;
    border-radius: 4px;
    cursor: pointer;
    height: 4px;
    outline: 0;
    width: 60px;
    margin-bottom: 5px;
    margin-right: 5px;
  }
}
</style>
