<template>
  <div class="home">
    <navigation />
    <div class="main">
      <router-view/>
      <right :hide-friend-link="false"></right>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Navigation from './components/Navigation'
import Articles from './views/home/Articles'
import Right from './components/Right'
import Footer from './components/Footer'

export default {
  name: 'Home',
  components: {
    Navigation,
    Articles,
    Right,
    Footer
  }
}
</script>
<style scoped lang="scss">

.main {
  display: flex;
  width: 1170px;
  align-items: flex-start;
  margin: 80px auto;
}
</style>
