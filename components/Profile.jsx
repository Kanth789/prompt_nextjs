import React from "react";
import PromptCard from "./PromptCard";
const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name}</span> Profile
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-16 prompt_layout">
      {data?.map((eachItem) => (
        <PromptCard
          key={eachItem._id}
          post={eachItem}
          handleEdit={()=>handleEdit && handleEdit(eachItem)}
          handleDelete={()=>handleDelete && handleDelete(eachItem)}
        />
      ))}
    </div>
    </section>
  );
};

export default Profile;
