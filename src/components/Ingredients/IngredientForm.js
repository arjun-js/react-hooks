import React, {useState} from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {

  const [inputState, setInputState] = useState({title: '', amount: ''});

  const submitHandler = event => {
    event.preventDefault();
    // ...
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title"
            value={inputState.title}
            onChange= {(event)=>{
              let eventValue = event.target.value;
              setInputState(prevState=>({
                title : eventValue,
                amount: prevState.amount
              }))
            }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount"
            value={inputState.amount}
            onChange={event=>{
              let eventValue = event.target.value;
              setInputState(prevState=>({
                title: prevState.title,
                amount: eventValue
              }))
            }} />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
