import express from "express";
import cors from "cors";

import { jobmodel } from "./schema/job.model.js";
import db from "./config/db.js";
import { productmodel } from "./schema/product.model.js";
import userModel from "./schema/users.model.js";
import Post from "./schema/post.model.js";
const app = express();


// ================= MIDDLEWARE =================

app.use(cors());
app.use(express.json());

db();


// ================= HOME =================

app.get("/", (req, res) => {
  res.send("Job Portal API is running!");
});


// ================= JOB =================

// POST JOB
app.post("/job", async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      salary,
    } = req.body || {};

    if (!title || !company || !location || !salary) {
      return res.status(400).json({
        message: "All job fields are required",
      });
    }

    const data = await jobmodel.create({
      title,
      company,
      location,
      salary,
    });

    res.status(201).json({
      message: "Job added successfully",
      data: data,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Job failed",
      error: error.message,
    });
  }
});


// GET ALL JOBS
app.get("/findjob", async (req, res) => {
  try {
    const jobdetail = await jobmodel.find();

    res.status(200).json({
      message: "Job find successfully",
      data: jobdetail,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Job failed",
      error: error.message,
    });
  }
});


// DELETE JOB
app.delete("/job/:id", async (req, res) => {
  try {
    const jobdetail = await jobmodel.findByIdAndDelete(
      req.params.id
    );

    if (!jobdetail) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job deleted successfully",
      data: jobdetail,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Job delete failed",
      error: error.message,
    });
  }
});


// ================= PRODUCT =================

// CREATE PRODUCT
app.post("/product", async (req, res) => {
  try {
    const {
      name,
      benefit,
      description,
      price,
      category,
      stock,
    } = req.body || {};

    if (!name || !benefit || !description || !price || !category) {
      return res.status(400).json({
        message: "Something is missing",
      });
    }

    const product = await productmodel.create({
      name,
      benefit,
      description,
      price,
      category,
      stock,
    });

    res.status(201).json({
      message: "Product created successfully",
      data: product,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Product creation failed",
      error: error.message,
    });
  }
});


// GET ALL PRODUCTS
app.get("/product", async (req, res) => {
  try {
    const products = await productmodel.find();

    res.status(200).json({
      message: "Products fetched successfully",
      data: products,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
});


// GET PRODUCT BY ID
app.get("/product/:id", async (req, res) => {
  try {
    const product = await productmodel.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      data: product,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch product",
      error: error.message,
    });
  }
});


// UPDATE PRODUCT
app.put("/product/:id", async (req, res) => {
  try {
    const product = await productmodel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      data: product,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Product update failed",
      error: error.message,
    });
  }
});


// DELETE PRODUCT
app.delete("/product/:id", async (req, res) => {
  try {
    const product = await productmodel.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      data: product,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Product deletion failed",
      error: error.message,
    });
  }
});



app.post("/register", async (req, res) => {
  try {

  
    const {
      name,
      email,
      password,
    } = req.body || {};


    
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }


    
    const existingUser = await userModel.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }


    
    const user = await userModel.create({
      name,
      email,
      password,
    });


    res.status(201).json({
      message: "User registered successfully",
      data: user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
});



// CREATE POST
app.post("/post", async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      salary,
      description,
      category,
      jobType,
      skills,
      deadline,
    } = req.body || {};

    if (
      !title ||
      !company ||
      !location ||
      !salary ||
      !description ||
      !category
    ) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    const post = await Post.create({
      title,
      company,
      location,
      salary,
     
    });

    res.status(201).json({
      message: "Job posted successfully",
      data: post,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Job posting failed",
      error: error.message,
    });
  }
});



app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json({
      message: "Posts fetched successfully",
      data: posts,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch posts",
      error: error.message,
    });
  }
});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});