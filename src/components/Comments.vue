<template>
  <div id="comments-container" v-if="commentCount > 0" style="height: auto !important;">
    <h3> {{ title }} : 目前有 {{ commentCount }} 条评论</h3>
    <comments-list v-model:comments="commentTree"></comments-list>

    <paginator v-if="pageData.pages > 1" v-model:current="pageData.current" v-model:total="pageData.total"
               v-model:size="pageData.size" @changePage="changePage"></paginator>
  </div>
</template>

<script>
import CommentsList from './components/CommentsList'
import Paginator from './Paginator'
import { getComments } from '../api/frontend/comment'
import { reactive, ref, toRefs, watchEffect } from 'vue'

const getCommentsEffect = () => {
  const commentModel = reactive({
    commentCount: 0,
    commentTree: [],
    pageData: {
      current: 1,
      size: 0,
      total: 0,
      pages: 0,
    }
  })
  const fetchComments = async (id, type, page) => {
    const { data } = await getComments({
      id,
      type,
      page
    })
    commentModel.commentCount = data.commentCount
    commentModel.commentTree = data.commentTree
    commentModel.pageData.current = data.pageData.CurrentPage
    commentModel.pageData.size = data.pageData.PerPage
    commentModel.pageData.total = data.pageData.TotalCount
    commentModel.pageData.pages = data.pageData.TotalPage
  }

  const commentRefs = toRefs(commentModel)
  return { fetchComments, ...commentRefs }
}

const changePageEffect = (p) => {
  const changePage = (page) => {
    p.value = page
  }

  return { changePage }
}

export default {
  name: 'Comments',
  props: {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: 'article'
    },
    id: {
      type: Number,
      default: 1,
      required: true
    },
  },
  components: {
    CommentsList,
    Paginator
  },
  setup (props) {
    const page = ref(1)
    const {
      fetchComments,
      commentCount,
      commentTree,
      pageData
    } = getCommentsEffect()



    watchEffect(() => {
      fetchComments(props.id, props.type, page.value)
    })

    const { changePage } = changePageEffect(page)

    return {
      commentCount,
      commentTree,
      pageData,
      changePage
    }
  }

}
</script>

<style scoped lang="scss">
#container {
  height: auto !important;
}
</style>
