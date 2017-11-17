/* @flow */

import ConversationV1 from 'watson-developer-cloud/conversation/v1';
import config from '../../config';

const conversation = new ConversationV1({
  username: config.watson.conversation.username,
  password: config.watson.conversation.password,
  version_date: ConversationV1.VERSION_DATE_2016_09_20,
});

const message = (text: string, context?: Object): Promise<any> => {
  const payload = {
    workspace_id: config.watson.conversation.workspace,
    input: {
      text,
    },
    context,
  };
  return new Promise((resolve, reject) =>
    conversation.message(payload, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    }),
  );
};

export default message;
