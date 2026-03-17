import styles from "../styles/Badge.module.css";

/**
 * Reusable badge component for status indicators.
 * variant: "express" | "standard" | "fragile" | "insured" | "neutral"
 */
export default function Badge({ children, variant = "neutral", size = "md" }) {
  return (
    <span
      className={[
        styles.badge,
        styles[variant],
        styles[size],
      ].join(" ")}
    >
      {children}
    </span>
  );
}
