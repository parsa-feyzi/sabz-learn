import emailTest from "../RegEx/emailTest";
import telTest from "../RegEx/telTest";

const passwordValidator = (password?: string) => {
  if (!password?.length) {
    return "لطفا یک رمزعبور وارد کنید";
  } else if (password?.length <= 7) {
    return "رمزعبور باید بیشتر از 7 کاراکتر باشد";
  } else if (password?.length >= 20) {
    return "رمزعبور باید کمتر از 20 کاراکتر باشد";
  }
  return "";
};

const emailValidator = (email?: string) => {
  if (!email?.length) {
    return "لطفا یک ایمیل وارد کنید";
  } else if (!emailTest(email)) {
    return "ایمیل وارد شده معتبر نمیباشد";
  }
  return "";
};

const telValidator = (tel?: string) => {
  if (!tel?.length) {
    return "لطفا یک شماره مبایل وارد کنید";
  } else if (!telTest(tel)) {
    return "شماره وارد شده معتبر نمیباشد";
  }
  return "";
};

const userNameValidator = (userName?: string) => {
  if (!userName?.length) {
    return "لطفا یک نام کاربری وارد کنید";
  } else if (userName?.length <= 2) {
    return "نام کاربری باید بیشتر از 2 کاراکتر باشد";
  } else if (userName?.length >= 18) {
    return "نام کاربری باید کمتر از 18 کاراکتر باشد";
  }
  return "";
};

const fullNameValidator = (fullName?: string) => {
  if (!fullName?.length) {
    return "لطفا یک نام و نام‌خانوادگی وارد کنید";
  }
  return "";
};

const messageValidator = (message?: string) => {
  if (!message?.length) {
    return "لطفا پیغام خود را وارد کنید";
  }
  return "";
};

export {
  passwordValidator,
  emailValidator,
  telValidator,
  userNameValidator,
  fullNameValidator,
  messageValidator,
};
