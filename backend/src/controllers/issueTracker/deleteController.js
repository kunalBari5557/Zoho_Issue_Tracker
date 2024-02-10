const Issue = require("../../models/issueTracker");


module.exports.destroy = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedRowCount = await Issue.destroy({ where: { id } });
      if (deletedRowCount === 0) {
        res.status(404).json({ error: 'Issue not found' });
      } else {
        res.json({ message: 'Issue deleted successfully' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };