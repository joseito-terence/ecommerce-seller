import React, { useState, useEffect } from "react";
import './TagsInput.css';

function TagsInput({ isDisabled, dispatchTags }) {
  const [tags, setTags] = useState([]);

  const addTags = ({ key, target }) => {
    const tag = target.value.slice(0, -1);  // remove the ',' from the end

    if (key === "," && tag !== "") {
      if(tags.indexOf(tag) === -1)          // if doesn't exist already
        setTags([ ...tags, tag ]);          // add tag.

      target.value = "";                    // reset the field
    }
  };

  const removeTag = (index) => {
    setTags([...tags.filter((tag) => tags.indexOf(tag) !== index)]);
  };

  useEffect(() => {
    if(isDisabled){
      dispatchTags(tags);
      setTags([]);
    }

  }, [isDisabled])

  return (
    <div className="tagsInput">
      <ul>
        {tags.map((tag, index) => (
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
