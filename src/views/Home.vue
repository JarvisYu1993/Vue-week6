<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" id="nav">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/products" class="nav-link">商品</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/cart" class="nav-link">購物車</router-link>
        </li>
      </ul>
       <router-link to="/login" class="ms-auto">登入</router-link>
    </div>
  </div>
</nav>
<router-view></router-view>
</template>
