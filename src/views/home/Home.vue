<template>
  <div class="home">
    <navigation active="home"/>
    <div class="main">
      <articles></articles>
      <right :hide-friend-link="false"></right>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Navigation from '../../components/Navigation'
import Articles from './Articles'
import Right from '../../components/Right'
import Footer from '../../components/Footer'

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
