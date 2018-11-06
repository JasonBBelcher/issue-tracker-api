require('../models/db');
const mongoose = require('mongoose');
const Issue = require('../models/issue');


exports.getUserIssues = function(req, res, next) {
  const parsedUser = req.user;

  Issue.find({ 'createdBy._id': parsedUser._id })
    .then(issues => {
      res.status(200).json(issues);
    })

    .catch(err => {
      next({
        status: 400,
        message: err.message
      });
    });
};

exports.getUserIssue = function(req, res, next) {
  const parsedUser = req.user;
  Issue.findById(req.params.id)
    .then(issue => {
      if (issue !== null) {
        if (issue.createdBy._id === parsedUser._id) {
          return res.status(200).json(issue);
        }
      }
    })

    .catch(err => {
      next({
        status: err.status,
        message: err.message
      });
    });
};

exports.getIssues = function(req, res, next) {
  Issue.find({})
    .then(issues => {
      res.status(200).json(issues);
    })

    .catch(err => {
      next({
        status: 400,
        message: err.message
      });
    });
};

exports.postIssue = function(req, res, next) {
  let parsedUser = req.user;
  const issueBody = Object.assign({}, req.body, {
    createdBy: parsedUser
  });

  Issue.create(issueBody)
    .then(issue => {
      res.status(201).json(issue);
    })
    .catch(err => {
      next({
        status: 400,
        message: err.message
      });
    });
};

exports.deleteIssue = function(req, res, next) {
  let parsedUser = req.user;
  Issue.findById(req.params.id)
    .then(issue => {
      if (issue.createdBy._id === parsedUser._id) {
        issue.remove();
        return res.status(200).json(issue);
      }
      return Promise.reject(
        new Error('You do not have permission to delete this issue.')
      );
    })
    .catch(err => {
      next({
        status: err || 400,
        message: err.message
      });
    });
};

exports.editIssue = function(req, res, next) {
  let parsedUser = req.user;
  const { title, responsible, description, severity, status } = req.body;
  Issue.findById(req.params.id)

    .exec()
    .then(issue => {
      if (issue !== null) {
        if (issue.createdBy._id === parsedUser._id) {
          issue.set(
            Object.assign({}, issue, {
              title,
              responsible,
              description,
              severity,
              status
            })
          );
          return issue.save();
        }
      }
      return Promise.reject(
        new Error('You do not have permission to edit this issue.')
      );
    })
    .then(savedIssue => {
      if (savedIssue) {
        return res.status(200).json(savedIssue);
      }
    })
    .catch(err => {
      next({
        status: err || 401,
        message: err.message
      });
    });
};
