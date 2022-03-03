import React, { useContext } from 'react';
import Auth from './components/Auth';

import Ingredients from './components/Ingredients/Ingredients';

import { AuthContext } from './context/Auth-context';

const App = props => {

  const authContext = useContext(AuthContext);

  let content = <Ingredients />;

  if(!authContext.isLogin){
    content = <Auth/>
  }

  return content;
};

export default App;
