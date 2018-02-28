import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/pages/LandingPage'
import HomePage from '@/pages/HomePage'
import TimeLine from '@/components/homepage/TimeLine'
import DetailPost from '@/components/homepage/DetailPost'
import ProfilePage from '@/pages/ProfilePage'
import Profile from '@/components/profilepage/Profile'
import ProfileOther from '@/components/profilepage/ProfileOther'
import AddQuestion from '@/pages/AddQuestion'
import EditQuestion from '@/pages/EditQuestion'
// import { mapState } from 'vuex'
Vue.use(Router)
let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage
    },
    {
      path: '/home',
      // name: 'HomePage',
      component: HomePage,
      children: [
        {
          path: '',
          name: 'TimeLine',
          component: TimeLine
        },
        {
          path: 'post/:id',
          name: 'DetailPost',
          component: DetailPost,
          props: true
        }
      ]
    },
    {
      path: '/profile',
      // name: 'ProfilePage',
      component: ProfilePage,
      children: [
        {
          path: '',
          name: 'Profile',
          component: Profile
        },
        {
          path: '1',
          name: 'ProfileOther',
          component: ProfileOther
        }
      ]
    },
    {
      path: '/me/add',
      name: 'AddQuestion',
      component: AddQuestion
    },
    {
      path: '/me/:id/edit',
      name: 'EditQuestion',
      component: EditQuestion,
      props: true
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to, 'ini to')
  if (to.name === 'LandingPage') {
    next()
  } else {
    if (!localStorage.getItem('token')) {
      next({name: 'LandingPage'})
    } else {
      next()
    }
  }
})

export default router
// export default new Router({
//   mode: 'history',
//   routes: [
//     {
//       path: '/',
//       name: 'LandingPage',
//       component: LandingPage
//     },
//     {
//       path: '/home',
//       // name: 'HomePage',
//       component: HomePage,
//       children: [
//         {
//           path: '',
//           name: 'TimeLine',
//           component: TimeLine
//         },
//         {
//           path: 'post/:id',
//           name: 'DetailPost',
//           component: DetailPost,
//           props: true
//         }
//       ]
//     },
//     {
//       path: '/profile',
//       // name: 'ProfilePage',
//       component: ProfilePage,
//       children: [
//         {
//           path: '',
//           name: 'Profile',
//           component: Profile
//         },
//         {
//           path: '1',
//           name: 'ProfileOther',
//           component: ProfileOther
//         }
//       ]
//     },
//     {
//       path: '/me/add',
//       name: 'AddQuestion',
//       component: AddQuestion
//     }
//   ]
// })
