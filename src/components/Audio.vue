<template>
  <div class="audio-control">
    <div class="control">
      <input
        type="range"
        min="0"
        max="3"
        step="0.01"
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
import { musics } from "../settings";

export default {
  props: ["onVolume"],
  data() {
    return {
      muted: false,
      audio: null,
      volume: 2,
      playing: false,
      path: "/audio/ambiance/",
      sounds: musics
    };
  },
  methods: {
    selectSound() {
      let sound = this.sounds[Math.floor(Math.random() * this.sounds.length)];
      return sound;
    },
    startSound() {
      this.$emit("onVolume", this.volume / 10);
      this.playing = this.selectSound();
      this.audio = false;
      this.audio = new Audio(this.path + this.playing);
      this.audio.volume = this.volume / 10;
      this.audio.play();
      this.listenOnEnd(); // listen when sound if finish, start new one
    },
    nextSound() {
      this.audio.pause();
      this.startSound();
    },
    muteToggle() {
      if (this.muted) {
        this.volume = "2";
      } else {
        this.volume = "0";
      }
    },
    listenOnEnd() {
      let self = this;
      this.audio.onended = function() {
        self.audio.pause();
        self.startSound();
      };
    },
    getVolume() {
      if (this.$cookies.isKey("volume")) {
        this.volume = this.$cookies.get("volume");
      } else {
        this.$cookies.set("volume", this.volume);
      }
    }
  },
  watch: {
    play(val) {
      this.play = !val;
    },
    volume(val) {
      this.audio.volume = val / 10;
      this.$emit("onVolume", val / 10);
      this.$cookies.set("volume", val);
      this.muted = val == 0;
    }
  },
  mounted() {
    this.getVolume(); // Pick a sound and start
    this.startSound(); // Pick a sound and start
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
