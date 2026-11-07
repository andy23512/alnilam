import { TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { ChordWithChordKeys } from 'src/app/models/chord.models';
import { ChordPracticeStore } from 'src/app/stores/chord-practice.store';
import { VisibilitySettingStore } from 'src/app/stores/visibility-setting.store';
import { ACTIONS, ActionType, KeyLabel } from 'tangent-cc-lib';
import { ChordPracticeComponent } from './chord-practice.component';

function getActionCode(keyCode: string) {
  const action = ACTIONS.find(
    (a) => a.type === ActionType.WSK && a.keyCode === keyCode && !a.withShift,
  );
  if (!action) {
    throw new Error(`No action found for ${keyCode}`);
  }
  return action.codeId;
}

function collectCharacters(keyLabelMap: Record<number, KeyLabel[]>) {
  return new Set(
    Object.values(keyLabelMap).flatMap((ls) => ls.map((l) => l.c)),
  );
}

describe('ChordPracticeComponent key labels', () => {
  let component: ChordPracticeComponent;
  let visibilitySettingStore: InstanceType<typeof VisibilitySettingStore>;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [ChordPracticeComponent],
      providers: [provideTranslateService()],
    });
    TestBed.inject(ChordPracticeStore).setChords([
      {
        id: 'test',
        input: [getActionCode('KeyA'), getActionCode('KeyS')],
        output: [],
        inputKeys: [],
        outputKeys: [],
        outputText: '',
      } as ChordWithChordKeys,
    ]);
    visibilitySettingStore = TestBed.inject(VisibilitySettingStore);
    component = TestBed.createComponent(
      ChordPracticeComponent,
    ).componentInstance;
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should only label the keys used by the chords when allCharacterKeyLabels is off', () => {
    visibilitySettingStore.set('allCharacterKeyLabels', false);
    expect(collectCharacters(component.keyLabelMap())).toEqual(
      new Set(['a', 's']),
    );
  });

  it('should label every character of the keyboard layout when allCharacterKeyLabels is on', () => {
    visibilitySettingStore.set('allCharacterKeyLabels', true);
    const characters = collectCharacters(component.keyLabelMap());
    for (const c of ['a', 's', 'q', 'z', '1']) {
      expect(characters).toContain(c);
    }
  });

  it('should not add duplicated labels on a key when allCharacterKeyLabels is on', () => {
    visibilitySettingStore.set('allCharacterKeyLabels', true);
    for (const labels of Object.values(component.keyLabelMap())) {
      const identities = labels.map(
        (l) => `${l.c}|${l.layer}|${l.shiftKey}|${l.altGraphKey}`,
      );
      expect(new Set(identities).size).toBe(identities.length);
    }
  });
});
