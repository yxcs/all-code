import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
// https://zhuanlan.zhihu.com/p/431389907
import './App.scss';

import AdminTouter from './routers/admin'
import TestTouter from './routers/test'
import CommonTouter from './routers/common'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TestTouter />
        <AdminTouter />
        <CommonTouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
