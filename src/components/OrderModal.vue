<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>訂單資訊</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body bg-light p-5">
          <div class="row">
            <div class="col-12 rounded shadow bg-white pt-3 mb-3">
                <div class="d-flex align-items-start">
                  <h3 class="me-2">收件人資料</h3>
                  <span class="badge rounded-pill bg-danger" v-if="!tempOrder.is_paid">未付款</span>
                  <span class="badge rounded-pill bg-success" v-else>已付款</span>
                </div>
              <hr>
                <div class="mb-3" v-if="tempOrder.user">
                  <div class="d-flex align-items-center mb-2">
                    <h4 class="font-normal fw-bold me-4">收件人姓名</h4>
                    <h5 class="font-normal">{{ tempOrder.user.name }}</h5>
                  </div>
                  <div class="d-flex align-items-center mb-2">
                    <h4 class="font-normal fw-bold me-4">收件人地址</h4>
                    <h5 class="font-normal">{{ tempOrder.user.address }}</h5>
                  </div>
                  <div class="d-flex align-items-center  mb-2">
                    <h4 class="font-normal fw-bold me-4">收件人 Email</h4>
                    <h5 class="font-normal">{{ tempOrder.user.email }}</h5>
                  </div>
                  <div class="d-flex align-items-center  mb-2">
                    <h4 class="font-normal fw-bold me-4">收件人電話</h4>
                    <h5 class="font-normal">{{ tempOrder.user.tel }}</h5>
                  </div>
                </div>
            </div>
            <div class="col-12 rounded shadow bg-white pt-3">
              <h3>訂單細節</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th>訂單編號</th>
                    <td>{{ tempOrder.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>{{ $filters.date(tempOrder.create_at) }}</td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>
                      <span v-if="tempOrder.paid_date">
                        {{ $filters.date(tempOrder.paid_date) }}
                      </span>
                      <span v-else>時間不正確</span>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <strong v-if="tempOrder.is_paid" class="text-success"
                        >已付款</strong
                      >
                      <span v-else class="text-muted">尚未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>
                      {{ $filters.currency(tempOrder.total) }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <h3>購買商品明細</h3>
              <table class="table">
                <thead>
                  <tr>
                    <th>商品名稱</th>
                    <th>商品數量/單位</th>
                    <th>價錢總計</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in tempOrder.products" :key="item.id">
                    <th>
                      {{ item.product.title }}
                    </th>
                    <td>{{ item.qty }} / {{ item.product.unit }}</td>
                    <td>
                      {{ $filters.currency(item.final_total) }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex justify-content-end">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    v-model="tempOrder.is_paid"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    <span v-if="tempOrder.is_paid">已付款</span>
                    <span v-else>未付款</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-paid', tempOrder)"
          >
            修改付款狀態
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal'

export default {
  props: {
    order: {
      type: Object,
      default () { return {} }
    }
  },
  data () {
    return {
      status: {},
      modal: '',
      tempOrder: {}
    }
  },
  emits: ['update-product'],
  inject: ['emitter'],
  watch: {
    order () {
      this.tempOrder = this.order
    }
  },
  methods: {
    openModal () {
      this.modal.show()
    },
    hideModal () {
      this.modal.hide()
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.modal)
  }
}
</script>
