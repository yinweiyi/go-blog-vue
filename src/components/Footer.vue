<template>
  <div class="footer">
    <ul class="categories">
      <li v-for="(item, key) in categories" :key="key" class="cat-item cat-item-342">
        <router-link :to="`/categories/${item.slug}`" title="{{ item.name }}">{{ item.name }}</router-link>
      </li>
    </ul>
    <p> Copyright © 2010-2020 <a href="/">{{ config.title }}</a>
      <a href="https://beian.miit.gov.cn" target="_blank" rel="nofollow">{{ config.icp }}</a>
      <img style="display: inline-block; margin-left: 5px" src="https://www.ewayee.com/images/beian.png">
    </p>
  </div>
</template>

<script>
import { getConfig, getCategories } from '@/api/frontend/common'
import { onMounted, ref } from 'vue'

const commonEffect = () => {
  const config = ref([])
  const fetchConfig = async () => {
    const { data } = await getConfig()
    config.value = data
  }
  const categories = ref([])
  const fetchCategory = async () => {
    const { data } = await getCategories()
    categories.value = data
  }

  return {
    fetchConfig, config,
    fetchCategory, categories
  }
}

export default {
  name: 'Footer',
  setup () {
    const {
      fetchConfig, config,
      fetchCategory, categories
    } = commonEffect()
    onMounted(() => {
      fetchConfig()
      fetchCategory()
    })
    return { config,categories }
  }
}
</script>

<style scoped lang="scss">
@import "../style/variables";

.footer {
  padding: 20px 0;
  color: #a2a2a2;
  text-align: center;
  background-color: $panel-title-border-color;
  border-top: 1px solid #e5e5e5;

  .categories {
    margin-bottom: 10px;

    li {
      display: inline-block;
      padding: 0 5px;
    }
  }

  a {
    color: #a2a2a2
  }

  a:hover {
    color: #337ab7
  }
}
</style>
