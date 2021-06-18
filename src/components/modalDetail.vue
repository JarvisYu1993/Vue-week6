<template>
  <div class="modal fade" id="modalDetail" tabindex="-1" role="dialog"
       aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title" id="exampleModalLabel">
                <span>{{ product.title }}</span>
              </h5>
              <button type="button" class="btn-close"
                      data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-6">
                  <img class="img-fluid" :src="product.imageUrl" alt="">
                </div>
                <div class="col-sm-6">
                  <span class="badge bg-primary rounded-pill mb-2">{{ product.category }}</span>
                  <p>商品描述：{{ product.description }}</p>
                  <p>商品內容：{{ product.content }}</p>
                  <div class="d-flex flex-column align-items-end mb-2">
                    <del class="h6" v-if="product.price">原價：NT${{ product.origin_price }} 元</del>
                    <p class="h4 text-danger mt-2" v-if="product.price">特價：NT${{product.price}}元</p>
                  </div>
                  <div class="d-flex flex-column">
                    <input type="number" class="form-control mb-2"
                    v-model.number="qty" min="1">
                    <button type="button" class="addBtn" @click="$emit('add-cart', product.id, qty)">加入購物車</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal.js'
export default {
  props: {
    product: {
      type: Object,
      default () {
        return {
        }
      }
    }
  },
  data () {
    return {
      status: {},
      modal: '',
      qty: 1
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.modal, {
      keyboard: false,
      backdrop: 'static'
    })
  },
  methods: {
    openModal () {
      this.modal.show()
    },
    hideModal () {
      this.modal.hide()
    }
  }
}
</script>
