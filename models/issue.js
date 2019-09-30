const mongoose = require('mongoose');


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
    type: String,
    default: 'LOW',
    enum: ['LOW', 'MEDIUM', 'HIGH']
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