const express = require('express');
const router = express.Router();
const {
  getIssues,
  postIssue,
  editIssue,
  deleteIssue,
  getUserIssues,
  getUserIssue
} = require('../handlers/issues');

router.get('/user', getUserIssues); // this will only pull issues owned by the user.
router.get('/user/:id', getUserIssue); // will only pull the issue if you are the owner
router.post('/user', postIssue); // post an issue tagged with our user id
router.delete('/user/:id', deleteIssue); // delete only allowed if you are the creator of the issue post
router.patch('/user/:id', editIssue); // edit only allowed if you are the creator of the issue
router.get('/', getIssues); // all issues (public route)

module.exports = router;
