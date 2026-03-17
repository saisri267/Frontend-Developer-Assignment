"use client";
import { useEffect, useRef } from "react";
import styles from "../styles/Modal.module.css";

/**
 * Reusable accessible modal dialog.
 * variant: "success" | "confirm" | "warning"
 */
export default function Modal({
  isOpen,
  onClose,
  variant = "confirm",
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  children,
}) {
  const overlayRef = useRef(null);
  const firstBtnRef = useRef(null);

  /* Lock body scroll while open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => firstBtnRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* Close on Escape */
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && isOpen) onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) onClose();
  }

  const icons = {
    success: (
      <div className={[styles.iconRing, styles.iconRingSuccess].join(" ")}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path d="M5 14L11 20L23 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
    confirm: (
      <div className={[styles.iconRing, styles.iconRingConfirm].join(" ")}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path d="M14 9V15M14 19H14.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    ),
    warning: (
      <div className={[styles.iconRing, styles.iconRingWarning].join(" ")}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path d="M14 9V15M14 19H14.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M12.13 4.5L2.68 20a2 2 0 001.72 3h19.2a2 2 0 001.72-3L15.87 4.5a2 2 0 00-3.74 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
  };

  return (
    <div
      ref={overlayRef}
      className={[styles.overlay, isOpen ? styles.overlayVisible : ""].join(" ")}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={[styles.dialog, styles[`dialog_${variant}`]].join(" ")}>
        {/* Close button */}
        {variant !== "success" && (
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close dialog">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        )}

        {/* Icon */}
        <div className={styles.iconWrap}>{icons[variant]}</div>

        {/* Content */}
        <div className={styles.content}>
          <h2 id="modal-title" className={styles.title}>{title}</h2>
          {message && <p className={styles.message}>{message}</p>}
          {children}
        </div>

        {/* Actions */}
        <div className={[styles.actions, variant === "success" ? styles.actionsCenter : ""].join(" ")}>
          {variant === "success" ? (
            <button
              ref={firstBtnRef}
              className={[styles.btn, styles.btnPrimary].join(" ")}
              onClick={onClose}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7L5.5 11.5L13 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Done
            </button>
          ) : (
            <>
              <button
                className={[styles.btn, styles.btnGhost].join(" ")}
                onClick={onClose}
              >
                {cancelLabel}
              </button>
              <button
                ref={firstBtnRef}
                className={[
                  styles.btn,
                  variant === "warning" ? styles.btnDanger : styles.btnPrimary,
                ].join(" ")}
                onClick={() => { onConfirm?.(); }}
              >
                {confirmLabel}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
