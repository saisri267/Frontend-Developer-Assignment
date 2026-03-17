import FormSection from "./FormSection";
import PackageList from "./PackageList";
import styles from "../styles/OrderForm.module.css";

/**
 * The full order creation form.
 * All state is lifted to the parent page.
 */
export default function OrderForm({
  form,
  orderId,
  onFieldChange,
  onPackageChange,
  onAddPackage,
  onRemovePackage,
  onSubmit,
  onDiscard,
}) {
  function handleChange(path) {
    return (e) => onFieldChange(path, e.target.value);
  }

  function handleCheck(field) {
    return (e) => onFieldChange(field, e.target.checked);
  }

  return (
    <div className={styles.form}>
      {/* ── Shipment Details ── */}
      <FormSection title="Shipment Details" icon="📦" description="Basic shipment configuration">
        <div className={styles.grid2}>
          {/* Order ID (read-only) */}
          <div className={styles.fieldGroup}>
            <label htmlFor="orderId" className={styles.label}>Order ID</label>
            <div className={styles.readonlyField}>
              <span className={styles.readonlyValue}>{orderId}</span>
              <span className={styles.readonlyBadge}>Auto</span>
            </div>
          </div>

          {/* Shipment Date */}
          <div className={styles.fieldGroup}>
            <label htmlFor="shipmentDate" className={styles.label}>Shipment Date</label>
            <input
              id="shipmentDate"
              type="date"
              className={styles.input}
              value={form.shipmentDate}
              onChange={handleChange("shipmentDate")}
            />
          </div>
        </div>

        {/* Delivery Type Toggle */}
        <div className={styles.fieldGroup} style={{ marginTop: "16px" }}>
          <span className={styles.label}>Delivery Type</span>
          <div className={styles.deliveryTypeGroup} role="radiogroup" aria-label="Delivery type">
            <button
              type="button"
              role="radio"
              aria-checked={form.deliveryType === "standard"}
              className={[
                styles.deliveryBtn,
                form.deliveryType === "standard" ? styles.deliveryBtnActive : "",
              ].join(" ")}
              onClick={() => onFieldChange("deliveryType", "standard")}
            >
              <span className={styles.deliveryIcon}>🚚</span>
              <span className={styles.deliveryLabel}>Standard</span>
              <span className={styles.deliveryMeta}>3–5 days</span>
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={form.deliveryType === "express"}
              className={[
                styles.deliveryBtn,
                styles.deliveryBtnExpress,
                form.deliveryType === "express" ? styles.deliveryBtnExpressActive : "",
              ].join(" ")}
              onClick={() => onFieldChange("deliveryType", "express")}
            >
              <span className={styles.deliveryIcon}>⚡</span>
              <span className={styles.deliveryLabel}>Express</span>
              <span className={styles.deliveryMeta}>Next day</span>
            </button>
          </div>
        </div>
      </FormSection>

      {/* ── Sender ── */}
      <FormSection title="Sender (Consignor)" icon="📤" description="Origin / pickup location">
        <div className={styles.grid2}>
          <div className={[styles.fieldGroup, styles.spanFull].join(" ")}>
            <label htmlFor="senderName" className={styles.label}>Full Name</label>
            <input
              id="senderName"
              type="text"
              className={styles.input}
              value={form.sender.name}
              onChange={handleChange("sender.name")}
              placeholder="Sender's full name"
              autoComplete="name"
            />
          </div>
          <div className={[styles.fieldGroup, styles.spanFull].join(" ")}>
            <label htmlFor="senderAddress" className={styles.label}>Address</label>
            <input
              id="senderAddress"
              type="text"
              className={styles.input}
              value={form.sender.address}
              onChange={handleChange("sender.address")}
              placeholder="Street, building, locality"
              autoComplete="street-address"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="senderCity" className={styles.label}>City</label>
            <input
              id="senderCity"
              type="text"
              className={styles.input}
              value={form.sender.city}
              onChange={handleChange("sender.city")}
              placeholder="City"
              autoComplete="address-level2"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="senderPincode" className={styles.label}>Pincode</label>
            <input
              id="senderPincode"
              type="text"
              className={styles.input}
              value={form.sender.pincode}
              onChange={handleChange("sender.pincode")}
              placeholder="000000"
              maxLength={6}
              autoComplete="postal-code"
            />
          </div>
        </div>
      </FormSection>

      {/* ── Receiver ── */}
      <FormSection title="Receiver (Consignee)" icon="📥" description="Destination / delivery location">
        <div className={styles.grid2}>
          <div className={[styles.fieldGroup, styles.spanFull].join(" ")}>
            <label htmlFor="receiverName" className={styles.label}>Full Name</label>
            <input
              id="receiverName"
              type="text"
              className={styles.input}
              value={form.receiver.name}
              onChange={handleChange("receiver.name")}
              placeholder="Receiver's full name"
              autoComplete="name"
            />
          </div>
          <div className={[styles.fieldGroup, styles.spanFull].join(" ")}>
            <label htmlFor="receiverAddress" className={styles.label}>Address</label>
            <input
              id="receiverAddress"
              type="text"
              className={styles.input}
              value={form.receiver.address}
              onChange={handleChange("receiver.address")}
              placeholder="Street, building, locality"
              autoComplete="street-address"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="receiverCity" className={styles.label}>City</label>
            <input
              id="receiverCity"
              type="text"
              className={styles.input}
              value={form.receiver.city}
              onChange={handleChange("receiver.city")}
              placeholder="City"
              autoComplete="address-level2"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="receiverPincode" className={styles.label}>Pincode</label>
            <input
              id="receiverPincode"
              type="text"
              className={styles.input}
              value={form.receiver.pincode}
              onChange={handleChange("receiver.pincode")}
              placeholder="000000"
              maxLength={6}
              autoComplete="postal-code"
            />
          </div>
        </div>
      </FormSection>

      {/* ── Packages ── */}
      <FormSection
        title="Packages"
        icon="🗂️"
        description={`${form.packages.length} package${form.packages.length !== 1 ? "s" : ""} in this shipment`}
      >
        <PackageList
          packages={form.packages}
          onPackageChange={onPackageChange}
          onAddPackage={onAddPackage}
          onRemovePackage={onRemovePackage}
        />
      </FormSection>

      {/* ── Additional Options ── */}
      <FormSection title="Additional Options" icon="⚙️" description="Special handling and coverage">
        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel} htmlFor="isFragile">
            <input
              id="isFragile"
              type="checkbox"
              className={styles.checkbox}
              checked={form.isFragile}
              onChange={handleCheck("isFragile")}
            />
            <span className={styles.checkboxCustom} aria-hidden="true" />
            <span className={styles.checkboxContent}>
              <span className={styles.checkboxTitle}>
                <span>🔴</span> Fragile — Handle with Care
              </span>
              <span className={styles.checkboxDesc}>
                Shipment contains fragile or breakable items
              </span>
            </span>
          </label>

          <label className={styles.checkboxLabel} htmlFor="isInsured">
            <input
              id="isInsured"
              type="checkbox"
              className={styles.checkbox}
              checked={form.isInsured}
              onChange={handleCheck("isInsured")}
            />
            <span className={styles.checkboxCustom} aria-hidden="true" />
            <span className={styles.checkboxContent}>
              <span className={styles.checkboxTitle}>
                <span>🟢</span> Insurance Required
              </span>
              <span className={styles.checkboxDesc}>
                Add shipment insurance for declared value coverage
              </span>
            </span>
          </label>
        </div>
      </FormSection>

      {/* ── Submit ── */}
      <div className={styles.submitRow}>
        <button type="button" className={styles.cancelBtn} onClick={onDiscard}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          Discard
        </button>
        <button type="button" className={styles.submitBtn} onClick={onSubmit}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
            <path d="M1.5 7.5L6 12L13.5 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Create Shipment Order
        </button>
      </div>
    </div>
  );
}
