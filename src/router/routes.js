
export default [
  {
    path: '/',
    component: () => import('layouts/noHeader'),
    children: [
      { path: '', component: () => import('pages/index') }
    ]
  },
  {
    path: '/piecemaker/live-annotate',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/piecemaker/liveAnnotate') }
    ]
  },
  {
    path: '/piecemaker/annotate',
    component: () => import('layouts/drawerRight'),
    children: [
      { path: '', component: () => import('pages/piecemaker/annotate') }
    ]
  },
  {
    path: '/piecemaker/videos',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/piecemaker/videos') }
    ]
  },
  {
    path: '/piecemaker/edit-video',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/piecemaker/editVideo') }
    ]
  },
  {
    path: '/piecemaker/sync',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/piecemaker/sync') }
    ]
  },
  {
    path: '/piecemaker',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/piecemaker/list') }
    ]
  },
  {
    path: '/piecemaker/list',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/piecemaker/list') }
    ]
  },
  {
    path: '/piecemaker/create',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/piecemaker/create') }
    ]
  },
  {
    path: '/piecemaker/edit-timeline',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/piecemaker/editTimeline') }
    ]
  },
  {
    path: '/mosys',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/mosys/list') }
    ]
  },
  {
    path: '/mosys/create',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/mosys/create') }
    ]
  },
  {
    path: '/mosys/edit',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/mosys/editGrid') }
    ]
  },
  {
    path: '/mosys/grid-editor',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/mosys/gridEditor') }
    ]
  },
  {
    path: '/mosys/manage-user',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/mosys/manageUser') }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
