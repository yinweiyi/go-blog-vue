<template>
  <div class="default-container container">
    <div class="title">
      最新评论
    </div>
    <ul class="body">
      <li class="item" v-for="(item, key) in comments" :key="key">
        <div class="header">
          <span class="author">{{ item.nickname }}</span> <span class="time">[{{ item.created_at }}]</span>
        </div>
        <div class="content">
          <router-link :to="`/guestbook#comment-${item.id}`" title="评论来源: 留言" rel="nofollow">
            {{ item.content }}
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'
import { getNewestComments } from '../api/frontend/common'

export default {
  name: 'NewestComments',
  setup () {
    const comments = ref([])
    getNewestComments().then(({ data }) => {
      comments.value = data
    })

    return {
      comments
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
    .item {
      padding: 10px 15px;
      margin-bottom: -1px;
      background-color: $theme-bg-color;
      border: 1px solid $panel-item-border-color;

      .header {
        margin-bottom: 7px;
        color: $font-color;
        display: flex;

        .author {
          flex: auto;
        }
      }

      .content a {
        color: #777;
      }
    }
  }
}
</style>
