'use client';

import { useCallback, useRef, useEffect, MouseEventHandler } from 'react';
import { useRouter } from 'next/navigation';

export default function ModalWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const close = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (
        e.target === overlay.current ||
        e.target === wrapper.current ||
        e.target === close.current
      ) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper, close]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  if (!overlay) {
    return <div></div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-[6px] rounded-xl max-w-md w-full relative">
        {children}
      </div>
    </div>
  );
}
