// router/index.js
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login.vue'), // 登录页面
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/main/main.vue'), // 主页面
      children: [
        {
          path: 'analysis/GoodList',
          name: 'GoodList',
          component: () => import('@/views/main/analysis/GoodList/GoodList.vue'),
        },
        {
          path: 'analysis/GoodReview',
          name: 'GoodReview',
          component: () => import('@/views/main/analysis/GoodReview/GoodReview.vue'),
        },
        {
          path: 'analysis/GoodSets',
          name: 'monitor',
          component: () => import('@/views/main/analysis/GoodSets/GoodSets.vue'),
        },
        {
          path: 'analysis/ListMang',
          name: 'ListMang',
          component: () => import('@/views/main/analysis/ListMang/ListMang.vue'),
        },
        {
          path: 'system/BrandList',
          name: 'BrandList',
          component: () => import('@/views/main/system/BrandList/BrandList.vue'), // 品牌管理页面
        },
        {
          path: 'system/SpecList',
          name: 'SpecList',
          component: () => import('@/views/main/system/SpecList/SpecList.vue'), // 角色管理页面
        },
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/NotFound/notfound.vue'), // 404 页面
    }
  ],
});

// // 路由守卫
// router.beforeEach((to, from, next) => {
//   // 这里可以添加路由守卫逻辑，例如认证检查
//   next();
// });

export default router;


