"use client";

import Form from "@components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const Prompt = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        if (response.ok) {
          const data = await response.json();
          setPost({
            prompt: data.prompt,
            tag: data.tag,
          });
        } else {
          console.error("Failed to fetch prompt details");
        }
      } catch (error) {
        console.error("Error fetching prompt details:", error);
      }
    };
    if (promptId) {
      getPromptDetails();
    } else {
      console.error("Prompt id not found");
    }
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!promptId) {
      alert("Prompt id not found");
      return;
    }
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      } else {
        console.error("Failed to update prompt");
      }
    } catch (error) {
      console.error("Error updating prompt:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

const EditPrompt = () => {
  return (
    <Suspense>
      <Prompt />
    </Suspense>
  );
};

export default EditPrompt;
