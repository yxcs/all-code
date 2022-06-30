import { atom, selector, } from 'recoil';
// https://www.jianshu.com/p/76439a0f15fa

export const nameState = atom({
  key: 'nameState',
  default: 'test'
});

// 可异步
export const lengthState = selector({
  key: 'lengthState', 
  get: ({get}) => {
    const text = get(nameState);
    return text.length;
  },
});