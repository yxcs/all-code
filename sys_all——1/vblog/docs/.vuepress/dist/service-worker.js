/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "fe0abb4009d6faffadc0c0bf0716a887"
  },
  {
    "url": "animate/index.html",
    "revision": "c59f45ed652226eb91595087fcbd14b5"
  },
  {
    "url": "assets/css/0.styles.7be58d34.css",
    "revision": "c8e1b1c018609a1ff72325386f9b5c7f"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.851277d8.js",
    "revision": "55c7c8e71cb999354094a1ce70fe6ea5"
  },
  {
    "url": "assets/js/11.8646d530.js",
    "revision": "bdd2f5296d6b22f0072189a1a250fbc9"
  },
  {
    "url": "assets/js/12.d3bd459b.js",
    "revision": "e588bb16d393e81a47cb3df4a3455f50"
  },
  {
    "url": "assets/js/13.12d4b94f.js",
    "revision": "a99f0d2102ca6345dcf95d531cae085f"
  },
  {
    "url": "assets/js/14.886c5616.js",
    "revision": "bac832a0fa8c61382275ac3fbe8127ac"
  },
  {
    "url": "assets/js/15.08ed4b09.js",
    "revision": "cda7cdb5e0d12d9de99facc31528fbfe"
  },
  {
    "url": "assets/js/16.9f09b45a.js",
    "revision": "07c1ad8e4d92ec388510f37352bec67e"
  },
  {
    "url": "assets/js/17.7f1eb80f.js",
    "revision": "81f9d7ad5dbc9631c32ff839b3ccb159"
  },
  {
    "url": "assets/js/18.5e63d0f9.js",
    "revision": "77943f7f555972d738932eb42d403585"
  },
  {
    "url": "assets/js/19.14c464b4.js",
    "revision": "47ed45cbf45913171a95c2017f47fe5f"
  },
  {
    "url": "assets/js/20.73a02d42.js",
    "revision": "2f35a5f1f40c708e9c1fef3a4cb46067"
  },
  {
    "url": "assets/js/21.c01bbdd6.js",
    "revision": "6669e77f22916b962d5319ec366d0565"
  },
  {
    "url": "assets/js/22.6fd17d36.js",
    "revision": "303ca5ea93004a34cd7aa72c6d101a96"
  },
  {
    "url": "assets/js/23.c45d9f16.js",
    "revision": "32477f6bde5f0ca2747ccf187c11f4ce"
  },
  {
    "url": "assets/js/24.2315633d.js",
    "revision": "4ee592213f274c609f5860e21742c824"
  },
  {
    "url": "assets/js/25.ddaa59bb.js",
    "revision": "03f08e4994a002fc88299f15f747d136"
  },
  {
    "url": "assets/js/26.08b94396.js",
    "revision": "487d32a267b34f7d8eb1389471266621"
  },
  {
    "url": "assets/js/27.cfc89920.js",
    "revision": "cf16072b76aa128162f254f4662af64d"
  },
  {
    "url": "assets/js/28.7bf0649e.js",
    "revision": "8c6e3149041fb719f5a1eb98c18f416c"
  },
  {
    "url": "assets/js/29.b2f7d873.js",
    "revision": "34224caf3e832de109f802edb9d40db9"
  },
  {
    "url": "assets/js/3.36104d35.js",
    "revision": "186c67fb419c7fb7fc7f87d6548bbdb8"
  },
  {
    "url": "assets/js/30.5eda8e0f.js",
    "revision": "284e646db74809795e1f0cdf557d74ac"
  },
  {
    "url": "assets/js/31.d3ed9c85.js",
    "revision": "9005813fdd88da5edc6070bdbafebe28"
  },
  {
    "url": "assets/js/32.ccb985ec.js",
    "revision": "0c32035209af132ea8e13bb366a46114"
  },
  {
    "url": "assets/js/4.4c0f2eba.js",
    "revision": "4b4d28c07d2abed1f0cbb2a74d3f6c66"
  },
  {
    "url": "assets/js/5.d93e9add.js",
    "revision": "e8c76ed1b293613fe1bcc6f0452d04b6"
  },
  {
    "url": "assets/js/6.35f9017f.js",
    "revision": "467a6529a29708afdf5b99d255d1e0bc"
  },
  {
    "url": "assets/js/7.5049467e.js",
    "revision": "44841200673f7b1caa125abf9cf893ed"
  },
  {
    "url": "assets/js/8.8dd97ad1.js",
    "revision": "1d0087d6d90152922e971eef10f8e872"
  },
  {
    "url": "assets/js/9.0931944b.js",
    "revision": "fc77b1344a338be6c449d1e98094ec0a"
  },
  {
    "url": "assets/js/app.36481073.js",
    "revision": "207c1a96630e5c658be796b8b9d530ca"
  },
  {
    "url": "assets/js/vendors~flowchart.bf0b7d3a.js",
    "revision": "df14cddde29b1f5ed901fdfdff766763"
  },
  {
    "url": "backend/index.html",
    "revision": "d9ab37d310fd48ac450a4516335b9cdc"
  },
  {
    "url": "components/index.html",
    "revision": "87d4cea3dee0dfecadb6089e3350b454"
  },
  {
    "url": "css/BFC-IFC-GFC-FFC.html",
    "revision": "c4af017aceba772345402d8ad2418889"
  },
  {
    "url": "css/index.html",
    "revision": "55a1c10bb648aff20e39809eab19fbfb"
  },
  {
    "url": "css/line-height设置百分比数字以及em.html",
    "revision": "124e49c52b7d0121c9a93b3194ceb5cc"
  },
  {
    "url": "essay/index.html",
    "revision": "f01adad7e62220f582fbdef092ee8040"
  },
  {
    "url": "framedesign/index.html",
    "revision": "1d0288cf04f9726af6d7baeb0d0a0f65"
  },
  {
    "url": "framework/index.html",
    "revision": "54262b75e6a38d05f3cda5f96f8b3c62"
  },
  {
    "url": "frontend/index.html",
    "revision": "3f6aed87ca07f1cc689b00495a4ec7d9"
  },
  {
    "url": "frontend/js的基础知识.html",
    "revision": "86c80caa7bcff8afbf5a1585166b26c3"
  },
  {
    "url": "frontend/js函数多种写法.html",
    "revision": "85ce2688b947b02847e47278631cdcfa"
  },
  {
    "url": "frontend/test.html",
    "revision": "6bf0bee39f989340f3339c25c6c7795e"
  },
  {
    "url": "guide/index.html",
    "revision": "19897b7a1b06f34f69bd4fa81d98e83a"
  },
  {
    "url": "home.html",
    "revision": "4959b5b8f2f59a26f412cbb27ca1b744"
  },
  {
    "url": "home.jpg",
    "revision": "c25a1963a4602d32beeaa712389f8294"
  },
  {
    "url": "index.html",
    "revision": "49dcce51c1ead71b8feec607478df53c"
  },
  {
    "url": "java/index.html",
    "revision": "5ead36d4622d2dd43d445bb5a415188a"
  },
  {
    "url": "layout/index.html",
    "revision": "216f34a9945fe8160fa6b1d08f2dbcf9"
  },
  {
    "url": "logo.png",
    "revision": "a14aa116304b8fe7d09b1d189001d8fb"
  },
  {
    "url": "node/index.html",
    "revision": "3b25a8233783625cf3aefb2687b19f19"
  },
  {
    "url": "react/create-react-app_base-build.html",
    "revision": "c8f6f460853bc1da89ff7a748bc29942"
  },
  {
    "url": "react/index.html",
    "revision": "1b71cc2a21e93585fcef56457e54f9f3"
  },
  {
    "url": "server/index.html",
    "revision": "2b5ac2e69ff2f3ab597a0a0b26b0226d"
  },
  {
    "url": "ui/index.html",
    "revision": "1345622a30d7077140842e4645cba3c7"
  },
  {
    "url": "vue/base_vue_project.html",
    "revision": "d34faba6b0d0641345b5f5611d614ab5"
  },
  {
    "url": "vue/base_vue_project/20161208175927076.png",
    "revision": "ca866b4b796771036688326c996baa89"
  },
  {
    "url": "vue/base_vue_project/20161209093509203.png",
    "revision": "f42cb6f16b4970c2d571478e1186d7e3"
  },
  {
    "url": "vue/base_vue_project/20161209093553979.png",
    "revision": "23db649bd22dc15d8b482296a4a8e36d"
  },
  {
    "url": "vue/index.html",
    "revision": "0e68cc9ff5118bf75bdbfa5edefd1409"
  },
  {
    "url": "vue/line-height_set_value/20161205145801847.png",
    "revision": "9b0a99d2be86050f91330dc40ab684d4"
  },
  {
    "url": "woniu.jpg",
    "revision": "032666203e6749b0f774e3cf6e3021dd"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
