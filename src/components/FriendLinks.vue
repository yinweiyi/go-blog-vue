<template>
  <div class="default-container container">
    <div class="title">
      友情链接
    </div>
    <table class="table friendship-link">
      <tbody>
      <tr v-for="(links, key) in friendLinks" :key="key">
        <td v-for="(link, key) in links" :key="key">
          <a :href="link.link" :title="link.title" target="_blank">{{ link.title }}</a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue'
import { getFriendLinks } from '../api/frontend/common'

export default {
  name: 'FriendLinks',
  setup() {
    const friendLinks = ref([])
    getFriendLinks().then(({ data }) => {
      friendLinks.value = data
    })

    return {
      friendLinks
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

  table.friendship-link {
    width: 100%;

    tr:first-child td {
      border-top: 0
    }

    td {
      padding: 8px;
      line-height: 1.42857143;
      vertical-align: top;
      border-top: 1px solid $panel-item-border-color;

      a{
        color: $font-color;
      }
    }
  }
}
</style>
