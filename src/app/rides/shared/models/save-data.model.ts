import { Options } from './options.model';
import { Park } from './park.model';

export interface SaveData {
  options: Options;
  parks: Park[];
}
