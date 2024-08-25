import { Route, Routes } from 'react-router-dom';
import Home from './componets/Home/Home.jsx';
import Header from './componets/Header/Header.jsx';
import CreateItem from './componets/CreateContact/CreateItem.jsx';
import Edititem from './componets/Edit/Edititem.jsx';




function App() {

  return (
    <>

    <Header/>

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/create' element={<CreateItem />} />
        <Route path='/edit/:id' element={<Edititem />} />

      </Routes>
    </>
  )
}

export default App;
