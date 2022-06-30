import { Routes, Route } from 'react-router-dom';

import PageA from '@/pages/test/A'
import PageB from '@/pages/test/B'
import PageC from '@/pages/test/C'
import PageChild from '@/pages/test/Child'
import PageParent from '@/pages/test/Parent'

function TestTouter() {
  return (
    <Routes>
      <Route path='/test' element={<PageParent />}>
        <Route path='' element={<PageA />} />
        <Route path='b' element={<PageB />} />
        <Route path='c' element={<PageC />} />
        <Route path='child/:id' element={<PageChild />} />
      </Route>
    </Routes>
  )
}

export default TestTouter