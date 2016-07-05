'use strict';
/**
 * 邮件发送服务
 *
 */

var netease_impl = require('./impl/netease_impl.js');

exports.initConfig = function(config) {
  netease_impl.initConfig(config);
}

/**
 * 发送1封邮件给N个人(目前不支持CC)
 *
 * @param   {String}   title            邮件标题
 * @param   {String}   msg              邮件正文
 * @param   {String}   fromwho          发送人描述(实际均为同一个邮箱发出，但用户名可以填写不同的类型)
 * @param   {Array}   addresses_array   收件人列表
 * @param   {Function} callback         回调函数
 * @return  {Void}
 */
function sendMail(title, msg, fromwho, addresses_array, callback){
   netease_impl.sendMail(title, msg, fromwho, addresses_array, callback);
}

exports.sendMail = sendMail;
