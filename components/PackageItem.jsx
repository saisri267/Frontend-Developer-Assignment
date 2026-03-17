import styles from "../styles/Package.module.css";

/**
 * A single editable package row inside the PackageList.
 * Includes a dedicated Package Name field in the form body.
 */
export default function PackageItem({ pkg, index, onChange, onRemove, canRemove }) {
  function handle(field) {
    return (e) => onChange(pkg.id, field, e.target.value);
  }

  const displayName = pkg.label && pkg.label.trim() ? pkg.label : `Package ${index + 1}`;

  return (
    <div className={styles.packageItem}>
      {/* ── Header: number badge + live name display + remove ── */}
      <div className={styles.packageHeader}>
        <div className={styles.packageIndex}>
          <span className={styles.packageIndexNum}>{index + 1}</span>
        </div>
        <span className={styles.packageHeaderName}>{displayName}</span>
        {canRemove && (
          <button
            type="button"
            className={styles.removeBtn}
            onClick={() => onRemove(pkg.id)}
            aria-label={`Remove package ${index + 1}`}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      <div className={styles.packageBody}>
        {/* ── Row 1: Package Name (full width) ── */}
        <div className={[styles.fieldGroup, styles.fieldGroupFull].join(" ")}>
          <label htmlFor={`label-${pkg.id}`} className={styles.fieldLabel}>
            Package Label
          </label>
          <input
            id={`label-${pkg.id}`}
            className={styles.fieldInput}
            type="text"
            value={pkg.label}
            onChange={handle("label")}
            placeholder={`e.g. Electronics Box, Fragile Glass, Document Folder…`}
            aria-label={`Package ${index + 1} name`}
            maxLength={80}
          />
        </div>

        {/* ── Row 2: Weight + Declared Value ── */}
        <div className={styles.packageGrid}>
          {/* Weight */}
          <div className={styles.fieldGroup}>
            <label htmlFor={`weight-${pkg.id}`} className={styles.fieldLabel}>
              Weight
            </label>
            <div className={styles.inputWrapper}>
              <input
                id={`weight-${pkg.id}`}
                className={styles.fieldInput}
                type="number"
                min="0"
                step="0.1"
                value={pkg.weight}
                onChange={handle("weight")}
                placeholder="0.0"
                aria-label={`Package ${index + 1} weight in kg`}
              />
              <span className={styles.inputUnit}>kg</span>
            </div>
          </div>

          {/* Declared Value */}
          <div className={styles.fieldGroup}>
            <label htmlFor={`value-${pkg.id}`} className={styles.fieldLabel}>
              Declared Value
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputPrefix}>₹</span>
              <input
                id={`value-${pkg.id}`}
                className={[styles.fieldInput, styles.withPrefix].join(" ")}
                type="number"
                min="0"
                value={pkg.declaredValue}
                onChange={handle("declaredValue")}
                placeholder="0"
                aria-label={`Package ${index + 1} declared value in rupees`}
              />
            </div>
          </div>
        </div>

        {/* ── Row 3: Dimensions ── */}
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>
            Dimensions
            <span className={styles.fieldLabelHint}>(L × W × H)</span>
          </label>
          <div className={styles.dimensionsRow}>
            <div className={styles.dimField}>
              <label htmlFor={`length-${pkg.id}`} className={styles.srOnly}>Length cm</label>
              <input
                id={`length-${pkg.id}`}
                className={styles.fieldInput}
                type="number"
                min="0"
                value={pkg.length}
                onChange={handle("length")}
                placeholder="Length"
                aria-label={`Package ${index + 1} length in cm`}
              />
            </div>
            <span className={styles.dimSep}>×</span>
            <div className={styles.dimField}>
              <label htmlFor={`width-${pkg.id}`} className={styles.srOnly}>Width cm</label>
              <input
                id={`width-${pkg.id}`}
                className={styles.fieldInput}
                type="number"
                min="0"
                value={pkg.width}
                onChange={handle("width")}
                placeholder="Width"
                aria-label={`Package ${index + 1} width in cm`}
              />
            </div>
            <span className={styles.dimSep}>×</span>
            <div className={styles.dimField}>
              <label htmlFor={`height-${pkg.id}`} className={styles.srOnly}>Height cm</label>
              <input
                id={`height-${pkg.id}`}
                className={styles.fieldInput}
                type="number"
                min="0"
                value={pkg.height}
                onChange={handle("height")}
                placeholder="Height"
                aria-label={`Package ${index + 1} height in cm`}
              />
            </div>
            <span className={styles.inputUnit}>cm</span>
          </div>
        </div>
      </div>
    </div>
  );
}
