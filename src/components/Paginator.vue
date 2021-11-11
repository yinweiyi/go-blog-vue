<template>
  <div class="pagination-container">
    <ul class="pagination">
      <!-- 点击上一页 -->
      <li v-if="current > 1" class="page-item" v-on:click="pageClick(--current)">‹</li>
      <li v-else-if="current === 1" class="page-item disable">‹</li>

      <template v-for="index in indexes">
        <li @click="pageClick(index)" :class="{'page-item' : true, active: current === index}">{{ index }}</li>
      </template>
      <!-- 点击下一页 -->
      <li v-if="current !== all" class="page-item" v-on:click="pageClick(++current)">›</li>
      <li v-else-if="current === all" class="page-item disable">›</li>
    </ul>
  </div>
</template>

<script>
import { reactive, computed, toRefs } from 'vue'

const pageClickEffect = (data, context) => {
  const pageClick = (current) => {
    if (current !== data.current) {
      context.emit('changePage', current)
    }
  }
  return { pageClick }
}

export default {
  name: 'Paginator',
  props: {
    // 当前页数
    'current': {
      type: Number,
      default: 1,
      required: true
    },
    // 页面条数
    'size': {
      type: Number
    },
    // 数据总量
    'total': {
      type: Number,
    },

  },
  setup (props, context) {
    const data = reactive({
      all: computed(() => {
        return Math.ceil(props.total / props.size)
      }), //总页数
      current: computed(() => {
        return props.current
      }),//当前页码
      size: computed(() => {
        return props.size
      }), //一页显示的数量
      indexes: computed(() => {
        let left = 1
        let right = data.all
        let pages = []
        if (data.all > 7) {
          left = data.current - 3 >= 1 ? data.current - 3 : 1
          right = data.current + 3 > data.all ? data.all : data.current + 3
        }
        while (left <= right) {
          pages.push(left)
          left++
        }
        return pages
      })
    })
    const { pageClick } = pageClickEffect(data, context)
    const dataRef = toRefs(data)
    return { pageClick, ...dataRef }
  }
}
</script>

<style scoped lang="scss">
@import "../style/variables";

.pagination-container {
  margin: 20px 0;

  .pagination {
    display: flex;

    .page-item:first-child {
      margin-left: 0;
      border-bottom-left-radius: 4px;
      border-top-left-radius: 4px;
    }

    .page-item:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      margin-left: -1px;
    }

    .page-item {
      position: relative;
      float: left;
      padding: 6px 12px;
      line-height: 1.42857143;
      text-decoration: none;
      color: $theme-bg-color;
      background-color: #fff;
      border: 1px solid #ddd;
      margin-left: -1px;
      cursor: pointer;
    }

    .disable {
      color: #777;
      background-color: #fff;
      cursor: not-allowed;
    }

    .active {
      z-index: 3;
      color: #fff;
      background-color: $theme-bg-color;
      border-color: $panel-title-border-color;
      cursor: default;
    }


  }
}
</style>
