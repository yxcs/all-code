import commonLayout from './components/commonLayout'
import codeLayout from './components/codeLayout'
import HomePage from './views/home'

import Install from './docs/install.md'
import QuikeStart from './docs/quikeStart.md'
import Button from './docs/button.md'
import Checkbox from './docs/checkbox.md'
import CascadeTree from './docs/cascade-tree.md'
import Convention from './docs/convention.md'
import CodeStart from './docs/codeStart.md'
import ComponentUpdate from './docs/componentUpdate.md'
import InputDir from './docs/input-directive.md'
import DateFilter from './docs/date-filters.md'

const routes = [
  {
    path: '/',
    component: HomePage,
    name: 'HomePage'
  },
  {
    path: '/doc',
    component: commonLayout,
    name: 'docInit',
    children: [
      {
        path: '/doc/install',
        name: 'Install',
        component: Install
      },
      {
        path: '/doc/quikeStart',
        name: 'quikeStart',
        component: QuikeStart
      },
      {
        path: '/doc/button',
        name: 'button',
        component: Button
      },
      {
        path: '/doc/checkbox',
        name: 'checkbox',
        component: Checkbox
      },
      {
        path: '/doc/cascadeTree',
        name: 'cascadeTree',
        component: CascadeTree
      },
      {
        path: '/doc/dir/input',
        name: 'InputDir',
        component: InputDir
      },
      {
        path: '/doc/filter/date',
        name: 'DateFilter',
        component: DateFilter
      }
    ],
    redirect: '/doc/install'
  },
  {
    path: '/code',
    component: codeLayout,
    name: 'codeInit',
    children: [
      {
        path: '/code/start',
        name: 'CodeStart',
        component: CodeStart
      },
      {
        path: '/code/convention',
        name: 'Convention',
        component: Convention
      },
      {
        path: '/code/update',
        name: 'ComponentUpdate',
        component: ComponentUpdate
      }
    ],
    redirect: '/code/start'
  }
]

export default routes
