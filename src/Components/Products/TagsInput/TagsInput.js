import React, { useState } from "react";
import './TagsInput.css';

function TagsInput({ isDisabled, state, setState }) {
  const [tag, setTag] = useState('');

  const addTag = event => {
    event.preventDefault();

    if (tag) {
      if(state.tags.indexOf(tag) === -1)                          // if doesn't exist already
        setState({ ...state, tags: [ ...state.tags, tag ]});      // add tag.

      setTag('');                                                 // reset the field
    }
  };

  const removeTag = (index) => {
    setState({ 
      ...state, 
      tags: [...state.tags.filter((tag) => state.tags.indexOf(tag) !== index)] 
    });
  };

  return (
    <div className="tagsInput">
      <ul>
        {state.tags.map((tag, index) => (
          <li key={index}>
            <span>{tag}</span>
            <i className="fas fa-times" onClick={() => removeTag(index)}></i>
          </li>
        ))}
      </ul>
      <div className='d-flex'>
        <input
          type="text"
          className="form-control"
          placeholder="Add a tag"
          value={tag}
          onChange={e => setTag(e.target.value)}
          disabled={isDisabled}
        />
        <button type='button' className="btn btn-secondary ms-1" onClick={addTag}>
          <i className="fas fa-plus"></i>
        </button>
      </div>
      
    </div>
  );
}

export default TagsInput;
