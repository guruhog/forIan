const S3_LINK = 'https://mebchat.s3.eu-central-1.amazonaws.com';

const prod = {
  url: {
    AUTH_API: 'https://auth-server-ag.statwb.eu.novartis.net',
    BACKEND_API: 'https://backend-server-ag.statwb.eu.novartis.net',
    S3_LINK,
    UPLOAD_API: 'https://upload-server-ag.statwb.eu.novartis.net/upload',
    GET_IP_API: 'https://get-ip-ag.statwb.eu.novartis.net',
    SSO_LINK: 'https://auth-server-ag.statwb.eu.novartis.net/auth/ssoLogin',
    SSO_LINK_ERR: 'https://auth-server-ag.statwb.eu.novartis.net/auth/ssoLoginError'
  }
};

const dev = {
  url: {
    AUTH_API: 'http://localhost:5000',
    BACKEND_API: 'http://localhost:4000',
    S3_LINK,
    UPLOAD_API: 'http://localhost:3535/upload',
    GET_IP_API: '',
    SSO_LINK: 'http://localhost:5000/auth/ssoLogin',
    SSO_LINK_ERR: 'http://localhost:5000/auth/ssoLoginError'
  }
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
