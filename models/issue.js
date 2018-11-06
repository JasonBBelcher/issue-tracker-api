const mongoose = require('mongoose');
const ensureCorrectUser = require('../middleware/ensureCorrectUser');

const IssueSchema = new mongoose.Schema({
  title: {
    type: String
  },
  responsible: {
    type: String
  },
  description: {
    type: String
  },
  severity: {
    type: String
  },
  status: {
    type: String,
    default: 'OPEN',
    enum: ['OPEN', 'CLOSED']
  },
  createdBy: {
    type: Object,
    required: true
  }
});

const Issue = mongoose.model('Issue', IssueSchema);
module.exports = Issue;
