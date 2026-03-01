import { useEffect, useState } from 'react';

export function NarrativeResult({ text, onDismiss }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 300);
    }, 2800);
    return () => clearTimeout(t);
  }, [text]);

  return (
    <div className={`narrative-result ${visible ? 'show' : ''}`}>
      <p>{text}</p>
    </div>
  );
}
