import React from "react";
import './TagsInput.css';

function TagsInput({ isDisabled, state, setState }) {

  const addTags = ({ key, target }) => {
    const tag = target.value.slice(0, -1);                        // remove the ',' from the end

    if (key === "," && tag !== "") {
      if(state.tags.indexOf(tag) === -1)                          // if doesn't exist already
        setState({ ...state, tags: [ ...state.tags, tag ]});      // add tag.

      target.value = "";                                          // reset the field
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
      <input
        type="text"
        className="form-control"
        placeholder="Press ,(comma) to add a tag"
        onKeyUp={addTags}
        disabled={isDisabled}
      />
    </div>
  );
}

export default TagsInput;
