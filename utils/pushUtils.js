import { PushAPI, CONSTANTS } from '@pushprotocol/restapi';

export const initializePushUser = async (signer) => {
  try {
    const user = await PushAPI.initialize(signer, { env: CONSTANTS.ENV.STAGING });
    // Store only the necessary information
    const userInfo = {
      account: user.account,
      env: CONSTANTS.ENV.STAGING
    };
    localStorage.setItem('pushUserInfo', JSON.stringify(userInfo));
    return user;
  } catch (error) {
    console.error("Error initializing Push user:", error);
    throw error;
  }
};

export const getPushUserFromStorage = async (signer) => {
  const userInfoString = localStorage.getItem('pushUserInfo');
  if (userInfoString) {
    const userInfo = JSON.parse(userInfoString);
    // Recreate the PushAPI instance
    return await PushAPI.initialize(signer, { env: userInfo.env, account: userInfo.account });
  }
  return null;
};

export const clearPushUserFromStorage = () => {
  localStorage.removeItem('pushUserInfo');
};
