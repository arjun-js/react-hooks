import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';

function Ingredients() {
  const [ingredientList, setIngredientList] = useState([]);
  const [isLoading, setLoader] = useState(false);
  const [error, setError] = useState();
  const addIngredientHandler = (ingredient) => {
    setLoader(true);
    fetch(
      'https://practicing-react-a7ede-default-rtdb.firebaseio.com/ingredients.json',
      {
        method: 'POST',
        body: JSON.stringify(ingredient),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => {
        setLoader(false);
        return response.json();
      })
      .then((responseData) => {
        setIngredientList((prevState) => [
          ...ingredientList,
          { id: responseData.name, ...ingredient },
        ]);
      });
  };

  const onFilterChangeHandler = useCallback((filteredList=>{
    setIngredientList(filteredList);
  }), [setIngredientList]);

  const onRemoveHandler = (id)=>{
    setLoader(true);
    fetch(
      `https://practicing-react-a7ede-default-rtdb.firebaseio.com/ingredients/${id}.json`,
      {
        method: 'DELETE',
      }
    ).then(response=>{
      setLoader(false);
      setIngredientList(prevList=>prevList.filter(ing=>ing.id!==id))
    }).catch(error=>{
      setError(error.message);
    })
  }

  const onModalClose= ()=>{
    setError();
    setLoader(false);
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onFilterChangeHandler={onFilterChangeHandler} />
        {/* Need to add list here! */}
      </section>
      <IngredientList ingredients={ingredientList} onRemoveItem={onRemoveHandler} />
      {error && <ErrorModal onClose={onModalClose}>{error}</ErrorModal>}
    </div>
  );
}

export default Ingredients;
