<template>
  <div class="default-container container">
    <div class="title">
      随机标签云
    </div>
    <div class="body">
      <template v-for="(item, key) in randomTags" :key="key">
        <router-link :to="`/tags/${item.slug}`"
                     :style="{color:randomHexColor(), fontSize:`${randomInt(8,18)}pt`}" aria-label="">
          {{ item.name + ' ' }}
        </router-link>
      </template>
    </div>
  </div>
</template>

<script>
import { getRandomTags } from '../api/frontend/common'
import { ref } from 'vue'
import { randomHexColor, randomInt } from '../utils/functions'

export default {
  name: 'RandomTags',
  setup () {
    const randomTags = ref([])
    getRandomTags().then(({ data }) => {
      randomTags.value = data
    })

    return {
      randomTags,
      randomHexColor,
      randomInt
    }
  }
}
</script>

<style scoped lang="scss">
@import "../style/variables";

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
    padding: 15px;
  }
}
</style>
