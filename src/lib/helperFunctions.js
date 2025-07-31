export const generateOTP = () => {
  const otp = Math.floor(10000 + Math.random() * 900000).toString();
  return otp;
};
