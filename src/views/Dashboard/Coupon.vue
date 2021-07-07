<template>
<div class="container pt-4">
  <Loading :active="isLoading" :z-index="1060"></Loading>
  <div class="d-flex justify-content-between align-items-center">
      <h1 class="mb-0">優惠券</h1>
      <button class="btn btn-secondary me-2" @click="openCouponModal(true)">新增優惠券</button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th>名稱</th>
        <th>折扣</th>
        <th>到期日</th>
        <th>是否啟用</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, key) in coupons" :key="key">
        <td>{{ item.title }}</td>
        <td>{{ item.percent }}%</td>
        <td>{{ $filters.date(item.due_date) }}</td>
        <td>
          <span v-if="item.is_enabled" class="text-success">啟用</span>
          <span v-else class="text-muted">未啟用</span>
        </td>
        <td>
          <a href="#" class="editBtn me-2" @click.prevent="openCouponModal(false,item)"><span class="material-icons">edit</span></a>
          <a href="#" class="deleteBtn" @click.prevent="openDelModal(item)"><span class="material-icons">delete</span></a>
        </td>
      </tr>
    </tbody>
  </table>
  <couponModal ref="couponModal" :coupon="tempCoupon" :is-new="isNew" @update-coupon="updateCoupon"></couponModal>
  <delModal ref="delModal" :product="tempCoupon" @delete="delCoupon"></delModal>
    <pagination :page="pagination" @get-product="getCoupon"></pagination>
</div>
</template>

<script>
import couponModal from '@/components/CouponModal.vue'
import delModal from '@/components/DelModal.vue'
import pagination from '@/components/Pagination.vue'
export default {
  data () {
    return {
      coupons: {},
      isNew: false,
      isLoading: false,
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      },
      pagination: {}
    }
  },
  components: {
    couponModal,
    delModal,
    pagination
  },
  methods: {
    getCoupon (page = 1) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?${page}`
      this.$http.get(url).then(response => {
        if (response.data.success) {
          this.coupons = response.data.coupons
          this.pagination = response.data.pagination
          this.isLoading = false
        } else {
          console.log(response.data.success)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    openCouponModal (isNew, item) {
      this.isNew = isNew
      this.isLoading = true
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000
        }
        this.isLoading = false
      } else {
        this.tempCoupon = { ...item }
        this.isLoading = false
      }
      this.$refs.couponModal.openModal()
    },
    updateCoupon (tempCoupon) {
      this.isLoading = true
      if (this.isNew) {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`
        this.$http.post(url, { data: tempCoupon }).then((response) => {
          if (response.data.success) {
            this.isLoading = false
            this.getCoupon()
            this.$refs.couponModal.hideModal()
          } else {
            this.isLoading = false
          }
        }).catch(error => {
          console.log(error)
        })
      } else {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
        this.$http.put(url, { data: this.tempCoupon }).then((response) => {
          if (response.data.success) {
            this.isLoading = false
            this.getCoupon()
            this.$refs.couponModal.hideModal()
          } else {
            this.isLoading = false
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },
    openDelModal (item) {
      this.tempCoupon = { ...item }
      this.$refs.delModal.openModal()
    },
    delCoupon () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
      this.isLoading = true
      this.$http.delete(url).then((response) => {
        if (response.data.success) {
          this.isLoading = false
          this.$refs.delModal.hideModal()
          this.getCoupon()
        } else {
          this.isLoading = false
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created () {
    this.getCoupon()
  }
}
</script>
