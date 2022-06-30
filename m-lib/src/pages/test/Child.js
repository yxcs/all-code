import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

function TEST_Child() {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params.id)
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get('name')) // 12
  return (
    <div className="A" onClick={() => navigate('/test/b')}>
      Child
    </div>
  );
}

export default TEST_Child;
