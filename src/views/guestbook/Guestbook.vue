<template>
  <div class="left-container">
    <div class="well" v-html="guestbook.html"></div>
    <comments title="留言" :id="1" type="guestbook"></comments>
    <comment :id="1" type="guestbook"></comment>
  </div>
</template>

<script>
import { getGuestbook } from '@/api/frontend/common'
import { onMounted, ref, provide } from 'vue'
import Comments from '@/components/Comments'
import Comment from '@/components/Comment'

const getGuestbookEffect = () => {
  const guestbook = ref([])
  const fetchGuestbook = async () => {
    const { data } = await getGuestbook()
    guestbook.value = data
  }
  return {
    guestbook,
    fetchGuestbook
  }
}

export default {
  name: 'Guestbook',
  components:{
    Comments,
    Comment
  },
  setup () {
    const {
      guestbook,
      fetchGuestbook
    } = getGuestbookEffect()

    const commentParentId = ref(0)
    provide('commentParentId', commentParentId)
    provide('handleChangeCommentParentId', (parentId) => {
      commentParentId.value = parentId
    })

    onMounted(() => {
      fetchGuestbook()
    })

    return { guestbook }
  }
}
</script>

<style scoped lang="scss">
.left-container {
  width: 66%;
  min-height: 1px;
  padding: 4px 15px;
}
</style>
