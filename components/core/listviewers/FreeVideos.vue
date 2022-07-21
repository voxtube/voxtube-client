<template>
  <div>
<!--    the show case base component-->
    <ShowCase :data='vidoes' label='Free Videos' url='/videos' />
  </div>
</template>

<script>
import ShowCase from '~/components/base/list/show_case'
export default {
  name: 'FreeVideos',
  components: { ShowCase },
  data: () => ({
    vidoes: [
      {
        channel: { name: 'ultra' },
        _count: { view: 52 },
        createdAt: Date.now(),
        title: 'Hello World',
        img: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg',
        price: 150,
        free: false
      },
      {
        channel: { name: 'Mj' },
        _count: { view: 52 },
        createdAt: Date.now(),
        title: 'Fast 10',
        img: 'https://otakukart.com/wp-content/uploads/2021/08/fast-and-furious-10-1.jpg',
        price: 150,
        free: false
      },
      {
        channel: { name: 'Ismael' },
        _count: { view: 52 },
        createdAt: Date.now(),
        title: 'Konso Suba',
        img: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
        price: 150,
        free: true
      },
      {
        channel: { name: 'Priscillia' },
        _count: { view: 52 },
        createdAt: Date.now(),
        title: 'Captain Marvel',
        img: 'https://static1.colliderimages.com/wordpress/wp-content/uploads/2021/05/captain-marvel-the-marvels-social-featured.jpg?q=50&fit=contain&w=750&h=375&dpr=1.5',
        price: 150,
        free: true
      },
      {
        channel: { name: 'Ismael' },
        _count: { view: 52 },
        createdAt: Date.now(),
        title: 'Gravity',
        img: 'https://media-exp1.licdn.com/dms/image/C4D1BAQFCeYn5IaXbFQ/company-background_10000/0/1590065379651?e=2159024400&v=beta&t=7v3DqtBOkQFVhYmMXZHFISsVZQubVMjygkIfYYI8CQ8',
        price: 150,
        free: true
      },
      {
        channel: { name: 'Mj' },
        _count: { view: 52 },
        createdAt: Date.now(),
        title: 'Erased',
        img: 'https://cdn-japantimes.com/wp-content/uploads/2019/09/p10-schley-helloworld-a-20190919-870x602.jpg',
        price: 150,
        free: false
      },
      {
        channel: { name: 'Pro' },
        _count: { view: 52 },
        createdAt: Date.now(),
        title: 'Dc',
        img: 'https://images.thedirect.com/media/article_full/dcmarvel_WBAhVL3.jpg?imgeng=cmpr_75/',
        price: 150,
        free: false
      },
      {
        channel: { name: 'Ismael' },
        _count: { view: 52 },
        createdAt: Date.now(),
        title: 'Freedom',
        img: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-movie-poster-template-design-0f5fff6262fdefb855e3a9a3f0fdd361_screen.jpg?ts=1573101130',
        price: 150,
        free: false
      }
    ]
  }),
}
</script>

<style scoped>

</style>
