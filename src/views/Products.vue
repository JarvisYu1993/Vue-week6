<template>
  <div class="container pt-4">
    <Loading :active="isLoading"></Loading>
    <modal-detail ref="modalDetail" :product="product" @add-cart="addCart"></modal-detail>
    <h1 class="border-bottom pb-2">商品列表</h1>
    <ul class="productWrap mt-3">
      <li class="productCard" v-for="item in products" :key="item.id">
        <h4 class="productType">新品</h4>
        <div
          class="productImg"
          :style="{ backgroundImage: `url(${item.imageUrl})` }"
          @click="getProduct(item.id)"
          :disabled="loadingStatus.loadingItem === item.id || !item.is_enabled"
        >
        </div>
        <div class="text-start px-3 pt-3">
          <h2 class="product_title">{{ item.title }}</h2>
          <del class="originPrice">原價：NT${{ item.origin_price }}</del>
          <p class="nowPrice text-danger fw-bold">特價：NT${{ item.price }}</p>
        </div>
        <a
          href="#"
          id="addCardBtn"
          @click.prevent="addCart(item.id, (qty = 1))"
          :disabled="loadingStatus.loadingItem === item.id || !item.is_enabled"
        >
          加入購物車
        </a>
      </li>
    </ul>
    <pagination :page="pagination" @get-product="getProductList"></pagination>
  </div>
</template>

<script>
import modalDetail from '@/components/modalDetail.vue'
import pagination from '@/components/pagination.vue'

export default {
  name: 'Products',
  data () {
    return {
      products: [],
      product: {},
      cart: {},
      loadingStatus: {
        loadingItem: ''
      },
      isLoading: false,
      pagination: {}
    }
  },
  components: {
    modalDetail,
    pagination
  },
  methods: {
    getProducts () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products`
      this.$http.get(url)
        .then((response) => {
          if (response.data.success) {
            this.products = response.data.products
            this.isLoading = false
          } else {
            alert(response.data.message)
            this.isLoading = false
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getProduct (id) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`
      this.loadingStatus.loadingItem = id
      this.$http.get(url).then((response) => {
        if (response.data.success) {
          this.loadingStatus.loadingItem = ''
          this.product = response.data.product
          this.isLoading = false
          this.$refs.modalDetail.openModal()
        } else {
          alert(response.data.message)
        }
      })
    },
    getProductList (page = 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products?page=${page}`
      this.$http.get(url).then((response) => {
        if (response.data.success) {
          this.pagination = response.data.pagination
        } else {
          alert(response.data.success)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    addCart (id, qty = 1) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.loadingStatus.loadingItem = id
      const cart = {
        product_id: id,
        qty
      }
      this.$http.post(url, { data: cart }).then((response) => {
        if (response.data.success) {
          alert(response.data.message)
          this.loadingStatus.loadingItem = ''
          this.$refs.modalDetail.hideModal()
          this.isLoading = false
        } else {
          alert(response.data.message)
        }
      })
    }
  },
  created () {
    this.getProducts()
    this.getProductList()
  }
}
</script>
