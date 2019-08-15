<template>
  <div id="app" class="frame">
    <router-view />
    <game-audio @onVolume="setVolume"></game-audio>
  </div>
</template>

<script>
import audio from "./components/Audio";

export default {
  components: { gameAudio: audio },
  methods: {
    setVolume(val) {
      window.volume = val;
    }
  }
};
</script>
