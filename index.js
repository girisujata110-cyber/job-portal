import express from "express";
import { jobmodel } from "./schema/job.model.js";
import db from "./config/db.js";
const app = express();
db()
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Job Portal API is running!");
});
app.post("/job", async (req, res) => {
    try {
        const{
title,
company,
location,
salary,
        }= req.body;
        const data = await jobmodel.create({
            title,
            company,
            location,
            salary,
        })
        
     res.status(200).json({
        message:"job applied successfully",
        data: data,
     })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"sbdeuwhd",
            error: error.message,
        })
    }
});
        
app.get("/findjob", async (req,res) =>
{
    try {
    const jobdetail = await jobmodel.find();

    res.status(200).json({
      message: "job find  successfully",
      data: jobdetail,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "job  failed",
      error: error.message,
    });
  }
});
app.delete("/job/:id", async (req, res) => {
  
try {
  const id=req.params.id

  const jobdetail= await jobmodel.findByIdAndDelete(id);
  res.status(200).json({
    message:"job find  successfully",
    data: jobdetail,
  })
} catch (error) {
  console.log ("error")
  req.status(500).json({
    message:" added failed",
    error:error.message,

  })
}
})


app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});