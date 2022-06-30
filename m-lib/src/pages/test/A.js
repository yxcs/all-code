import { useNavigate } from 'react-router-dom';

function TEST_A() {
  const navigate = useNavigate();
  return (
    <div className="A" onClick={() => navigate('/test/child/123?name=test')}>
      A
    </div>
  );
}

export default TEST_A;
