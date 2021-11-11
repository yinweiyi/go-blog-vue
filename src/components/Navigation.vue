<template>
  <div class="navbar_container">
    <div class="navbar">
      <div class="title">
        <router-link to="/" class="navbar-brand">忆未乙 | 个人博客</router-link>
      </div>
      <ul class="menus">
        <li :class="{menu:true, active : active === 'home'}">
          <router-link to="/">首页</router-link>
        </li>
        <li :class="{menu:true, active : active === 'about'}">
          <router-link to="/about">关于</router-link>
        </li>
        <li :class="{menu:true, active : active === 'guestbook'}">
          <router-link to="/guestbook">留言</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  props: ['active']
}
</script>

<style scoped lang="scss">
@import "../style/variables";

.navbar_container {
  z-index: 999;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: $panel-title-border-color;
  height: 52px;
  line-height: 50px;

  .navbar {
    width: 1140px;
    display: flex;
    margin: 0 auto;

    .title {
      margin-right: 15px;

      .navbar-brand {
        font-size: 18px;
        color: $font-color;
      }
    }

    .menus {
      display: flex;
      font-size: 14px;

      .menu {
        width: 58px;
        text-align: center;

        a {
          color: $font-color;
        }

        a:hover {
          color: #23527c;
        }
      }

      .active {
        background-color: #080808;
      }
    }
  }
}
</style>
