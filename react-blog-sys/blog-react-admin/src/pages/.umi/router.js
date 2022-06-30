import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from 'D:/github/react-blog-sys/blog-react-admin/src/pages/.umi/LocaleWrapper.jsx'
import _dvaDynamic from 'dva/dynamic'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/user",
    "component": _dvaDynamic({
  
  component: () => import('../../layouts/UserLayout'),
  LoadingComponent: require('D:/github/react-blog-sys/blog-react-admin/src/components/PageLoading/index').default,
}),
    "routes": [
      {
        "path": "/user",
        "redirect": "/user/login",
        "exact": true
      },
      {
        "path": "/user/login",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('D:/github/react-blog-sys/blog-react-admin/src/pages/User/models/register.js').then(m => { return { namespace: 'register',...m.default}})
],
  component: () => import('../User/Login'),
  LoadingComponent: require('D:/github/react-blog-sys/blog-react-admin/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": () => React.createElement(require('D:/github/react-blog-sys/blog-react-admin/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/",
    "component": _dvaDynamic({
  
  component: () => import('../../layouts/BasicLayout'),
  LoadingComponent: require('D:/github/react-blog-sys/blog-react-admin/src/components/PageLoading/index').default,
}),
    "Routes": [require('../Authorized').default],
    "authority": [
      "admin",
      "user",
      "xuying",
      "biaochenxuying"
    ],
    "routes": [
      {
        "path": "/",
        "redirect": "/user/login",
        "exact": true
      },
      {
        "path": "/dashboard",
        "name": "dashboard",
        "icon": "dashboard",
        "routes": [
          {
            "path": "/dashboard/workplace",
            "name": "workplace",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('D:/github/react-blog-sys/blog-react-admin/src/pages/Dashboard/models/activities.js').then(m => { return { namespace: 'activities',...m.default}})
],
  component: () => import('../Dashboard/Workplace'),
  LoadingComponent: require('D:/github/react-blog-sys/blog-react-admin/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/github/react-blog-sys/blog-react-admin/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/otherUser",
        "name": "otherUser",
        "icon": "usergroup-add",
        "routes": [
          {
            "path": "/otherUser/list",
            "name": "list",
            "component": _dvaDynamic({
  
  component: () => import('../OtherUser/List'),
  LoadingComponent: require('D:/github/react-blog-sys/blog-react-admin/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/github/react-blog-sys/blog-react-admin/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/article",
        "name": "article",
        "icon": "file-markdown",
        "routes": [
          {
            "path": "/article/list",
            "name": "list",
            "component": _dvaDynamic({
  
  component: () => import('../Article/List'),
  LoadingComponent: require('D:/github/react-blog-sys/blog-react-admin/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/article/create",
            "name": "create",
            "component": _dvaDynamic({
  
  component: () => import('../Article/ArticleCreate'),
  LoadingComponent: require('D:/github/react-blog-sys/blog-react-admin/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/github/react-blog-sys/blog-react-admin/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/message",
        "name": "message",
        "icon": "message",
        "routes": [
          {
            "path": "/message/list",
            "name": "list",
            "component": _dvaDynamic({
  
  component: () => import('../Message/List'),
  LoadingComponent: require('D:/github/react-blog-sys/blog-react-admin/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/github/react-blog-sys/blog-react-admin/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/tag",
        "name": "tag",
        "icon": "tags",
        "routes": [
          {
            "path": "/tag/list",
            "name": "list",
            "component": _dvaDynamic({
  
  component: () => import('../Tag/List'),
  LoadingComponent: require('D:/github/react-blog-sys/blog-react-admin/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/github/react-blog-sys/blog-react-admin/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/link",
        "name": "link",
        "icon": "link",
        "routes": [
          {
            "path": "/link/list",
            "name": "list",
            "component": _dvaDynamic({
  
  component: () => import('../Link/List'),
  LoadingComponent: require('D:/github/react-blog-sys/blog-react-admin/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/github/react-blog-sys/blog-react-admin/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/category",
        "name": "category",
        "icon": "book",
        "routes": [
          {
            "path": "/category/list",
            "name": "list",
            "component": _dvaDynamic({
  
  component: () => import('../Category/List'),
  LoadingComponent: require('D:/github/react-blog-sys/blog-react-admin/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/github/react-blog-sys/blog-react-admin/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/timeAxis",
        "name": "timeAxis",
        "icon": "clock-circle",
        "routes": [
          {
            "path": "/timeAxis/list",
            "name": "list",
            "component": _dvaDynamic({
  
  component: () => import('../TimeAxis/List'),
  LoadingComponent: require('D:/github/react-blog-sys/blog-react-admin/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/github/react-blog-sys/blog-react-admin/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/project",
        "name": "project",
        "icon": "clock-circle",
        "routes": [
          {
            "path": "/project/list",
            "name": "list",
            "component": _dvaDynamic({
  
  component: () => import('../Project/List'),
  LoadingComponent: require('D:/github/react-blog-sys/blog-react-admin/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/github/react-blog-sys/blog-react-admin/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "exception",
        "icon": "warning",
        "path": "/exception",
        "routes": [
          {
            "path": "/exception/403",
            "name": "not-permission",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('D:/github/react-blog-sys/blog-react-admin/src/pages/Exception/models/error.js').then(m => { return { namespace: 'error',...m.default}})
],
  component: () => import('../Exception/403'),
  LoadingComponent: require('D:/github/react-blog-sys/blog-react-admin/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/exception/404",
            "name": "not-find",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('D:/github/react-blog-sys/blog-react-admin/src/pages/Exception/models/error.js').then(m => { return { namespace: 'error',...m.default}})
],
  component: () => import('../Exception/404'),
  LoadingComponent: require('D:/github/react-blog-sys/blog-react-admin/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/exception/500",
            "name": "server-error",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('D:/github/react-blog-sys/blog-react-admin/src/pages/Exception/models/error.js').then(m => { return { namespace: 'error',...m.default}})
],
  component: () => import('../Exception/500'),
  LoadingComponent: require('D:/github/react-blog-sys/blog-react-admin/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/exception/trigger",
            "name": "trigger",
            "hideInMenu": true,
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('D:/github/react-blog-sys/blog-react-admin/src/pages/Exception/models/error.js').then(m => { return { namespace: 'error',...m.default}})
],
  component: () => import('../Exception/TriggerException'),
  LoadingComponent: require('D:/github/react-blog-sys/blog-react-admin/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/github/react-blog-sys/blog-react-admin/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "account",
        "icon": "user",
        "path": "/account",
        "routes": [
          {
            "path": "/account/settings",
            "name": "settings",
            "component": _dvaDynamic({
  
  component: () => import('../Account/Settings/Info'),
  LoadingComponent: require('D:/github/react-blog-sys/blog-react-admin/src/components/PageLoading/index').default,
}),
            "routes": [
              {
                "path": "/account/settings",
                "redirect": "/account/settings/base",
                "exact": true
              },
              {
                "path": "/account/settings/base",
                "component": _dvaDynamic({
  
  component: () => import('../Account/Settings/BaseView'),
  LoadingComponent: require('D:/github/react-blog-sys/blog-react-admin/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/account/settings/personalLink",
                "component": _dvaDynamic({
  
  component: () => import('../Account/Settings/PersonalLinkView'),
  LoadingComponent: require('D:/github/react-blog-sys/blog-react-admin/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "component": () => React.createElement(require('D:/github/react-blog-sys/blog-react-admin/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('D:/github/react-blog-sys/blog-react-admin/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "component": _dvaDynamic({
  
  component: () => import('../404'),
  LoadingComponent: require('D:/github/react-blog-sys/blog-react-admin/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": () => React.createElement(require('D:/github/react-blog-sys/blog-react-admin/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('D:/github/react-blog-sys/blog-react-admin/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
  }
];
window.g_routes = routes;
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  window.g_plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
window.g_history.listen(routeChangeHandler);
routeChangeHandler(window.g_history.location);

export default function RouterWrapper() {
  return (
<RendererWrapper0>
          <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
        </RendererWrapper0>
  );
}
