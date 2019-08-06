module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/_variables.scss";  @import "@/styles/_mixins.scss"; @import "@/styles/_global.scss"; @import "@/styles/_animate.scss";  @import "@/styles/_chessboard.scss";`
      }
    }
  }
};
