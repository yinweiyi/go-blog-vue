<template>
  <div class="left-container">
    <div class="well quote" v-if="sentence">
          <span class="title">
            每日一句 ( {{ sentence.created_at?.substring(0, 10) }} ) &nbsp;
            <span class="glyphicon glyphicon-bullhorn"></span>
          </span>
      <p>{{ sentence.content }}</p>
      <p class="contents"><span class="content">{{ sentence.translation }}</span><span
        class="author">———— {{ sentence.author }}</span>
      </p>
    </div>
    <div class="articles">
      <div v-for="(article, key) in articles" class="article article-border">
        <div class="content">
          <h2 class="title">
            <router-link :to="`/articles/${article.slug}`">
              {{ article.title }}
            </router-link>
          </h2>
          {{ article.ShotHtml }}
        </div>
        <div class="footer">
          发布于{{ article.created_at?.substring(0, 10) }} | 浏览：{{ article.views }} | Tags：
          <template v-for="tag in article.tags">
            <router-link :to="`/tags/${tag.slug}`">{{ tag.name }}</router-link>&nbsp;
          </template>
        </div>
      </div>
    </div>
    <paginator v-if="pages.total > 0" v-model:current="pages.current" v-model:total="pages.total"
               v-model:size="pages.size" @changePage="changePage"></paginator>
  </div>
</template>

<script>
import { getSentence } from '@/api/frontend/common'
import { getArticles } from '@/api/frontend/article'
import { onMounted, ref, reactive, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import Paginator from '@/components/Paginator'

const fetchSentenceEffect = () => {
  const sentence = ref([])
  const fetchSentence = async () => {
    const { data } = await getSentence()
    sentence.value = data
  }
  return {
    sentence,
    fetchSentence
  }
}

const fetchArticleEffect = () => {
  const articles = ref([])
  const pages = reactive({
    'total': 0,
    'size': 5,
    'current': 0
  })
  const fetchArticles = async (params) => {
    const { data } = await getArticles(params)
    const pageData = data.pagerData
    pages.total = pageData.TotalCount
    pages.size = pageData.PerPage
    pages.current = pageData.CurrentPage
    articles.value = data.articles
  }
  return {
    fetchArticles,
    articles,
    pages
  }
}

const changePageEffect = (pages) => {
  const changePage = (current) => {
    pages.current = current
  }
  return { changePage }
}

export default {
  name: 'Articles',
  components: { Paginator },
  setup () {
    const route = useRoute()
    const {
      sentence,
      fetchSentence
    } = fetchSentenceEffect()
    const {
      articles,
      fetchArticles,
      pages
    } = fetchArticleEffect()

    const { changePage } = changePageEffect(pages)

    const params = reactive({
      'p': 1,
      'slug': '',
      'name': 'Home'
    })
    onMounted(() => {
      fetchSentence()
    })

    watchEffect(() => {
      params.slug = route.params.slug || ''
      params.name = route.name.toLowerCase()
      params.p = pages.current
      fetchArticles(params)
    })

    return {
      sentence,
      articles,
      pages,
      changePage
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/variables";

.left-container {
  flex: 1 1 66%;
  min-height: 1px;
  padding: 4px 15px;
  overflow: auto;
}

.quote {
  box-shadow: 1px 1px 3px #5f5f5f;

  .title {
    font-size: 12px;
    margin-bottom: 3px;
    display: block
  }

  .contents {
    display: flex;

    .content {
      flex: auto;
    }

  }
}

.articles {
  .article-border {
    border: 1px solid transparent;
    background-color: #fff;
  }

  .article {
    border-color: $article-border-color #8e8e8e #5f5f5f $article-border-color;
    border-radius: 4px;
    box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
    margin-bottom: 20px;

    .content {
      h2 > a {
        color: #13102b;
      }

      padding: 15px;
    }

    .footer {
      a {
        color: $font-color;
      }

      color: $font-color;
      border-top: $article-border-color;
      background-color: $theme-bg-color;
      padding: 5px 15px;
      border-bottom-right-radius: 3px;
      border-bottom-left-radius: 3px;
    }
  }
}
</style>
