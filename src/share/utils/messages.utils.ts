import { API_MESSAGES } from '../common/messages.const';
import { IMessageErr } from '../common/types.const';

export class MessageUtils {
  /**
   * Returns boolean by compare string message.
   */
  public static compareMessageByString = (message: string): boolean => {
    for (const [k, obj] of Object.entries(API_MESSAGES)) {
      for (const [key, value] of Object.entries(obj)) {
        if (value === message) {
          return true;
        }
      }
    }
    return false;
  };

  /**
   * Returns boolean by compare array message.
   */
  public static compareMessageByArr = (message: IMessageErr[]): boolean => {
    const mesFirst = message[0];
    for (const [k, obj] of Object.entries(API_MESSAGES)) {
      for (const [key, value] of Object.entries(obj)) {
        if (value === mesFirst.message) {
          return true;
        }
      }
    }
    return false;
  };
}
