"use client";
import { useEffect } from "react";
import styles from "../styles/Toast.module.css";

/**
 * Auto-dismissing success toast shown after shipment creation.
 */
export default function Toast({ isVisible, orderId, onClose }) {
  useEffect(() => {
    if (!isVisible) return;
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className={styles.toast} role="status" aria-live="polite">
      <div className={styles.iconWrap}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <circle cx="9" cy="9" r="8.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className={styles.body}>
        <p className={styles.heading}>Shipment Created!</p>
        <p className={styles.sub}>Order <span className={styles.id}>{orderId}</span> is live.</p>
      </div>
      <button className={styles.closeBtn} onClick={onClose} aria-label="Dismiss notification">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
      <div className={styles.progress} />
    </div>
  );
}
