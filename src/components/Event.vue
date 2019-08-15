<template>
  <div class="event-screens" :style="type ? '' : 'pointer-events: none'">
    <canvas ref="confetti" class="confetti-canvas"></canvas>
    <div
      class="win-screen animated jackInTheBox"
      v-if="type === 'checkmate' && winner === client.orientation"
    >
      <div class="icon">
        <img src="/img/trophe.svg" />
      </div>
      <div class="screen-content">
        <h1>Checkmate !</h1>
        <h3>You win this game !</h3>
        <router-link to="/" class="btn btn-outline-light mt-2"
          >Back to main menue</router-link
        >
      </div>
    </div>

    <div
      class="loose-screen-back animated fadeInDown"
      v-if="type === 'checkmate' && winner !== client.orientation"
    ></div>
    <div
      class="loose-screen animated fadeInDown"
      v-if="type === 'checkmate' && winner !== client.orientation"
    >
      <div class="icon">
        <img src="/img/loose.svg" />
      </div>
      <div class="screen-content">
        <h1>Checkmate</h1>
        <h3>You loose this game...</h3>
        <router-link to="/" class="btn btn-outline-light mt-2"
          >Back to main menue</router-link
        >
      </div>
    </div>

    <div
      class="draw-screen-back animated fadeInDown"
      v-if="type === 'draw'"
    ></div>

    <div class="draw-screen animated fadeInDown" v-if="type === 'draw'">
      <div class="icon">
        <img src="/img/draw.svg" />
      </div>
      <div class="screen-content">
        <h1>Draw !</h1>
        <h3>No winner for this game...</h3>
        <router-link to="/" class="btn btn-outline-light mt-2"
          >Back to main menue</router-link
        >
      </div>
    </div>

    <div
      class="draw-screen-back animated fadeInDown"
      v-if="type === 'stalemate'"
    ></div>

    <div class="draw-screen animated fadeInDown" v-if="type === 'stalemate'">
      <div class="icon">
        <img src="/img/slatemate.svg" />
      </div>
      <div class="screen-content">
        <h1>Stalemate !</h1>
        <h3>No winner for this game...</h3>
        <router-link to="/" class="btn btn-outline-light mt-2"
          >Back to main menue</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import confetti from "canvas-confetti";

export default {
  props: ["type", "winner", "client"],
  watch: {
    type(val) {
      if (val === "checkmate") {
        // If checkmate
        if (this.winner === this.client.orientation) {
          // If winner

          let canvas = this.$refs.confetti;
          canvas.confetti =
            canvas.confetti ||
            confetti.create(canvas, {
              resize: true
            });

          let confetti_end = Date.now() + 8 * 1000;
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
                y: Math.random() - 0.2
              }
            });
          }, 200);
        }
      }
    }
  }
};
</script>

<style lang="scss">
$screen-height: 250px;
.event-screens {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9000;

  .win-screen {
    width: 500px;
    height: $screen-height;
    background-color: #515b77;
    display: flex;
    border-bottom-left-radius: 30px;
    border-top-left-radius: 30px;
    box-shadow: 0 0 70px rgba(#000, 0.3);

    .icon {
      background-color: #677497;
      height: $screen-height;
      align-items: center;
      display: flex;
      width: 90px;
      border-bottom-left-radius: 30px;
      border-top-left-radius: 30px;
      box-shadow: 5px 0 5px rgba(#000, 0.04);

      img {
        width: 150px;
        position: relative;
        left: -75px;
      }
    }
    .screen-content {
      flex: 1;
      padding: 20px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      line-height: 1;
      h1 {
        font-weight: 800;
        font-size: 3.8em;
        color: #fff;
        margin: 0;
        font-family: "Francois One", sans-serif;
      }
      h3 {
        color: #cddbff;
        font-weight: 300;
        margin: 0;
        font-size: 1.8em;
      }
    }
  }
  .loose-screen-back {
    height: 100vh;
    width: 100vw;
    position: absolute;
    background-color: rgba(#e74c3c, 0.3);
  }
  .loose-screen {
    @extend .win-screen;
    .icon {
      img {
        width: 175px;
      }
    }
  }
  .draw-screen {
    @extend .win-screen;
    .icon {
      img {
        width: 155px;
      }
    }
  }
}
.draw-screen-back {
  height: 100vh;
  width: 100vw;
  position: absolute;
  background-color: rgba(#233138, 0.7);
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
