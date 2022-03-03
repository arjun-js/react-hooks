import React, { useState, useCallback, useReducer } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';

const ingredientsReducer = (currentIngredients, action)=>{
  switch(action.type){
    case 'SET':
      return action.ingredients;
      case 'ADD':
        return [...currentIngredients, action.ingredient];
        case 'DELETE':
          return currentIngredients.filter(ing=>ing.id !== action.id);
          default:
            throw new Error('should not come here')
  }
}

const httpReducer = (httpState, action)=>{
  switch(action.type){
    case 'SEND':
      return { loading : true, error: null}
      case 'SUCCESS':
        return {loading: false, error : null}
        case 'ERROR':
          return {loading: false, error: action.errorMessage}
          default: 
            throw new Error('Should not come here dude');
  }
}

function Ingredients() {
  const [ingredientsList, dispatch] = useReducer(ingredientsReducer,[]);
  const [httpState, httpStateDispatch] = useReducer(httpReducer, {
    loading : false, error: null
  });
  const addIngredientHandler = (ingredient) => {
    httpStateDispatch({type: 'SEND'});
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
        httpStateDispatch({type: 'SUCCESS'});
        return response.json();
      })
      .then((responseData) => {
        dispatch({type: 'ADD', ingredient: { id: responseData.name, ...ingredient }})
      });
  };

  const onFilterChangeHandler = useCallback((filteredList=>{
    dispatch({type: 'SET', ingredients : filteredList})
  }), []);

  const onRemoveHandler = (id)=>{
    httpStateDispatch({type: 'SEND'});
    fetch(
      `https://practicing-react-a7ede-default-rtdb.firebaseio.com/ingredients/${id}.json`,
      {
        method: 'DELETE',
      }
    ).then(response=>{
      httpStateDispatch({type: 'SUCCESS'});
      dispatch({type: 'DELETE', id: id});
    }).catch(error=>{
      httpStateDispatch({type: 'ERROR', error: error.message});
    })
  }

  const onModalClose= ()=>{
    httpStateDispatch({type: 'SUCCESS'});
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} loading={httpState.loading} />

      <section>
        <Search onFilterChangeHandler={onFilterChangeHandler} />
        {/* Need to add list here! */}
      </section>
      <IngredientList ingredients={ingredientsList} onRemoveItem={onRemoveHandler} />
      {httpState.error && <ErrorModal onClose={onModalClose}>{httpState.error}</ErrorModal>}
    </div>
  );
}

export default Ingredients;
