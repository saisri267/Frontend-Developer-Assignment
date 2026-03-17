import styles from "../styles/FormSection.module.css";

/**
 * A labeled section wrapper used inside the order form.
 */
export default function FormSection({ title, description, icon, children }) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
        <div className={styles.headerText}>
          <h2 className={styles.title}>{title}</h2>
          {description && (
            <p className={styles.description}>{description}</p>
          )}
        </div>
      </div>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
