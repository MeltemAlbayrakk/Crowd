import { useState } from "react";

export default function EditBox(props) {
  const {
    edit,
    editBoxVisibility,
    setEditBoxVisibility,
    budget,
    setBudget,
    category,
    setCategory,
    deadline,
    setDeadline,
    description,
    setDescription,
    status,
    setStatus,
    subcategory,
    setSubcategory,
    title,
    setTitle,
  } = props;

  return (
    <div
      className={editBoxVisibility ? "modal editBox active" : "editBox modal"}
      id="editBox"
    >
      <div className="container">
        <a
          className="close"
          onClick={() => {
            setEditBoxVisibility(false);
          }}
        >
          X
        </a>
        <a className="logo">Edit</a>
        <form onSubmit={edit}></form>
        <div>
          <label>Budget</label>
          <input
            type="text"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </div>
        <div>
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <label>Deadline</label>
          <input
            type="text"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Status</label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div>
          <label>Sub Category</label>
          <input
            type="text"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
          />
        </div>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
