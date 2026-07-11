import { ACTIONS, ActionType, KeyboardLayout, Layer } from 'tangent-cc-lib';
import { ACTION_REPRESENTATION_ICON_MAP } from '../data/action-representation-icon-map';
import { ChordKey } from '../models/chord.models';

export function getChordKeyFromActionCode(
  actionCode: number,
  keyboardLayout: KeyboardLayout | null,
): ChordKey | null {
  if (!keyboardLayout) {
    return null;
  }
  const action = ACTIONS.find((a) => a.codeId === actionCode);
  if (action?.type === ActionType.WSK && action.keyCode) {
    const keyboardLayoutKey = keyboardLayout.layout[action.keyCode];
    const modifier = action.withShift ? 'withShift' : 'unmodified';
    const character = keyboardLayoutKey?.[modifier];
    if (character?.type !== 'text') {
      return null;
    }
    return { type: 'character', value: character.value };
  } else {
    const icon = ACTION_REPRESENTATION_ICON_MAP.get(actionCode);
    if (!icon) {
      return null;
    }
    return { type: 'icon', value: icon };
  }
}

export function getHoldKeys(
  layer: Layer,
  shiftKey: boolean,
  altGraphKey: boolean,
) {
  const holdKeys: ('num-shift' | 'fn' | 'flag-shift' | 'shift' | 'alt-gr')[] =
    [];
  switch (layer) {
    case Layer.Secondary:
      holdKeys.push('num-shift');
      break;
    case Layer.Tertiary:
      holdKeys.push('fn');
      break;
    case Layer.Quaternary:
      holdKeys.push('flag-shift');
  }
  if (shiftKey) {
    holdKeys.push('shift');
  }
  if (altGraphKey) {
    holdKeys.push('alt-gr');
  }
  return holdKeys;
}
