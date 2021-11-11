<template>
  <div class="default-container container">
    <div class="title">
      最近热门
    </div>
    <ul class="body">
      <li class="item" v-for="(item, key) in hots" :key="key">
        <router-link :to="`/articles/${item.slug}`" rel="bookmark" :title="item.title">{{ item.title }}</router-link></li>
    </ul>
  </div>
</template>

<script>

import { ref } from 'vue'
import { getHots } from '../api/frontend/common'

export default {
  name: 'Hots',
  setup () {
    const hots = ref([])
    getHots().then(({ data }) => {
      hots.value = data
    })

    return {
      hots,
    }
  }
}
</script>

<style scoped lang="scss">
@import "../style/variables";
@import "../style/mixins";

.container {
  border-color: $panel-title-border-color;
}

.default-container {
  margin-bottom: 20px;
  background-color: $theme-bg-color;
  border: 1px solid transparent;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
  box-shadow: 0 1px 1px rgb(0 0 0 / 5%);

  .title {
    padding: 10px 15px;
    border-bottom: 1px solid $panel-title-border-color;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    color: $panel-title-color;
    background-color: $panel-title-border-color;
  }

  .body {
    .item {
      @include ellipsis;
      padding: 10px 15px;
      margin-bottom: -1px;
      background-color: $theme-bg-color;
      border: 1px solid $panel-item-border-color;

      a {
        color: $font-color;
      }

      a:hover {
        color: #337ab7
      }
    }
  }
}
</style>
