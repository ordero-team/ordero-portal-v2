declare let window: {
  ClipboardSource: HTMLTextAreaElement;
};

export function copy(value: any) {
  if (typeof value === 'object' || Array.isArray(value)) {
    value = JSON.stringify(value, null, 2);
  }

  if (!window.ClipboardSource) {
    window.ClipboardSource = document.createElement('textarea') as HTMLTextAreaElement;
    window.ClipboardSource.style.position = 'fixed';
    window.ClipboardSource.style.left = '0';
    window.ClipboardSource.style.top = '0';
    window.ClipboardSource.style.opacity = '0';
    window.ClipboardSource.style.zIndex = '-1';
    window.ClipboardSource.style.transform = 'translate3d(-100%, -100%, 0)';

    document.body.appendChild(window.ClipboardSource);
  }

  const { ClipboardSource } = window;

  try {
    ClipboardSource.value = value;
    ClipboardSource.focus();
    ClipboardSource.select();

    document.execCommand('copy');
  } catch (error) {
    throw error;
  }
}
