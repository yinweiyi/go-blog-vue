<template>
  <div class="comment-list-container">
    <div class="comments" v-for="comment in comments" :id="`comment-${comment.id}`">
      <div class="comment">
        <div class="comment-author vcard">
          <img :src="`http://www.ewayee.com${comment.avatar}`" alt="用户评论头像" class="img-circle">
          <strong>{{ comment.nickname }} </strong>：
          <span class="datetime">发表于 {{ comment.created_at }}
            <span class="reply">
              <a rel="nofollow" class="comment-reply-link" href="#respond" @click="handleReply(comment.id)" :aria-label="`回复给${comment.nickname}`">[回复]</a>
            </span>
          </span>
        </div>
        <p>{{ comment.content }}</p>
      </div>
      <div class="children" v-if="comment.children">
        <comments-list v-model:comments="comment.children"></comments-list>
      </div>
    </div>
  </div>
</template>

<script>
import {inject} from 'vue'

export default {
  name: 'CommentsList',
  props: {
    comments: {
      required: true,
      type: Array,
      default: []
    }
  },
  setup() {
    const handleChangeCommentParentId = inject('handleChangeCommentParentId')
    const handleReply = (commentId) => {
      handleChangeCommentParentId(commentId)
    }
    return { handleReply }
  }
}
</script>

<style scoped lang="scss">
.comments {
  border: 1px dashed #7ca4c1;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #d9edf7;
  color: #31708f;
  border-radius: 3px;

  .comment .comment-author .img-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
  }

  .children{
    padding-left: 40px;
  }

}
</style>
