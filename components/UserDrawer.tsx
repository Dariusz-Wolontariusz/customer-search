import { useEffect } from "react";
import { X } from "lucide-react";
import Person from "@/types/types";
import styles from "./userDrawer.module.css";

type UserDrawerProps = {
  selectedUser: Person | undefined;
  handleCloseDrawer: () => void;
};

const UserDrawer = ({ selectedUser, handleCloseDrawer }: UserDrawerProps) => {
  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    const escapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseDrawer();
      }
    };
    document.addEventListener("keydown", escapeKey);

    return () => {
      document.removeEventListener("keydown", escapeKey);
    };
  }, [selectedUser]);

  useEffect(() => {
    return () => {}
  })

  return (
    <div
      onClick={handleCloseDrawer}
      className={`${styles.drawerContainer} ${selectedUser ? styles.open : ""}`}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className={styles.drawerPanel}
        onClick={(e) => e.stopPropagation()}
      >
        {selectedUser && (
          <>
            <button
              aria-label="Close"
              className={styles.closeButton}
              onClick={handleCloseDrawer}
            >
              <X />
            </button>
            <div className={styles.header}>
              <img
                className={styles.avatar}
                src={selectedUser.avatar}
                alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
              />
              <div>
                <p className={styles.kicker}>Customer profile</p>
                <h2 id="drawer-title">
                  {selectedUser.firstName} {selectedUser.lastName}
                </h2>
                <span
                  className={`${styles.statusPill} ${styles[selectedUser.status]}`}
                >
                  {selectedUser.status}
                </span>
              </div>
            </div>

            <div className={styles.sectionCard}>
              <h3>Contacts</h3>
              <dl className={styles.detailsList}>
                <div>
                  <dt>Email address </dt>
                  <dd>{selectedUser.email}</dd>
                </div>
                <div>
                  <dt>Phone number </dt>
                  <dd>{selectedUser.phone}</dd>
                </div>
              </dl>
            </div>

            <div className={styles.sectionCard}>
              <h3>Professional</h3>
              <dl className={styles.detailsList}>
                <div>
                  <dt>Job title </dt>
                  <dd>{selectedUser.jobTitle}</dd>
                </div>
                <div>
                  <dt>Company </dt>
                  <dd>{selectedUser.company}</dd>
                </div>
                <div>
                  <dt>Department </dt>
                  <dd>{selectedUser.department}</dd>
                </div>
              </dl>
            </div>

            <div className={styles.sectionCard}>
              <h3>Location</h3>
              <dl className={styles.detailsList}>
                <div>
                  <dt>Country </dt>
                  <dd>{selectedUser.country}</dd>
                </div>
                <div>
                  <dt>City </dt>
                  <dd>{selectedUser.city}</dd>
                </div>
                <div>
                  <dt>Address </dt>
                  <dd>{selectedUser.address}</dd>
                </div>
                <div>
                  <dt>Postal code </dt>
                  <dd>{selectedUser.postalCode}</dd>
                </div>
              </dl>
            </div>

            <div className={styles.sectionCard}>
              <h3>Account</h3>
              <dl className={styles.detailsList}>
                <div>
                  <dt>Status </dt>
                  <dd>{selectedUser.status}</dd>
                </div>
                <div>
                  <dt>Customer type </dt>
                  <dd>{selectedUser.customerType}</dd>
                </div>
                <div>
                  <dt>Account created </dt>
                  <dd>{selectedUser.createdAt}</dd>
                </div>
                <div>
                  <dt>Last contacted </dt>
                  <dd>{selectedUser.lastContactedAt}</dd>
                </div>
              </dl>
            </div>

            <div className={styles.statsGrid}>
              <div className={styles.statsCard}>
                <span>Total orders</span>
                <strong>{selectedUser.totalOrders}</strong>
              </div>
              <div className={styles.statsCard}>
                <span>Total spent</span>
                <strong>
                  {selectedUser.totalSpent} {selectedUser.currency}
                </strong>
              </div>
            </div>

            <div className={styles.notes}>
              <h3>Notes</h3>
              <p>{selectedUser.notes}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserDrawer;
