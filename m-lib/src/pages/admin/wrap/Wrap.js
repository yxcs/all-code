import { useNavigate, Outlet } from 'react-router-dom';

function AdminWrap() {
  return (
    <div className="admin__wrap">
      <Outlet />
    </div>
  );
}

export default AdminWrap;
