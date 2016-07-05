'use strict';
/**
 * 基于网易邮箱的邮件发送服务实现
 *
 */

var nodemailer  = require("nodemailer");
var config_mail_netease;

exports.initConfig = function(config) {
  config_mail_netease = config;
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
  // var sendMails=toAdress.split(';');
  // TODO : 如果没有配置过，要抛出异常
  var adresses= getAddressesStr(addresses_array);
  console.log('adresses : ' + adresses);
  var smtpTransport = createSmtpTransport(nodemailer);
  var send_info=msg+'<br>';
  smtpTransport.sendMail({
    from    : fromwho+' <' + config_mail_netease.mail_acount + '>',
    to      : adresses,
    subject : title,
    html    : send_info
  }, function(err, res) {
      if(err){
        console.log('mail_send_error : ' + err);
        callback(err);
      }else{
        callback(null);
      }
  });
}

exports.sendMail = sendMail;

function createSmtpTransport(nodemailer) {
  var params = {
      host: config_mail_netease.smtp_host,
      secureConnection: true, // use SSL
      port: config_mail_netease.smtp_port, // port for secure SMTP
      auth: {
        user: config_mail_netease.mail_acount,
        pass: config_mail_netease.pass
      }
  };
  return nodemailer.createTransport("SMTP", params);
}

function getAddressesStr(addresses_array) {
  var adresses="";
  for(var i=0;i<addresses_array.length;i++){
    if(i<addresses_array.length-1){
        adresses+='<'+addresses_array[i]+'>,';
    }else{
        adresses+='<'+addresses_array[i]+'>';
    }
  }
  return adresses;
}
