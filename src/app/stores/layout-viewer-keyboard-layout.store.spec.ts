import { TestBed } from '@angular/core/testing';
import { KEYBOARD_LAYOUTS } from '../data/keyboard-layouts';
import { LayoutViewerKeyboardLayoutStore } from './layout-viewer-keyboard-layout.store';

describe('LayoutViewerKeyboardLayoutStore', () => {
  function create() {
    TestBed.resetTestingModule();
    localStorage.clear();
    return TestBed.inject(LayoutViewerKeyboardLayoutStore);
  }

  afterEach(() => localStorage.clear());

  it('starts with the US layout selected', () => {
    const store = create();
    expect(store.selectedId()).toBe('us');
    expect(store.selectedEntity().id).toBe('us');
  });

  it('selects another layout', () => {
    const store = create();
    const other = KEYBOARD_LAYOUTS.find((l) => l.id !== 'us')!;
    store.setSelectedId(other.id);
    expect(store.selectedEntity().id).toBe(other.id);
  });

  it('falls back to the US layout when the saved layout id no longer exists, and keeps the id', () => {
    const store = create();
    store.setSelectedId('no-such-layout');
    expect(store.selectedEntity().id).toBe('us');
    expect(store.selectedId()).toBe('no-such-layout');
    expect(() => store.hasDeadKey()).not.toThrow();
    expect(store.hasDeadKey()).toBe(false);
  });

  it('uses the saved layout again once its id is in the list', () => {
    const store = create();
    const other = KEYBOARD_LAYOUTS.find((l) => l.id !== 'us')!;
    store.setSelectedId('no-such-layout');
    store.setSelectedId(other.id);
    expect(store.selectedEntity().id).toBe(other.id);
  });
});
