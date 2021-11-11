<template>
  <div class="home">
    <navigation active="about"/>
    <div class="main">
      <about></about>
      <right :hide-friend-link="true"></right>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Navigation from '../../components/Navigation'
import About from './About'
import Right from '../../components/Right'
import Footer from '../../components/Footer'

export default {
  name: 'Home',
  components: {
    Navigation,
    About,
    Right,
    Footer
  }
}
</script>
<style scoped lang="scss">

.main {
  display: flex;
  align-items: flex-start;
  width: 1170px;
  margin: 80px auto;
}
</style>
