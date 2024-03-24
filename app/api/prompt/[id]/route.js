import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response("Prompt not found", {
        status: 404,
      });
    } else {
      return new Response(JSON.stringify(prompt), {
        status: 200,
      });
    }
  } catch (err) {
    return new Response("Failed to fecth all prompts", {
      status: 500,
    });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();
    const exisitingPrompt = await Prompt.findById(params.id);
    if (!exisitingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    } else {
      exisitingPrompt.prompt = prompt;
      exisitingPrompt.tag = tag;

      await exisitingPrompt.save();

      return new Response(JSON.stringify(exisitingPrompt), { status: 200 });
    }
  } catch (err) {
    return new Response("Failed to update", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);
    
    return new Response("Delete Successfully", { status: 200 });
  } catch (err) {
    return new Response("Something went wrong,Please try later", {
      status: 500,
    });
  }
};
