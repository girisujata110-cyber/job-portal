
import Post from "../schema/post.model.js";


export const createPost = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      salary,
     
    } = req.body;

    const post = await Post.create({
      title,
      company,
      location,
      salary,
     
    });

    res.status(201).json({
      success: true,
      message: "Job posted successfully",
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json({
      success: true,
      message: "Jobs fetched successfully",
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Job post not found",
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update job post
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Job post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job post updated successfully",
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete job post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Job post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job post deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

