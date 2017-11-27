/* @flow */

import ConversationV1 from 'watson-developer-cloud/conversation/v1';
import config from '../../config';

// Initialize IBM's Conversation Service SDK.
const conversationSDK = new ConversationV1({
  username: config.watson.conversation.username,
  password: config.watson.conversation.password,
  version_date: ConversationV1.VERSION_DATE_2016_09_20,
});

// Conversation class that holds all operations about Watson Conversation.
// Add more functions about Conversation here!!
class Conversation {
  message = (text: string, context?: Object): Promise<any> => {
    const payload = {
      workspace_id: config.watson.conversation.workspace,
      input: {
        text,
      },
      context,
    };
    return new Promise((resolve, reject) =>
      conversationSDK.message(payload, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }),
    );
  };
  static getWorkspace = () => {
    const params = {
      workspace_id: config.watson.conversation.workspace,
      export: true,
    };
    return new Promise((resolve, reject) =>
      conversationSDK.getWorkspace(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }),
    );
  };
}

export default Conversation;
