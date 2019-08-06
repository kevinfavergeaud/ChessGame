<template>
  <div class="frame-center">
    <div class="home-buttons animated zoomIn">
      <router-link to="/game" href="#" class="btn btn-outline-light">
        <i class="fas fa-robot"></i>
        <span>Jouer contre un robot</span>
      </router-link>
      <router-link to="/game" class="btn btn-outline-light">
        <i class="fas fa-chess"></i>
        <span>Créer une partie</span>
        <small>Jouez contre vos amis</small>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    document.getElementById("app").classList.remove("frame-game");
  }
};
</script>

<style lang="scss">
.frame-center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.home-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px;
    width: 220px;
    padding: 20px 0;
    border-width: 3px;
    background-color: lighten($frame-color, 5);
    &:hover {
      background-color: #fff;
    }
    i {
      font-size: 2em;
      padding: 10px 0;
    }
  }
}
</style>
