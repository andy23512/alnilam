import { Injectable } from '@angular/core';
import {
  CHARACHORDER_DEVICE_PORTS,
  CharaChorderDevice,
  SerialPortHandler
} from 'tangent-cc-lib';

export const CHARACHORDER_LITE_DEVICE_PORTS = new Map(
  [CharaChorderDevice.LiteM0, CharaChorderDevice.LiteS2].map((device) => [
    device,
    CHARACHORDER_DEVICE_PORTS.get(device) as SerialPortFilter,
  ]),
);

@Injectable({ providedIn: 'root' })
export class SerialPortHandlerService extends SerialPortHandler {
  constructor() {
    super(false, CHARACHORDER_LITE_DEVICE_PORTS);
  }
}
