import { Outlet } from 'react-router-dom';

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from 'recoil';

import { Button } from 'antd';

import './test.scss'

import { nameState } from '../../recoil/test'

const NameInput = () => {
  const [name, setName] = useRecoilState(nameState);
  const onChange = (event) => {
   setName(event.target.value);
  };
  return <>
   <input type="text" value={name} onChange={onChange} />
   <div>Name: {name}</div>
  </>;
}

// useRecoilValue
const SomeOtherComponentWithName = () => {
  const name = useRecoilValue(nameState);
  return <div>{name}</div>;
}

// useSetRecoilState  
const SomeOtherComponentThatSetsName = () => {
  const setName = useSetRecoilState(nameState);
  return <button onClick={() => setName('Jon Doe')}>Set Name</button>;
}

function TEST_Parent() {
  return (
    <RecoilRoot>
      <div className="A">
        P
        <div>parent</div>
        <Button>Antd按钮</Button>
        <Outlet />
      </div>
    </RecoilRoot>
  );
}

export default TEST_Parent;
