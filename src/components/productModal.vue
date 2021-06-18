<template>
    <div id="productModal" ref="modal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 id="productModalLabel" class="modal-title">
              <span>{{ isNew? '新增產品': '編輯產品'}}</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="imageUrl">主要圖片</label>
                  <input v-model="product.imageUrl" type="text" class="form-control mb-2" placeholder="請輸入圖片連結" id="imageUrl" required>
                  <img class="img-fluid mb-2" :src="product.imageUrl">
                </div>
                <div class="mb-1">多圖新增</div>
                <!-- 判斷 tempProduct 是否是陣列 -->
                <template v-if="Array.isArray(product.imagesUrl)">
                  <div class="mb-1" v-for="(image, key) in product.imagesUrl" :key="key">
                    <div class="form-group">
                      <label :for="key">圖片網址</label>
                      <input v-model="product.imagesUrl[key]" type="text" class="form-control mb-2"
                        placeholder="請輸入圖片連結" :id="key">
                    </div>
                    <img class="img-fluid" :src="image">
                  </div>
                <!-- 判斷 tempProduct 是否有值 -->
                  <template
                    v-if="!product.imagesUrl.length || product.imagesUrl[product.imagesUrl.length - 1]">
                    <button type="button" class="btn btn-outline-primary btn-sm d-block w-100"
                      @click="product.imagesUrl.push('')">
                      新增圖片
                    </button>
                  </template>
                  <template v-else>
                    <button type="button" class="btn btn-outline-danger btn-sm d-block w-100" @click="product.imagesUrl.pop()">
                      刪除圖片
                    </button>
                  </template>
                </template>
                <template v-else>
                  <button type="button" class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="createImages">
                    新增圖片
                  </button>
                </template>
              </div>
              <div class="col-sm-8">
                <div class="form-group mb-2">
                  <label for="title">標題</label>
                  <input id="title" v-model="product.title" type="text" class="form-control" placeholder="請輸入標題" required>
                </div>
                <div class="row mb-2">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input id="category" v-model="product.category" type="text" class="form-control"
                      placeholder="請輸入分類" required>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="unit">單位</label>
                    <input id="unit" v-model="product.unit" type="text" class="form-control" placeholder="請輸入單位" required>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input id="origin_price" v-model.number="product.origin_price" type="number" min="0"
                      class="form-control" placeholder="請輸入原價" required>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input id="price" v-model.number="product.price" type="number" min="0" class="form-control"
                      placeholder="請輸入售價" required>
                  </div>
                </div>
                <hr>
                <div class="form-group mb-2">
                  <label for="description">產品描述</label>
                  <textarea id="description" v-model="product.description" type="text" class="form-control"
                    placeholder="請輸入產品描述">
                </textarea>
                </div>
                <div class="form-group mb-2">
                  <label for="content">說明內容</label>
                  <textarea id="content" v-model="product.content" type="text" class="form-control"
                    placeholder="請輸入說明內容">
                </textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input id="is_enabled" v-model="product.is_enabled" class="form-check-input" type="checkbox"
                      :true-value="1" :false-value="0">
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="updateProduct">
              確認
            </button>
          </div>
        </div>
      </div>
      </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal.js'
export default {
  props: ['product', 'isNew'],
  data () {
    return {
      modal: ''
    }
  },
  methods: {
    updateProduct () {
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let method = 'post'
      if (!this.isNew) {
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.product.id}`
        method = 'put'
      }
      this.$http[method](url, { data: this.product }).then((response) => {
        if (response.data.success) {
          alert(response.data.message)
          this.hideModal()
          this.$emit('update')
        } else {
          alert(response.data.message)
        }
      }).catch(error => {
        alert(error.data.message)
      })
    },
    createImages () {
      this.product.imagesUrl = []
      this.product.imagesUrl.push('')
    },
    openModal () {
      this.modal.show()
    },
    hideModal () {
      this.modal.hide()
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.modal, {
      keyboard: false,
      backdrop: 'static'
    })
  }
}
</script>
