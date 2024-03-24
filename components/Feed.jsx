"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "@components/PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((eachItem) => (
        <PromptCard
          key={eachItem._id}
          post={eachItem}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchTimeOut, setSearchTimeOut] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [post, setposts] = useState([]);

  const filterPrompt = (searchText) => {
    if (searchText.includes("#")) {
      return post.filter((eachItem) => eachItem.tag === searchText);
    } else {
      return post.filter((eachItem) =>
      eachItem.prompt.toLowerCase().includes(searchText.toLowerCase()) || 
      eachItem.creator.username.toLowerCase().includes(searchText.toLowerCase())
    );
    }
  };
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeOut);
    setSearchText(e.target.value);
    const searchText = e.target.value.trim(); 
    setSearchTimeOut(
      setTimeout(() => {
        const result = filterPrompt(searchText);
        setSearchResult(result);
      }, 0) 
    );
  };
  

  const handleTagClick = (tag) => {
    setSearchText(tag);
    const result = filterPrompt(tag);
    setSearchResult(result);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setposts(data);
    };
    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <PromptCardList data={searchResult} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={post} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
