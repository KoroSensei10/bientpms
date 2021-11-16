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
    <div id="citation .d-flex .justify-content-center">
      <p class="fs-1 mt-md-5 .text-white citation">
        Tomber à été inventé pour se relever. Malheur à ceux qui ne tombent
        jamais.
      </p>
    </div>
    <div id="boutons">
      <button
        type="button"
        class="btn .buttons m-3 btn-outline-primary btn-lg mx-auto .d-block"
      >
        <router-link to="/login">Se connecter</router-link>
      </button>
      <p></p>
      <hr align="right" width="100%" size="4" noshade />
      <p></p>
      <button
        to="/register"
        type="button"
        class="btn buttons btn-outline-primary btn-lg mx-auto .d-block"
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
  <div></div>
  <div class="bottom-decoration"></div>
</template>

<script>

</script>

