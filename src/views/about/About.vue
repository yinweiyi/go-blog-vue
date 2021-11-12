<template>
  <div class="left-container">
    <div class="well">
      <template v-for="about in abouts">
        <h2>{{ about.title }}</h2>
        <hr/>
        <div v-html="about.html"></div>
      </template>
    </div>
    <comments v-if="abouts.length" title="关于" :id="abouts[0].id" type="about"></comments>
    <comment v-if="abouts.length" :id="abouts[0].id" type="about"></comment>
  </div>
</template>

<script>

import { onMounted, provide, ref } from 'vue'
import { getAbouts } from '@/api/frontend/common'
import Comments from '@/components/Comments'
import Comment from '@/components/Comment'

const getAboutEffect = () => {
  const abouts = ref([])
  const fetchAbout = async () => {
    const { data } = await getAbouts()
    abouts.value = data
  }
  return {
    abouts,
    fetchAbout
  }
}
export default {
  name: 'About',
  components: {
    Comments,
    Comment
  },
  props:['active'],
  setup (props, context) {
    const commentParentId = ref(0)
    provide('commentParentId', commentParentId)
    provide('handleChangeCommentParentId', (parentId) => {
      commentParentId.value = parentId
    })
    const {
      abouts,
      fetchAbout
    } = getAboutEffect()
    onMounted(() => {
      fetchAbout()
      context.emit("update:active", 'about')
    })

    return { abouts }
  }
}
</script>

<style scoped lang="scss">
.left-container {
  width: 66%;
  min-height: 1px;
  padding: 4px 15px;
}

.well {
  min-height: 20px;
  padding: 19px;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  box-shadow: 1px 1px 5px rgba(97, 97, 97, .48)
}

</style>
