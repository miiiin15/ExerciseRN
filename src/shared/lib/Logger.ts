
import Config from 'react-native-config';

const Logger = {
  debug: (message?: any, ...optionalParams: any[]) => {
    if (Config.MODE === 'DEBUG') {
      console.debug("🟢 ",message, ':', JSON.stringify(optionalParams, null, 2));
    }
  },
};

export default Logger;
