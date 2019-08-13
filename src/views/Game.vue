<template>
  <div class="gui w-100">
    <div class="config" v-if="step != 'play'">
      <div class="row w-100 justify-content-center">
        <div class="col-xl-5 col-lg-6 col-md-6 col-12">
          <div class="form-group play-form" v-show="step == 'username'">
            <label>Your Username</label>
            <form class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Will be displayed to everyone"
                v-model="client.name"
              />
              <button class="btn btn-lg btn-play" v-on:click.prevent="setStep">
                <span v-if="party.players < 2">Play now !</span>
                <span v-if="party.players >= 2">Watch the match !</span>
              </button>
            </form>
          </div>

          <div
            class="form-group play-form-colors"
            v-show="step == 'orientation'"
          >
            <label>Choose your color</label>
            <div class="colors">
              <div
                class="chess-black"
                v-on:click="setOrientation('black')"
              ></div>
              <div
                class="chess-white"
                v-on:click="setOrientation('white')"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container chessboard-container" v-if="step == 'play'">
      <div class="player">
        <div
          class="text-center"
          v-if="
            client.opponent !== null &&
              !eval('this.users.' + client.opponent + '.loading') &&
              !eval('this.users.' + client.opponent + '.connected')
          "
        >
          <i
            >No opponents for now! You can play with <br />
            your friends by sharing this links :
          </i>
          <h3>{{ party.url }}</h3>
        </div>
        <div
          class="loading"
          v-if="
            client.opponent !== null &&
              eval('this.users.' + client.opponent + '.loading')
          "
        >
          <i class="fas fa-spin fa-spinner mr-2"></i>Connecting...
        </div>
        <span
          v-if="
            client.opponent !== null &&
              eval('this.users.' + client.opponent + '.connected')
          "
          ><i class="fas fa-user mr-2"></i
          >{{ eval("this.users." + client.opponent + ".name") }}</span
        >
      </div>

      <div class="chessboard-component animated fadeIn">
        <chessboard
          :fen="party.fen"
          :orientation="client.orientation"
          :turn="party.turn"
          :coords="false"
          :isViewer="false"
          @onMove="move"
        />
      </div>

      <div class="player">
        <span><i class="fas fa-user mr-2"></i>{{ client.name }}</span>
      </div>
    </div>

    <canvas ref="confetti" class="confetti-canvas"></canvas>

    <event :type="party.status" :winner="party.winner" :client="client"></event>
  </div>
</template>

<script>
import chessboard from "../components/Chessboard";
import event from "../components/Event";
import io from "socket.io-client";
import confetti from "canvas-confetti";

// eslint-disable-next-line
var socket = io("http://localhost:3000");

export default {
  data() {
    return {
      socket: false,
      step: "username",
      client: {
        orientation: null,
        opponent: null,
        name: null,
        id: null
      },
      users: {
        black: {
          id: null,
          name: null,
          orientation: null,
          connected: false,
          loading: false,
          disconnected: false
        },
        white: {
          id: null,
          name: null,
          orientation: null,
          connected: false,
          loading: false,
          disconnected: false
        }
      },
      party: {
        id: false,
        url: null,
        viewers: 0,
        players: 0,
        turn: "white",
        fen: "rnbqkbnr/1pppp1pp/8/8/p1B1P3/5Q2/PPPP1PPP/RNB1K1NR b KQkq -",
        status: false,
        ended: false,
        winner: false
      }
    };
  },
  components: {
    chessboard: chessboard,
    event: event
  },
  methods: {
    setStep() {
      if (this.party.players >= 2) {
        // for viewers
        this.step = "play";
        this.socketGameMovements();
        return;
      }
      if (!this.client.name) {
        this.step = "username";
        return;
      }
      if (!this.client.orientation) {
        if (this.users.white.connected === true) {
          this.setOrientation("black");
          return;
        }
        if (this.users.black.connected === true) {
          this.setOrientation("white");
          return;
        }

        this.step = "orientation";
        return;
      }
    },
    setOrientation(color) {
      this.client.orientation = color;
      this.party.players++;

      if (color == "black") {
        this.users.black.name = this.client.name;
        this.users.black.id = this.client.id;
        this.users.black.connected = true;
        this.client.opponent = "white";
      }
      if (color == "white") {
        this.users.white.name = this.client.name;
        this.users.white.id = this.client.id;
        this.users.white.connected = true;
        this.client.opponent = "black";
      }
      this.starGame();
    },
    starGame() {
      socket.emit("start", { client: this.client });
      this.step = "play";
      this.socketGameMovements();
    },
    checkParty() {
      if (!this.$route.params.id) {
        let id = this.generateUUID();
        socket.emit("gameCreate", { party: id });
        this.$router.push({ name: "game", params: { id: id } });
        this.party.id = this.$route.params.id;
        this.party.url = this.$route.fullPath;
        socket.emit("gameConnect", { party: this.party.id });
      } else {
        this.party.id = this.$route.params.id;
        this.party.url = this.$route.fullPath;
        socket.emit("gameConnect", { party: this.party.id }); // send new connection
        socket.on("gameNotFound", () => {
          window.location.href = "/game/"; // redirect to new game...
        });
      }
    },
    createClientId() {
      this.client.id = this.generateUUID("player-xxxxxxxxx");
    },
    move(data) {
      if (this.party.fen !== data.fen) {
        this.party.fen = data.fen;
        socket.emit("move", data.fen);
      }
    },
    generateUUID(mold = "xxxx-xxxx-xxxx") {
      var d = Math.random();
      return mold.replace(/[x]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      });
    },
    eval(string) {
      return eval(string);
    },
    toColor() {
      return this.party.turn === "w" ? "white" : "black";
    },
    socketGameInfo() {
      socket.on("gameInfos", infos => {
        if (infos !== null && infos.players !== undefined) {
          this.users = infos.players;
          let players = 0;
          if (this.users.white.connected === true) {
            players++;
          }
          if (this.users.black.connected === true) {
            players++;
          }
          this.party.players = players;
        }
        if (infos !== null && infos.fen) {
          this.party.fen = infos.fen;
        }
      });
    },
    socketGameMovements() {
      socket.on("moved", fen => {
        this.party.fen = fen;
      });
    },
    socketEvents() {
      socket.on("event", data => {
        if (data.type === "checkmate") {
            console.log('checkmate');
          this.party.status = "checkmate";
          this.party.ended = true;
          this.party.winner = data.winner;

          if (data.winner === this.client.orientation) {
            let canvas = this.$refs.confetti;
            canvas.confetti =
              canvas.confetti ||
              confetti.create(canvas, {
                resize: true
              });

            let confetti_end = Date.now() + 3000 * 1000;
            let interval = setInterval(function() {
              if (Date.now() > confetti_end) {
                return clearInterval(interval);
              }
              canvas.confetti({
                startVelocity: 30,
                spread: 360,
                ticks: 60,
                shapes: ["square"],
                origin: {
                  x: Math.random(),
                  // since they fall down, start a bit higher than random
                  y: Math.random() - 0.2
                }
              });
            }, 200);
          }
        }
      });
    }
  },
  mounted() {
    this.checkParty(); // Check if party exist if not create one
    this.createClientId(); // create unique player id
    this.setStep(); // get current step (username, orientation or play)
    this.socketGameInfo(); // Listen for game Infos (new player, load fen..)
    this.socketEvents(); // Listen for game events (chessmate, slate...)
  },
  beforeCreate() {
    document.getElementById("app").classList.add("frame-game");
  }
};
</script>

<style lang="scss">
.config {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
}
.chessboard-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;

  .chessboard-component {
    width: 750px;
  }

  .player {
    width: 730px;
    height: 100px;
    display: flex;
    justify-content: center;
    color: #fff;
    span {
      color: #fff;
      font-weight: 600;
    }
    &:first-child {
      align-items: flex-end;
      padding-bottom: 15px;
    }
    &:last-child {
      align-items: flex-start;
      padding-top: 15px;
    }
  }
}
.confetti-canvas {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}
</style>
