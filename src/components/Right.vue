<template>
  <div class="right-container">
    <tags/>
    <hots/>
    <newest-comments/>
    <friend-links v-if="!hideFriendLink"/>
  </div>
</template>

<script>
import Tags from './Tags'
import Hots from './Hots'
import NewestComments from './NewestComments'
import FriendLinks from './FriendLinks'
import { computed } from 'vue'

export default {
  name: 'Right',
  props: {
    'hideFriendLink': {
      type: Boolean,
      default: false
    }
  },
  components: {
    Tags,
    Hots,
    NewestComments,
    FriendLinks
  },
  setup (props) {
    const hideFriendLink = computed(() => {
      return props.hideFriendLink
    })

    return { hideFriendLink }
  }
}
</script>

<style scoped lang="scss">
.right-container {
  flex: 1 1 34%;
  padding: 0 15px;
  overflow: hidden;
}
</style>
