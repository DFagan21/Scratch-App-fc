const config = {
  s3: {
    REGION: "ap-southeast-2",
    BUCKET: "notes-api-uploads-fastcam"
  },
  apiGateway: {
    REGION: "ap-southeast-2",
    URL: "https://5nzpjs7rpg.execute-api.ap-southeast-2.amazonaws.com/dev"
  },
  cognito: {
    REGION: "ap-southeast-2",
    USER_POOL_ID: "ap-southeast-2_xi8KBEoRx",
    APP_CLIENT_ID: "2anh4csg8e1uu3fgsql9jb60v3",
    IDENTITY_POOL_ID: "ap-southeast-2:900cb3ec-909b-4a8a-8310-e7f4325248ea"
  },
  MAX_ATTACHMENT_SIZE: 5000000
};

export default config;
