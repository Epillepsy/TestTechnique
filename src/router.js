import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


const scrollBehavior = () => ({ x: 0, y: 0 });

const router = new Router({
  scrollBehavior,
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: { name: 'messages' }
    },
    {
      path: '/messages',
      name: 'messages',
      redirect: '/messages/list',
      component: () => import(/* webpackChunkName: "config" */ './views/MainView.vue'),

      children: [
        {
          path: ':realtorId/list',
          name: 'messagesList',
          components: {
            content: () => import(/* webpackChunkName: "config" */
              './views/messages/Detail.vue'
            ),
            leftpanel: () => import(/* webpackChunkName: "config" */
              './views/messages/list.vue'
            ),
          },
        },
        {
          path: ':realtorId/:messageId/',
          name: 'messagesDetails',
          components: {
            content: () => import(/* webpackChunkName: "config" */
              './views/messages/Detail.vue'
            ),
            leftpanel: () => import(/* webpackChunkName: "config" */
              './views/messages/list.vue'
            ),
          },
        },
      ]
    },
  ],
});


export default router;
