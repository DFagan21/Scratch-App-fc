const config = {
  s3: {
    REGION: "ap-southeast-2",
    BUCKET: "notes-api-uploads-fastcam"
  },
  apiGateway: {
    REGION: "ap-southeast-2",
    URL: "https://jbk6k3vcad.execute-api.ap-southeast-2.amazonaws.com/dev"
  },
  cognito: {
    REGION: "ap-southeast-2",
    USER_POOL_ID: "ap-southeast-2_d3ATAJIQA",
    APP_CLIENT_ID: "6nqan0b1s9ctm1ohnf36l0ki1s",
    IDENTITY_POOL_ID: "ap-southeast-2:0565a377-77e8-4d7b-a184-8a6539c20104"
  },
  MAX_ATTACHMENT_SIZE: 5000000
};

export default config;
