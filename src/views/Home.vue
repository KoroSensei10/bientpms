<template>
  <div class="ui icon input" style="width: 100%">
    <input type="text" placeholder="Search..." />
    <i class="search icon"></i>
    
  </div>
  <div
      class="card ui fluid"
      v-for="product in products"
      :key="product.id"
      style="margin: 0"
    >
  </div>
</template>

<script>
export default {
    
}
</script>
