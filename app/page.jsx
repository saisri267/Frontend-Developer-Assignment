"use client";

import { useState, useCallback, useEffect } from "react";
import { generateOrderId } from "../utils/generateOrderId";
import OrderForm from "../components/OrderForm";
import ShipmentPreview from "../components/ShipmentPreview";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import Toast from "../components/Toast";
import styles from "../styles/Layout.module.css";

const TODAY = new Date().toISOString().split("T")[0];

function createEmptyPackage(index = 0) {
  return {
    id: `pkg-${Date.now()}-${index}`,
    label: `Package ${index + 1}`,
    weight: "",
    length: "",
    width: "",
    height: "",
    declaredValue: "",
  };
}

function createFreshForm() {
  return {
    shipmentDate: TODAY,
    deliveryType: "standard",
    sender: { name: "", address: "", city: "", pincode: "" },
    receiver: { name: "", address: "", city: "", pincode: "" },
    packages: [createEmptyPackage(0)],
    isFragile: false,
    isInsured: false,
  };
}

export default function HomePage() {
  /* ── Theme ── */
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = typeof window !== "undefined"
      ? localStorage.getItem("logix-theme")
      : null;
    if (saved === "dark" || saved === "light") setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("logix-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }, []);

  /* ── Order ID ── */
  const [orderId, setOrderId] = useState(() => generateOrderId());

  /* ── Form state ── */
  const [form, setForm] = useState(createFreshForm);

  const updateField = useCallback((path, value) => {
    setForm((prev) => {
      const next = { ...prev };
      if (path.startsWith("sender.")) {
        next.sender = { ...prev.sender, [path.slice(7)]: value };
      } else if (path.startsWith("receiver.")) {
        next.receiver = { ...prev.receiver, [path.slice(9)]: value };
      } else {
        next[path] = value;
      }
      return next;
    });
  }, []);

  const updatePackage = useCallback((id, field, value) => {
    setForm((prev) => ({
      ...prev,
      packages: prev.packages.map((pkg) =>
        pkg.id === id ? { ...pkg, [field]: value } : pkg
      ),
    }));
  }, []);

  const addPackage = useCallback(() => {
    setForm((prev) => ({
      ...prev,
      packages: [...prev.packages, createEmptyPackage(prev.packages.length)],
    }));
  }, []);

  const removePackage = useCallback((id) => {
    setForm((prev) => {
      if (prev.packages.length <= 1) return prev;
      return { ...prev, packages: prev.packages.filter((p) => p.id !== id) };
    });
  }, []);

  /* ── Modals ── */
  const [showConfirmCreate, setShowConfirmCreate] = useState(false);
  const [showDiscardWarning, setShowDiscardWarning] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState("");

  /* Step 1 — click "Create Shipment Order" → show Yes/No confirm */
  const handleCreateClick = useCallback(() => {
    setShowConfirmCreate(true);
  }, []);

  /* Step 2 — user says Yes → show success modal + toast */
  const handleConfirmCreate = useCallback(() => {
    setShowConfirmCreate(false);
    const newId = orderId;
    setCreatedOrderId(newId);
    setShowSuccessModal(true);
    setToastVisible(true);
    /* Reset form with a new order ID */
    setForm(createFreshForm());
    setOrderId(generateOrderId());
  }, [orderId]);

  /* Discard → show warning */
  const handleDiscardClick = useCallback(() => {
    setShowDiscardWarning(true);
  }, []);

  /* Confirm discard */
  const handleConfirmDiscard = useCallback(() => {
    setShowDiscardWarning(false);
    setForm(createFreshForm());
    setOrderId(generateOrderId());
  }, []);

  return (
    <div className={styles.root} data-theme={theme}>
      {/* ── Navbar ── */}
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      {/* ── Page Title Bar ── */}
      <div className={styles.pageTitle}>
        <div className={styles.pageTitleInner}>
          <div className={styles.titleGroup}>
            <h1 className={styles.title}>Create Shipment Order</h1>
            <p className={styles.subtitle}>
              Fill in the details to generate a new logistics order with live preview.
            </p>
          </div>
          <div className={styles.orderIdBadge}>
            <span className={styles.orderIdLabel}>Order ID</span>
            <span className={styles.orderIdValue}>{orderId}</span>
          </div>
        </div>
      </div>

      {/* ── Two-Panel Layout ── */}
      <main className={styles.main}>
        <div className={styles.panelLeft}>
          <OrderForm
            form={form}
            orderId={orderId}
            onFieldChange={updateField}
            onPackageChange={updatePackage}
            onAddPackage={addPackage}
            onRemovePackage={removePackage}
            onSubmit={handleCreateClick}
            onDiscard={handleDiscardClick}
          />
        </div>
        <div className={styles.panelRight}>
          <ShipmentPreview form={form} orderId={orderId} />
        </div>
      </main>

      {/* ── Modal: Yes/No confirm before creating ── */}
      <Modal
        isOpen={showConfirmCreate}
        onClose={() => setShowConfirmCreate(false)}
        variant="confirm"
        title="Create Shipment Order?"
        message={`You're about to create order ${orderId}. This action will submit the shipment details and cannot be undone.`}
        confirmLabel="Yes, Create Order"
        cancelLabel="Go Back"
        onConfirm={handleConfirmCreate}
      />

      {/* ── Modal: Discard warning ── */}
      <Modal
        isOpen={showDiscardWarning}
        onClose={() => setShowDiscardWarning(false)}
        variant="warning"
        title="Discard this shipment?"
        message="All entered details — sender, receiver, and packages — will be permanently cleared. This cannot be undone."
        confirmLabel="Yes, Discard"
        cancelLabel="Keep Editing"
        onConfirm={handleConfirmDiscard}
      />

      {/* ── Modal: Success ── */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        variant="success"
        title="Shipment Order Created!"
        message={`Order ${createdOrderId} has been successfully created and is now live in the system. You can track it from the Shipments panel.`}
      />

      {/* ── Toast notification ── */}
      <Toast
        isVisible={toastVisible}
        orderId={createdOrderId}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}
