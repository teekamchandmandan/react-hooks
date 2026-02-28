import { useEffect, useState } from 'react';

export function useKeyPress(targetKey) {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === targetKey) setPressed(true);
    };

    const handleKeyUp = (e) => {
      if (e.key === targetKey) setPressed(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [targetKey]);

  return pressed;
}
