"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [post, setposts] = useState([]);
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (item) => {
    const hasConfirmed = confirm("Are you sure , you want to delete");
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${item._id.toString()}`, {
          method: "DELETE",
        });
        const filterPost = post.filter((eachItem) => eachItem._id !== item._id);
        setposts(filterPost);
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setposts(data);
    };
    if (session?.user.id) {
      fetchPosts();
    }
  }, []);
  return (
    <Profile
      name="My"
      desc="welcome"
      data={post}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
