<template>
  <div class="home">
    <navigation active="home"/>
    <div class="main">
      <article-detail></article-detail>
      <right :hide-friend-link="true"></right>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Navigation from '../../components/Navigation'
import ArticleDetail from './ArticleDetail'
import Right from '../../components/Right'
import Footer from '../../components/Footer'

export default {
  name: 'Home',
  components: {
    Navigation,
    ArticleDetail,
    Right,
    Footer
  }
}
</script>
<style scoped lang="scss">

.main {
  display: flex;
  width: 1170px;
  margin: 80px auto;
}
</style>
