import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";

const PK = 'your_channel_address_private_key'; // channel address private key
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);

export const getMessages = async (groupId) => {
  const user = await PushAPI.user.get({
    account: `eip155:${signer.address}`,
    env: 'staging'
  });

  // Fetch messages for the group
  const chats = await PushAPI.chat.history({
    threadhash: groupId,
    account: `eip155:${signer.address}`,
    limit: 30,
    toDecrypt: true,
    env: 'staging'
  });

  return chats;
};

export const sendMessage = async (groupId, message) => {
  await PushAPI.chat.send({
    messageContent: message,
    messageType: 'Text',
    receiverAddress: groupId,
    signer: signer,
    env: 'staging'
  });
};

// Add more functions for creating groups, joining groups, etc.