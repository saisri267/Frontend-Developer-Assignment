import Badge from "./Badge";
import { calculateTotals, formatCurrency } from "../utils/calculateTotals";
import styles from "../styles/Preview.module.css";

/**
 * Live shipment summary preview panel.
 * Renders a real-time visual summary of the current order form state.
 */
export default function ShipmentPreview({ form, orderId }) {
  const { totalPackages, totalWeight, totalDeclaredValue } = calculateTotals(form.packages);

  const displayDate = form.shipmentDate
    ? new Date(form.shipmentDate + "T00:00:00").toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <div className={styles.preview}>
      {/* Preview Header */}
      <div className={styles.previewHeader}>
        <div className={styles.previewHeaderLeft}>
          <span className={styles.liveIndicator} aria-hidden="true">
            <span className={styles.liveDot} />
          </span>
          <span className={styles.liveLabel}>Live Preview</span>
        </div>
        <Badge variant={form.deliveryType === "express" ? "express" : "standard"} size="md">
          {form.deliveryType === "express" ? "⚡ Express" : "🚚 Standard"}
        </Badge>
      </div>

      {/* Order Meta */}
      <div className={styles.orderMeta}>
        <div className={styles.orderMetaRow}>
          <span className={styles.metaKey}>Order ID</span>
          <span className={styles.metaOrderId}>{orderId}</span>
        </div>
        <div className={styles.orderMetaRow}>
          <span className={styles.metaKey}>Shipment Date</span>
          <span className={styles.metaValue}>{displayDate}</span>
        </div>
      </div>

      <div className={styles.divider} />

      {/* Sender → Receiver Route */}
      <div className={styles.route}>
        <div className={styles.routeParty}>
          <span className={styles.routePartyRole}>FROM</span>
          <span className={styles.routePartyName}>
            {form.sender.name || <span className={styles.empty}>Sender name</span>}
          </span>
          <span className={styles.routePartyAddr}>
            {[form.sender.address, form.sender.city, form.sender.pincode]
              .filter(Boolean)
              .join(", ") || <span className={styles.empty}>Address</span>}
          </span>
        </div>

        <div className={styles.routeArrow} aria-hidden="true">
          <div className={styles.routeLine} />
          <div className={styles.routeArrowHead}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7.5" stroke="var(--border-default)" />
              <path d="M5 8H11M11 8L8.5 5.5M11 8L8.5 10.5" stroke="var(--text-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div className={styles.routeParty}>
          <span className={styles.routePartyRole}>TO</span>
          <span className={styles.routePartyName}>
            {form.receiver.name || <span className={styles.empty}>Receiver name</span>}
          </span>
          <span className={styles.routePartyAddr}>
            {[form.receiver.address, form.receiver.city, form.receiver.pincode]
              .filter(Boolean)
              .join(", ") || <span className={styles.empty}>Address</span>}
          </span>
        </div>
      </div>

      <div className={styles.divider} />

      {/* Package Cards */}
      <div className={styles.packagesSection}>
        <div className={styles.sectionLabel}>
          <span>Packages</span>
          <span className={styles.packageCount}>{totalPackages}</span>
        </div>
        <div className={styles.packageCards}>
          {form.packages.map((pkg, index) => (
            <div key={pkg.id} className={styles.packageCard}>
              <div className={styles.packageCardHeader}>
                <span className={styles.packageCardIndex}>{index + 1}</span>
                <span className={styles.packageCardLabel}>
                  {pkg.label && pkg.label.trim()
                    ? pkg.label
                    : <span className={styles.empty}>Unnamed package</span>}
                </span>
              </div>
              <div className={styles.packageCardStats}>
                <div className={styles.packageStat}>
                  <span className={styles.packageStatKey}>Weight</span>
                  <span className={styles.packageStatVal}>
                    {pkg.weight ? `${pkg.weight} kg` : "—"}
                  </span>
                </div>
                <div className={styles.packageStat}>
                  <span className={styles.packageStatKey}>Dimensions</span>
                  <span className={styles.packageStatVal}>
                    {pkg.length && pkg.width && pkg.height
                      ? `${pkg.length}×${pkg.width}×${pkg.height} cm`
                      : "—"}
                  </span>
                </div>
                <div className={styles.packageStat}>
                  <span className={styles.packageStatKey}>Value</span>
                  <span className={styles.packageStatVal}>
                    {pkg.declaredValue ? formatCurrency(pkg.declaredValue) : "—"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.divider} />

      {/* Totals */}
      <div className={styles.totals}>
        <div className={styles.totalRow}>
          <span className={styles.totalKey}>Total Packages</span>
          <span className={styles.totalVal}>{totalPackages}</span>
        </div>
        <div className={styles.totalRow}>
          <span className={styles.totalKey}>Total Weight</span>
          <span className={styles.totalVal}>
            {totalWeight > 0 ? `${totalWeight} kg` : "—"}
          </span>
        </div>
        <div className={[styles.totalRow, styles.totalRowHighlight].join(" ")}>
          <span className={styles.totalKey}>Total Declared Value</span>
          <span className={styles.totalValLarge}>
            {totalDeclaredValue > 0 ? formatCurrency(totalDeclaredValue) : "—"}
          </span>
        </div>
      </div>

      {/* Flags */}
      {(form.isFragile || form.isInsured) && (
        <>
          <div className={styles.divider} />
          <div className={styles.flags}>
            {form.isFragile && (
              <Badge variant="fragile" size="md">
                🔴 Fragile
              </Badge>
            )}
            {form.isInsured && (
              <Badge variant="insured" size="md">
                🟢 Insured
              </Badge>
            )}
          </div>
        </>
      )}

      {/* Footer stamp */}
      <div className={styles.previewFooter}>
        <span className={styles.footerStamp}>LogiX Shipment Summary</span>
        <span className={styles.footerVersion}>v1.0</span>
      </div>
    </div>
  );
}
