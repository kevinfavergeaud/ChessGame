<template>
  <div class="gui w-100">
    <div class="container chessboard-container">
      <div class="player"></div>
      <div class="animated fadeIn">
        <chessboard
          :free="true"
          :fen="'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq – 0 1'"
        />
      </div>
      <div class="player">
        <button v-on:click="ping">Ping me</button>
      </div>
    </div>
  </div>
</template>

<script>
import { chessboard } from "vue-chessboard";

export default {
  data() {
    return {
      board: null,
      socketConnected: false,
      socketMessage: false
    };
  },
  components: {
    chessboard: chessboard
  },
  sockets: {
    connect() {
      this.socketConnected = true;
    },
    disconnect() {
      this.socketConnected = false;
    },
    messageChannel(data) {
      this.socketMessage = data;
    }
  },

  methods: {
    ping() {
      this.$socket.emit("ping");
      alert('ping');
    }
  },

  beforeCreate() {
    document.getElementById("app").classList.add("frame-game");
  },
  mounted() {}
};
</script>

<style lang="scss">
.chessboard-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  .square-ratio {
    max-width: 75vh;
    overflow: inherit !important;
    .chessboard {
      background-color: #fff;
      box-shadow: 0 5px 150px rgba(#000, 0.2);
    }
  }
  .player {
    width: 75vh;
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
