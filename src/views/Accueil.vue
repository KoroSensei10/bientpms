<template class="w-100 h-100">
  <div
    class="
      container
      w-100
      h-100
      p-3
      .d-flex
      .flex-column
      .justify-content-between
    "
  >
    <div id="logo">
      <img src="/images/tpms.ico" alt="logo" />
    </div>
    <div class="m-3 flex-grow-1">
      <p class="citation">
        Tomber à été inventé pour se relever. Malheur à ceux qui ne tombent
        jamais.
      </p>
    </div>
    <div id="boutons">
      <button
        type="button"
        class="btn btn-outline-primary btn-lg mx-auto .d-block"
      >
        <router-link to="/login">Se connecter</router-link>
      </button>
      <p></p>
      <hr align="right" width="100%" size="4" noshade />
      <p></p>
      <button
        type="button"
        class="btn btn-outline-success btn-lg mx-auto .d-block"
      >
        <router-link to="/register">S'inscrire</router-link>
      </button>
      <hr noshade="1" width="100%" size="">
      <hr noshade="1" width="100%" size="">
      <footer class="container .pt-5 .text-center">
        <a href="">Conditions générales d'utilisation</a>
      </footer>
    </div>
  </div>
  <div class="bottom-decoration"></div>
</template>

<script>

</script>

<style>
#application{
  /* padding-top: 0px!important; */
  padding-bottom: 0px!important;
  background-color: #fff;
}

@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;600&display=swap');
.img {
    height: 250px;
    width: auto;
}

@media (max-width: 725px) {
    .img {
        height: 30vw;
        width: auto;
    }
}

.citation {
    font-family: 'Rubik', sans-serif;
    font-style: italic;
    font-size: 1em;
}

.buttons {
    width: 50vw;
    border-radius: 25px;
}

.p {
    text-align: center;
}

.container {
    margin-top: 30px;
}

.bottom-decoration {
  position: absolute;
  bottom: 0;
  margin-bottom: 0px;
  width: 100%;
  height: 200px;
  max-height: 20vh;
  background-image: linear-gradient(to right, #0084ff, #00f2ff);
  overflow-y: hidden;
  overflow-x: hidden;
  z-index: -1000;
  padding-bottom: 0px!important;
}
</style>

