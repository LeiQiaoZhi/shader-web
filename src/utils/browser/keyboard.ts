import {useEffect} from 'react';

export const useKeyboardShortcut = (
    key: string,
    modifiers: { ctrl?: boolean; shift?: boolean; alt?: boolean; meta?: boolean },
    callback: () => void
) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const {ctrl = false, shift = false, alt = false, meta = false} = modifiers;

            if (
                event.key === key &&
                event.ctrlKey === ctrl &&
                event.shiftKey === shift &&
                event.altKey === alt &&
                event.metaKey === meta
            ) {
                callback();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [key, modifiers, callback]);
};
