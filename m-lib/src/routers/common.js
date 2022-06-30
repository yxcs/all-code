
import { Routes, Route } from 'react-router-dom';
import PageNotFound from '@/pages/common/NotFound'

function CommonTouter() {
  return (
    <Routes>
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  )
}

export default CommonTouter