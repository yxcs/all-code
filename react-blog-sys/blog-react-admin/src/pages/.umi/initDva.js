import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'article', ...(require('D:/github/react-blog-sys/blog-react-admin/src/models/article.js').default) });
app.model({ namespace: 'category', ...(require('D:/github/react-blog-sys/blog-react-admin/src/models/category.js').default) });
app.model({ namespace: 'global', ...(require('D:/github/react-blog-sys/blog-react-admin/src/models/global.js').default) });
app.model({ namespace: 'link', ...(require('D:/github/react-blog-sys/blog-react-admin/src/models/link.js').default) });
app.model({ namespace: 'list', ...(require('D:/github/react-blog-sys/blog-react-admin/src/models/list.js').default) });
app.model({ namespace: 'login', ...(require('D:/github/react-blog-sys/blog-react-admin/src/models/login.js').default) });
app.model({ namespace: 'message', ...(require('D:/github/react-blog-sys/blog-react-admin/src/models/message.js').default) });
app.model({ namespace: 'otherUser', ...(require('D:/github/react-blog-sys/blog-react-admin/src/models/otherUser.js').default) });
app.model({ namespace: 'project', ...(require('D:/github/react-blog-sys/blog-react-admin/src/models/project.js').default) });
app.model({ namespace: 'setting', ...(require('D:/github/react-blog-sys/blog-react-admin/src/models/setting.js').default) });
app.model({ namespace: 'tag', ...(require('D:/github/react-blog-sys/blog-react-admin/src/models/tag.js').default) });
app.model({ namespace: 'timeAxis', ...(require('D:/github/react-blog-sys/blog-react-admin/src/models/timeAxis.js').default) });
app.model({ namespace: 'user', ...(require('D:/github/react-blog-sys/blog-react-admin/src/models/user.js').default) });
