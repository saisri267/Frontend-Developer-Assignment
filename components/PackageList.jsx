import PackageItem from "./PackageItem";
import styles from "../styles/Package.module.css";

/**
 * Renders the list of packages with add/remove controls.
 */
export default function PackageList({ packages, onPackageChange, onAddPackage, onRemovePackage }) {
  return (
    <div className={styles.packageList}>
      <div className={styles.packageItems}>
        {packages.map((pkg, index) => (
          <PackageItem
            key={pkg.id}
            pkg={pkg}
            index={index}
            onChange={onPackageChange}
            onRemove={onRemovePackage}
            canRemove={packages.length > 1}
          />
        ))}
      </div>

      <button
        type="button"
        className={styles.addPackageBtn}
        onClick={onAddPackage}
        aria-label="Add another package"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        Add Package
      </button>
    </div>
  );
}
