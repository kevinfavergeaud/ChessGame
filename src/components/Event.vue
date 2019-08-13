<template>
  <div class="event-screens">
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
      </div>
    </div>

    <div class="loose-screen-back animated fadeInDown" v-if="type === 'checkmate' && winner !== client.orientation"></div>
    <div class="loose-screen animated fadeInDown" v-if="type === 'checkmate' && winner !== client.orientation">
      <div class="icon">
        <img src="/img/loose.svg" />
      </div>
      <div class="screen-content">
        <h1>Checkmate</h1>
        <h3>You loose this game...</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["type", "winner", "client"]
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
  pointer-events: none;
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
  .loose-screen-back
  {
    height: 100vh;
    width: 100vw;
    position: absolute;
    background-color: rgba(#e74c3c,0.3);
  }
  .loose-screen {
    @extend .win-screen;
    .icon {
      img {
        width: 175px;
      }
    }
  }
}
</style>
