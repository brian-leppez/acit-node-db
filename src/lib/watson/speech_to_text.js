/* @flow */

import fs from 'fs';
import SpeechToTextV1 from 'watson-developer-cloud/speech-to-text/v1';
import config from '../../config';

const speechToTextSDK = new SpeechToTextV1({
  username: config.watson.discovery.username,
  password: config.watson.discovery.password,
  version_date: config.watson.discovery.version_date,
});

class SpeechToText {
  recognize = (
    audioFilePath: string,
    contentType: string,
    model?: string,
    customizationId?: string,
    inactivityTimeout?: number,
    keywords?: string,
    keywordsThreshold?: number,
    maxAlternatives?: number,
    wordAlternativesThreshold?: number,
    wordConfidence?: number,
    timestamps?: boolean,
    profanityFilter?: boolean,
    smartFormatting?: boolean,
    speakerLabels?: boolean,
  ): Promise<any> => {
    const params = {
      audio: fs.createReadStream(audioFilePath),
      content_type: contentType,
      model,
      customization_id: customizationId,
      inactivity_timeout: inactivityTimeout,
      keywords,
      keywords_threshold: keywordsThreshold,
      max_alternatives: maxAlternatives,
      word_alternatives_threshold: wordAlternativesThreshold,
      word_confidence: wordConfidence,
      timestamps,
      profanity_filter: profanityFilter,
      smart_formatting: smartFormatting,
      speaker_labels: speakerLabels,
    };
    return new Promise((resolve, reject) =>
      speechToTextSDK.recognize(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }),
    );
  };
}

export default SpeechToText;
