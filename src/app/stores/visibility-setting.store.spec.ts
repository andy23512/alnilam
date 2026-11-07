import { TestBed } from '@angular/core/testing';
import { prefixStorageKey } from '../utils/store.utils';
import { VisibilitySettingStore } from './visibility-setting.store';

describe('VisibilitySettingStore', () => {
  const storageKey = prefixStorageKey('visibilitySetting');

  beforeEach(() => {
    localStorage.clear();
    TestBed.resetTestingModule();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should show all character key labels by default', () => {
    const store = TestBed.inject(VisibilitySettingStore);
    expect(store.allCharacterKeyLabels()).toBeTrue();
  });

  it('should toggle allCharacterKeyLabels without touching other settings', () => {
    const store = TestBed.inject(VisibilitySettingStore);
    store.set('allCharacterKeyLabels', false);
    expect(store.allCharacterKeyLabels()).toBeFalse();
    expect(store.layout()).toBeTrue();
    expect(store.entryErrorTooltip()).toBeTrue();
  });

  it('should default allCharacterKeyLabels to true for settings saved before it existed', () => {
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        layout: false,
        comboCounter: true,
        speedometer: true,
        entryErrorTooltip: true,
      }),
    );
    const store = TestBed.inject(VisibilitySettingStore);
    expect(store.allCharacterKeyLabels()).toBeTrue();
    expect(store.layout()).toBeFalse();
  });

  it('should keep a saved allCharacterKeyLabels value', () => {
    localStorage.setItem(
      storageKey,
      JSON.stringify({ allCharacterKeyLabels: false }),
    );
    const store = TestBed.inject(VisibilitySettingStore);
    expect(store.allCharacterKeyLabels()).toBeFalse();
  });
});
