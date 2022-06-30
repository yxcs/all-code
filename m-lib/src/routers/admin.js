import { Routes, Route } from 'react-router-dom';
import AdminWrap from '@/pages/admin/wrap/Wrap'
import AdminHome from '@/pages/admin/home/Home'
import AdminLogin from '@/pages/admin/login/Login'

function AdminTouter() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminWrap />}>
        <Route path="home" element={<AdminHome />} />
      </Route>
    </Routes>
  )
}

export default AdminTouter