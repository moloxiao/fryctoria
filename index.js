'use strict';

var that = {};

var mail_service = require('./mail/mail_service');

that.initMailConfig = function(mailConfig) {
  mail_service.initConfig(mailConfig);
}

that.getMailService = function() {
  return mail_service;
}

module.exports = that;
