import React, {useState, useEffect, useRef} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {

  const {onFilterChangeHandler} = props;

const [enteredText, setEnteredText] = useState('');

const inputRef = useRef();

useEffect(()=>{
  const timer = setTimeout(()=>{
    if(enteredText === inputRef.current.value){
      let query = enteredText.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredText}"`;
      fetch(
        'https://practicing-react-a7ede-default-rtdb.firebaseio.com/ingredients.json' + query
      )
        .then((responseData) => responseData.json())
        .then((data) => {
          const ingredientsData = [];
    
          for(const key in data){
            ingredientsData.push({
              id: key,
              title: data[key].title,
              amount: data[key].amount
            });
          }
       onFilterChangeHandler(ingredientsData);
        });
    }

  }, 1000);

  return ()=>{
    clearTimeout(timer);
  }
 
}, [enteredText, onFilterChangeHandler, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input 
          value={enteredText}
          ref={inputRef}
          onChange={(event)=>{
            setEnteredText(event.target.value)
          }}
          type="text" />
        </div>
      </Card>
    </section>
  );
});

export default Search;
