import { Options } from './options.model';
import { Park } from './park.model';

export interface SaveData {
  appVersion: string;
  options: Options;
  parks: Park[];
}
