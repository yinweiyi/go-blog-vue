<template>
  <div class="comment-form-container">
    <div class="well">
      <div id="respond">
        <h3>发表评论</h3>
        <div class="cancel-comment-reply">
          <div id="real-avatar"></div>
          <small>
            <a rel="nofollow" class="cancel-reply" @click="cancelReply" v-if="form.parent_id > 0" href="javascript:">
              点击这里取消回复。
            </a>
          </small>
        </div>
        <form class="ajax-form" method="post" id="commentForm" v-model="form">
          <div class="row">
            <div class="nickname-panel panel">
              <div class="form-group">
                <input type="text" class="form-control" v-model="form.nickname" size="22"
                       tabindex="1"
                       placeholder="昵称">
              </div>
            </div>
            <div class="email-panel panel">
              <div class="form-group">
                <input type="text" class="form-control" v-model="form.email" size="22"
                       tabindex="2"
                       placeholder="邮箱 (评论被回复时你能收到通知)">
              </div>
            </div>
          </div>
          <div class="form-group">
            <textarea id="content" class="form-control" placeholder="ヾﾉ≧∀≦)o来啊，快活啊!" rows="3"
                      v-model="form.content"></textarea>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="captcha-panel">
                <input type="text" v-model="form.captcha" id="captcha" class="form-control" tabindex="4"
                       placeholder="验证码">
              </div>
              <div class="captcha-image">
                <img v-if="form.captcha_id !== ''" :src="`http://localhost:3000/api${captchaUrl}`" class="img-rounded"
                     title="refresh captcha"
                     alt="captcha" @click="fetchCaptcha">
              </div>
            </div>
          </div>
          <div class="form-group">
            <input class="btn btn-default" @click="submit" name="submit" type="button" tabindex="5" value="提交留言">
            <input class="btn btn-default" name="reset" type="reset" id="reset" tabindex="6" value="重写">
            <span id="ajax-post-msg" :class="`text-${submitTip.type}`"
                  v-if="submitTip.message !== ''">{{ submitTip.message }}</span>
          </div>
        </form>
        <div class="clear"></div>
      </div>

    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref, inject } from 'vue'
import { getCaptcha } from '@/api/frontend/captcha'
import { handleComment } from '@/api/frontend/comment'

const replyEffect = (handleChangeCommentParentId) => {
  const cancelReply = () => {
    handleChangeCommentParentId(0)
  }
  return {
    cancelReply
  }
}

const captchaEffect = (form) => {
  const captchaUrl = ref('')
  const fetchCaptcha = async () => {
    const { data } = await getCaptcha()
    form.captcha_id = data.captcha_id
    captchaUrl.value = data.image_url
  }

  return {
    fetchCaptcha,
    captchaUrl
  }
}

const submitEffect = (form) => {
  const tip = reactive({
    message: '',
    type: 'primary',
    callback: null
  })

  const setTip = (message, type, callback) => {
    tip.message = message
    if (type !== undefined) {
      tip.type = type
    }

    if (callback !== undefined) {
      tip.callback = callback
    }
  }
  const submit = async () => {
    if (!form.nickname) {
      setTip('请填写昵称', 'danger')
      return
    }
    if (!form.content) {
      setTip('请填写评论内容', 'danger')
      return
    }
    if (!form.captcha) {
      setTip('请填写验证码', 'danger')
      return
    }
    setTip('正在提交。。。', 'primary', () => {

      window.location.reload()
    })
    const result = await handleComment(form)
    let type = 'danger'
    if (result.code === 200) {
      type = 'primary'
      if (window.localStorage) {
        window.localStorage.setItem('nickname', form.nickname)
        form.email && window.localStorage.setItem('email', form.email)
      }
    }
    setTip(result.message, type)
  }

  return {
    submit,
    tip
  }
}

export default {
  name: 'Comment',
  props: {
    type: {
      type: String,
      required: true,
      default: 'article'
    },
    id: {
      type: Number,
      default: 1,
      required: true
    },
  },
  setup (props) {

    const handleChangeCommentParentId = inject('handleChangeCommentParentId')
    const commentParentId = inject('commentParentId')

    const form = reactive({
      type: props.type,
      id: props.id,
      email: '',
      parent_id: commentParentId,
      nickname: '',
      content: '',
      captcha: '',
      captcha_id: '',
    })
    if (window.localStorage) {
      form.nickname = window.localStorage.getItem('nickname')
      form.email = window.localStorage.getItem('email')
    }

    const {
      fetchCaptcha,
      captchaUrl
    } = captchaEffect(form)

    onMounted(() => {
      fetchCaptcha()
    })

    const {
      cancelReply,
    } = replyEffect(handleChangeCommentParentId)

    const {
      submit,
      tip
    } = submitEffect(form)

    let timeout = null
    const submitTip = computed(() => {

      if (timeout !== null) {
        clearTimeout(timeout)
      }
      if (tip.message !== '') {
        timeout = setTimeout(() => {
          tip.message = ''
          if (tip.callback) {
            tip.callback()
          }
        }, 3000)
      }

      return tip
    })

    return {
      form,
      cancelReply,
      captchaUrl,
      fetchCaptcha,
      submit,
      submitTip
    }
  }
}
</script>

<style scoped lang="scss">
.comment-form-container {
  margin: 20px 0;

  .well {
    min-height: 20px;
    padding: 19px;
    margin-bottom: 20px;
    background-color: #f5f5f5;
    border: 1px solid #e3e3e3;
    border-radius: 4px;
    box-shadow: 1px 1px 5px rgba(97, 97, 97, .48);

    #respond {
      .cancel-comment-reply a {
        color: #337ab7;
      }

      form {
        .form-group {
          margin-bottom: 15px;

          .btn {
            display: inline-block;
            margin-bottom: 0;
            font-weight: 400;
            text-align: center;
            vertical-align: middle;
            touch-action: manipulation;
            cursor: pointer;
            background-image: none;
            border: 1px solid transparent;
            white-space: nowrap;
            padding: 6px 12px;
            font-size: 14px;
            line-height: 1.42857143;
            border-radius: 4px;
            user-select: none;
            margin-right: 3px;
          }

          .btn-default {
            color: #333;
            background-color: #fff;
            border-color: #ccc;
          }
        }

        .row {
          display: flex;
          margin-left: -15 px;
          margin-right: -15 px;

          .nickname-panel, .captcha-panel {
            width: 30%;
            margin-right: 60px;
          }

          .email-panel {
            width: 40%;
          }

          .captcha-image img {
            vertical-align: middle;
            height: 36px;
            border-radius: 4px;
          }

        }
      }
    }
  }

  textarea.form-control {
    height: auto;
    width: 95%;
  }

  .form-control {
    width: 100%;
    height: 24px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  }

  .text-danger {
    color: #a94442
  }

  .text-primary {
    color: #337ab7
  }
}

</style>
