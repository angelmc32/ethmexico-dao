import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_7BM2cKcWF",
  ClientId: "viqg3gjveepf8v6mt7hugrkic",
};

export default new CognitoUserPool(poolData);
