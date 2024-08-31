import { ReCAPTCHA, ReCAPTCHAProps } from "react-google-recaptcha";

const RECAPTCHA_SITE_KEY = import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY || "";

function Captcha() {
  console.error({
    RECAPTCHA_SITE_KEY,
  });

  return <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} />;
}

export default Captcha;
