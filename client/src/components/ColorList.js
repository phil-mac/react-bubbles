import React, { useState } from "react";
import {axiosWithAuth} from "../axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
    .put(`http://localhost:5005/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      console.log(res);
      updateColors(colors.map(color => (
        color.id === colorToEdit.id
        ? colorToEdit
        : color
      )))
    })
    .catch(err => {
      console.log(err);
    })

  };

  const deleteColor = color => {
    axiosWithAuth()
    .delete(`http://localhost:5005/api/colors/${color.id}`)
    .then(res => {
      console.log(res);
      updateColors(colors.filter(item => item.id !== color.id));
    })
    .catch(err => {
      console.log(err);
    })
  };

  const addColor = e => {
    e.preventDefault();
    console.log('add color: ')
    console.log(colorToAdd);
    axiosWithAuth()
    .post(`http://localhost:5005/api/colors`, colorToAdd)
    .then(res => {
      console.log(res);
      updateColors(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/* <div className="spacer" /> */}
      {/* stretch - build another form here to add a color */}
      <form onSubmit={addColor}>
        <legend>add color</legend>
        <label>
          color name:
          <input
            onChange={e =>
              setColorToAdd({ ...colorToAdd, color: e.target.value })
            }
            value={colorToAdd.color}
          />
        </label>
        <label>
          hex code:
          <input
            onChange={e =>
              setColorToAdd({
                ...colorToAdd,
                code: { hex: e.target.value }
              })
            }
            value={colorToAdd.code.hex}
          />
        </label>
        <div className="button-row">
          <button type="submit">save</button>
        </div>
      </form>
    </div>
  );
};

export default ColorList;
