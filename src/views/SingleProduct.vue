<template>
  <div>
    <ProductInfo :product="product" />
    <h1>Single Product Page</h1>
    {{ id }}
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductInfo from "@/components/ProductInfo.vue";

export default {
  components: { ProductInfo },
  data() {
    return {
      product: ""
    };
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  computed: mapGetters(["getProductById"]),
  created() {
    this.product = this.getProductById(this.id);
    console.log(this.product);
  }
};
</script>
