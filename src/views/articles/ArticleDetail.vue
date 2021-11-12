<template>
  <div class="left-container">
    <div class="well">
      当前位置：
      <router-link to="/" title="">博客首页</router-link>&gt;&gt;
      <router-link v-if="article" :to="`/categories/${article.category?.slug}`">{{
          article.category.name
        }}
      </router-link>
      &gt;&gt; 阅读正文
      <h2 class="blog-post-title">
        {{ article?.title }}
      </h2>
      <p class="info">
        <span class="meat_span">作者: {{ article?.author }}</span>&nbsp;
        <span class="meat_span">
        分类: <router-link v-if="article" :to="`/categories/${article.category?.slug}`" rel="category tag">
          {{ article.category?.name }}
        </router-link>
      </span>&nbsp;
        <span class="meat_span">发布于: {{ article?.created_at }}</span>&nbsp;
        <span class="meat_span">浏览: {{ article?.views }}</span>&nbsp;
        <span class="meat_span">
        <router-link v-if="article" :to="`/articles/${article?.slug}#comments`">评论(0)</router-link></span>
      </p>
      <hr>
      <div class="text" v-html="article?.html" v-highlight></div>
      <div class="alert alert-success"> &nbsp; &nbsp; &nbsp; &nbsp;
        <div class="post-copyright">
          <p>
            转载时请注明出处及相应链接。
          </p>
          <p>本文永久链接: https://www.ewayee.com/articles/{{ article?.slug }}</p>
        </div>
      </div>
      <ul class="pager post-pager">
        <li v-if="last?.id > 0" class="previous">
          <router-link :to="`/articles/${last?.slug}`" rel="prev">上一篇</router-link>
        </li>
        <li v-if="next?.id > 0" class="next">
          <router-link :to="`/articles/${next?.slug}`" rel="next">下一篇</router-link>
        </li>
      </ul>
    </div>
    <comments v-if="article" :title="article.title" :id="article.id" type="article"></comments>
    <comment v-if="article" :id="article.id" type="article"></comment>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { provide, reactive, ref, toRefs, watchEffect } from 'vue'
import { getArticle } from '@/api/frontend/article'
import Comments from '@/components/Comments'
import Comment from '@/components/Comment'

const fetchArticleEffect = () => {
  const article = reactive({
    article: null,
    last: null,
    next: null
  })
  const fetchArticle = async (slug) => {
    const { data } = await getArticle(slug)
    article.article = data.article
    article.last = data.last
    article.next = data.next
  }
  const articleRef = toRefs(article)
  return {
    ...articleRef,
    fetchArticle
  }
}

export default {
  name: 'Article',
  components: {
    Comments,
    Comment
  },
  setup () {
    const route = useRoute()
    const commentParentId = ref(0)
    provide('commentParentId', commentParentId)
    provide('handleChangeCommentParentId', (parentId) => {
      commentParentId.value = parentId
    })
    const {
      article,
      last,
      next,
      fetchArticle
    } = fetchArticleEffect()

    watchEffect(() => {
      const article = route.params.article
      if (article) {
        fetchArticle(article)
      }
    })

    return {
      article,
      last,
      next
    }

  }
}
</script>

<style scoped lang="scss">
.left-container {
  width: 66%;
  min-height: 1px;
  padding: 4px 15px;
}

.pager {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;

  li {
    a {
      padding: 5px 14px;
      border: 1px solid #ddd;
      background-color: #fff;
      border-radius: 15px;
      color: #337ab7
    }
  }
}
</style>
