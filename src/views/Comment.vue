<template>
  <div>
    <div id="comments">

    </div>
  </div>
</template>

<style>
#comments{
    position: absolute;
    top: 0;
    left: 50%;
    width: 70vw;
    height: 100vh;
    transform: translate(-50%,0);
}
</style>

<script>
import Valine from 'valine'

export default {
  name: 'Comment',
  mounted () {
    // eslint-disable-next-line no-unused-vars
    const valine = new Valine()
    valine.init({
      el: '#comments',
      appId: 'iWxIi4oVpt8hv0nSSaSegQSl-gzGzoHsz',
      appKey: 'phzWAHz9CPYzd832h3obx1Rc',
      placeholder: '欢迎留言与我分享您的想法...',
      path: window.location.pathname,
      pageSize: 9,
      avatar: 'retro',
      visitor: true
    })
    // const valine = new Valine({
    //   el: '#comments',
    //   appId: 'iWxIi4oVpt8hv0nSSaSegQSl-gzGzoHsz',
    //   appKey: 'phzWAHz9CPYzd832h3obx1Rc',
    //   placeholder: '欢迎留言与我分享您的想法...',
    //   path: window.location.pathname,
    //   pageSize: 9,
    //   avatar: 'retro',
    //   visitor: true
    // })
  }
}
</script>
