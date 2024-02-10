const Issue = require("../../models/issueTracker");

module.exports.getAllIssues = async (req, res) => {
  try {
    const allIssues = await Issue.findAll();

    const response = allIssues.map(issue => ({
      id: issue.id,
      project_id: issue.project_id,
      issues: issue.issues,
      status_id: issue.status_id,
      created_at: issue.created_at,
      updated_at: issue.updated_at,
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports.getIssueById = async (req, res) => {
  const { id } = req.params;
  try {
    const issue = await Issue.findByPk(id);
    if (!issue) {
      res.status(404).json({ error: "Issue not found" });
    } else {
      res.json(issue);
    }
  } catch (error) {
    console.error("Error fetching issue by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
