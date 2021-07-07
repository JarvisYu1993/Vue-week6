<template>
<div id="cart">
  <div class="shoppingCart">
      <div class="container">
        <Loading :active="isLoading"></Loading>
        <h3 class="shoppingCart-title">我的購物車</h3>
        <table class="shoppingCart-table">
            <thead>
                <tr>
                  <th width="45%">品項</th>
                  <th width="15%">單價</th>
                  <th width="15%">數量</th>
                  <th width="15%">金額</th>
                  <th width="10%"></th>
                </tr>
            </thead>
            <tbody class="shoppingCart-tableList">
                <tr v-for="item in cart.carts" :key="item.id">
                  <td>
                    <div class="cardItem-title">
                        <img :src="item.product.imageUrl" :alt="item.title">
                        <p>{{item.product.title}}</p>
                    </div>
                  </td>
                  <td>NT${{item.product.price}}</td>
                  <td>
                    <div class="input-group input-group-sm">
                      <div class="input-group mb-3">
                        <input v-model.number="item.qty" @blur="updateCart(item)"
                        min="1" type="number" class="form-control">
                        <span class="input-group-text" id="basic-addon2">{{ item.product.unit }}</span>
                      </div>
                    </div>
                    </td>
                  <td>{{item.total}}</td>
                  <td class="discardBtn">
                    <a href="#" class="material-icons d-flex align-items-center" @click.prevent="delCartItem(item.id)">
                    clear
                    </a>
                  </td>
              </tr>
            </tbody>
            <tfoot>
                <tr>
                  <td class="d-flex justify-content-start">
                    <a href="#" class="discardAllBtn" @click.prevent="delCartAll">清空購物車</a>
                  </td>
                  <td></td>
                  <td></td>
                  <td>
                    <p>總金額</p>
                  </td>
                  <td>NT${{cart.final_total}}</td>
                </tr>
            </tfoot>
        </table>
      </div>
  </div>
  <div class="container">
      <div class="my-5 row justify-content-center">
    <Form ref="form" class="col-md-6" v-slot="{ errors }" @submit="createOrder">
      <div class="mb-3 d-flex flex-column align-items-start">
        <label for="email" class="form-label fw-bold"><span class="text-danger">*</span>Email</label>
        <Field
          id="email"
          name="email"
          type="email"
          class="form-control"
          :class="{ 'is-invalid': errors['email'] }"
          placeholder="請輸入 Email"
          rules="email|required"
          v-model="form.user.email"
        ></Field>
        <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
      </div>
      <div class="mb-3 d-flex flex-column align-items-start">
        <label for="name" class="form-label fw-bold"><span class="text-danger">*</span>收件人姓名</label>
        <Field
          id="name"
          name="姓名"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['姓名'] }"
          placeholder="請輸入姓名"
          rules="required"
          v-model="form.user.name"
        ></Field>
        <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3 d-flex flex-column align-items-start">
        <label for="tel" class="form-label fw-bold"><span class="text-danger">*</span>收件人電話</label>
        <Field
          id="tel"
          name="電話"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['電話'] }"
          placeholder="請輸入電話"
          rules="required"
          v-model="form.user.tel"
        ></Field>
        <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3 d-flex flex-column align-items-start">
        <label for="address" class="form-label fw-bold"><span class="text-danger">*</span>收件人地址</label>
        <Field
          id="address"
          name="地址"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['地址'] }"
          placeholder="請輸入地址"
          rules="required"
          v-model="form.user.address"
        ></Field>
        <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3 d-flex flex-column align-items-start">
        <label for="message" class="form-label fw-bold">留言</label>
        <textarea
          name=""
          id="message"
          class="form-control"
          cols="30"
          rows="10"
          v-model="form.message"
        ></textarea>
      </div>
      <div class="text-end">
        <button class="btn btn-danger">送出訂單</button>
      </div>
    </Form>
  </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Cart',
  data () {
    return {
      isLoading: false,
      cart: {},
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    getCart () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(url).then((response) => {
        if (response.data.success) {
          this.cart = response.data.data
          this.isLoading = false
        } else {
          alert(response.data.message)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    updateCart (item) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      this.$http.put(url, { data: cart }).then((response) => {
        this.isLoading = false
        this.getCart()
      }).catch(error => {
        console.log(error)
      })
    },
    delCartItem (id) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.$http.delete(url).then((response) => {
        if (response.data.success) {
          alert(response.data.message)
          this.isLoading = false
          this.getCart()
        } else {
          alert(response.data.message)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    delCartAll () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`
      this.$http.delete(url).then(response => {
        if (response.data.success) {
          alert(response.data.message)
          this.isLoading = false
          this.getCart()
        } else {
          alert(response.data.message)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    createOrder () {
      if (this.cart.carts.length > 0) {
        this.isLoading = true
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
        const order = this.form
        this.$http.post(url, { data: order }).then((response) => {
          if (response.data.success) {
            alert(response.data.message)
            this.isLoading = false
            this.$refs.form.resetForm()
          } else {
            alert(response.data.message)
          }
        }).catch(error => {
          console.log(error)
        })
      } else {
        alert('請點選商品至購物車')
      }
    }
  },
  created () {
    this.getCart()
  }
}
</script>
