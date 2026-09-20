import { jobmodel } from "../schema/job.model";

export const jobCreate = async (req, res) => {
  try {
    const { title, company, location, salary } = req.body;

    const job = await jobmodel.create({
      title,
      company,
      location,
      salary,
    });

    res.status(201).json({
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Job creation failed",
      error: error.message,
    });
  }
};


export const jobFind = async (req, res) => {
  try {
    const jobs = await jobmodel.find();

    res.status(200).json({
      message: "Jobs fetched successfully",
      data: jobs,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch jobs",
      error: error.message,
    });
  }
};


export const jobFindOne = async (req, res) => {
  try {
    const job = await jobmodel.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job fetched successfully",
      data: job,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch job",
      error: error.message,
    });
  }
};


export const jobUpdate = async (req, res) => {
  try {
    const job = await jobmodel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job updated successfully",
      data: job,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Job update failed",
      error: error.message,
    });
  }
};


export const jobDelete = async (req, res) => {
  try {
    const job = await jobmodel.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job deleted successfully",
      data: job,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Job deletion failed",
      error: error.message,
    });
  }
};