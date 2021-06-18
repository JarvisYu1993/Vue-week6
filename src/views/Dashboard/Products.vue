<template>
      <div class="container pt-4">
      <Loading :active="isLoading"></Loading>
      <div class="d-flex justify-content-between">
        <h1 class="">商品列表</h1>
        <div class="d-flex align-items-center">
          <button class="btn btn-secondary me-2" @click="openModal('new')">新增商品</button>
        </div>
      </div>
      <table class="table mt-4 border-top table-hover">
        <thead>
          <tr>
            <th width="45%">產品</th>
            <th width="10%">類別</th>
            <th width="10%">
              原價
            </th>
            <th width="10%">
              售價
            </th>
            <th width="10%">
              啟用
            </th>
            <th width="15%">
              編輯/刪除
            </th>
          </tr>
        </thead>
        <tbody id="productList">
          <tr v-for="(item) in products" :key="item.id">
            <td class="d-flex align-items-center">
            <img class="img-size me-3" :src="item.imageUrl" :alt="item.title">
            <div class="d-flex flex-column">
              <h4>{{item.title}}</h4>
              <span>{{item.description}}</span>
            </div>
            </td>
            <td>{{item.category}}</td>
            <td>
              {{item.origin_price}}
            </td>
            <td>
              {{item.price}}
            </td>
            <td>
              <span class="text-success" v-if="item.is_enabled">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <a href="#" class="editBtn me-2" @click.prevent="openModal('edit', item)"><span class="material-icons">edit</span></a>
              <a href="#" class="deleteBtn" @click.prevent="openModal('delete', item)"><span class="material-icons">delete</span></a>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-between">
        <p class="text-gray">商品總共有{{products.length}}項</p>
        <pagination :page="pagination" @get-product="getProductList"></pagination>
      </div>
      <product-modal ref="productModal" :product="tempProduct" :is-new="isNew" @update="getProductList"></product-modal>
      <del-product-modal ref="delProductModal" :delete-item="tempProduct" @delete="getProductList"></del-product-modal>
    </div>
</template>

<script>
import pagination from '@/components/pagination.vue'
import productModal from '@/components/productModal.vue'
import delProductModal from '@/components/delProductModal.vue'
export default {
  name: 'Products',
  data () {
    return {
      token: '',
      products: [],
      isNew: false,
      tempProduct: {
        imagesUrl: []
      },
      pagination: {},
      isLoading: false
    }
  },
  components: {
    pagination,
    productModal,
    delProductModal
  },
  methods: {
    getProductList (page = 1) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`
      this.$http.get(url).then((response) => {
        if (response.data.success) {
          this.products = response.data.products
          this.pagination = response.data.pagination
          this.isLoading = false
        } else {
          alert(response.data.success)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    openModal (isNew, product) {
      if (isNew === 'new') {
        this.isNew = true
        this.tempProduct = {
          imagesUrl: []
        }
        this.$refs.productModal.openModal()
      } else if (isNew === 'edit') {
        this.isNew = false
        this.tempProduct = { ...product }
        this.$refs.productModal.openModal()
      } else if (isNew === 'delete') {
        this.isNew = false
        this.tempProduct = { ...product }
        this.$refs.delProductModal.openModal()
      }
    }
  },
  mounted () {
    this.token = document.cookie.replace(/(?:(?:^|.*;\s*)YuToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    if (this.token === '') {
      alert('您尚未登入請重新登入。')
      this.$router.push('/login')
    }
    this.$http.defaults.headers.common.Authorization = this.token
  },
  created () {
    this.getProductList()
  }
}
</script>
