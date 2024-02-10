const Issue = require("../../models/issueTracker");

module.exports.store = async (req, res) => {
  try {
    const { project_id, issues, status_id } = req.body;

    const newIssue = await Issue.create({
      project_id,
      issues: issues,
      status_id,
    });

    const response = {
      id: newIssue.id,
      project_id: newIssue.project_id,
      issues: newIssue.issues,
      status_id: newIssue.status_id,
    };

    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


