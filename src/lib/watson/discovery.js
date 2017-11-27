/* @flow */

import DiscoveryV1 from 'watson-developer-cloud/discovery/v1';
import config from '../../config';

const discoverySDK = new DiscoveryV1({
  username: config.watson.discovery.username,
  password: config.watson.discovery.password,
  version_date: config.watson.discovery.version_date,
});

class Discovery {
  query = (
    query: string,
    filter?: string = '',
    aggregation?: string = '',
    count?: string = '10',
    returnFilter?: string = '',
  ): Promise<any> => {
    const payload = {
      environment_id: config.watson.discovery.environment,
      collection_id: config.watson.discovery.collection,
      query,
      filter,
      aggregation,
      count,
      return: returnFilter,
    };
    return new Promise((resolve, reject) =>
      discoverySDK.query(payload, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }),
    );
  };
  static getCollections = () => {
    const params = {
      environment_id: config.watson.discovery.environment,
    };
    return new Promise((resolve, reject) =>
      discoverySDK.getCollections(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }),
    );
  };
}

export default Discovery;
