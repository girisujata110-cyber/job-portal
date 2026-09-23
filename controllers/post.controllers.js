import { jobmodel } from "../schema/job.model.js";

export const createJob = async (req, res) => {
  try {
    const { title, company, location, salary } = req.body;

    if (!title || !company || !location || !salary) {
      return res.status(400).json({
        success: false,
        message: "Title, company, location and salary are required",
      });
    }

    const newJob = await jobmodel.create({
      title,
      company,
      location,
      salary,
    });

    return res.status(201).json({
      success: true,
      message: "Job posted successfully",
      data: newJob,
    });
  } catch (error) {
    console.error("Create Job Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to post job",
      error: error.message,
    });
  }
};