import React from "react";
import Person from "@/types/types";
import styles from "./userDrawer.module.css";

type UserDrawerProps = {
  selectedUser: Person | undefined;
  handleCloseDrawer: () => void;
};

const UserDrawer = ({ selectedUser, handleCloseDrawer }: UserDrawerProps) => {
  return (
    <div
      className={`${styles.drawerContainer} ${selectedUser ? styles.open : ""}`}
      onClick={handleCloseDrawer}
      aria-hidden={!selectedUser}
    >
      {selectedUser && (
        <aside
          className={styles.drawerPanel}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-title"
        >
          <button
            type="button"
            className={styles.closeButton}
            onClick={handleCloseDrawer}
            aria-label="Close user details"
          >
            ×
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

          <div className={styles.section}>
            <h3>Contact</h3>
            <dl className={styles.detailsList}>
              <div>
                <dt>Email</dt>
                <dd>{selectedUser.email}</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>{selectedUser.phone}</dd>
              </div>
              <div>
                <dt>Last contacted</dt>
                <dd>{selectedUser.lastContactedAt}</dd>
              </div>
            </dl>
          </div>

          <div className={styles.section}>
            <h3>Work</h3>
            <dl className={styles.detailsList}>
              <div>
                <dt>Job title</dt>
                <dd>{selectedUser.jobTitle}</dd>
              </div>
              <div>
                <dt>Company</dt>
                <dd>{selectedUser.company}</dd>
              </div>
              <div>
                <dt>Department</dt>
                <dd>{selectedUser.department}</dd>
              </div>
              <div>
                <dt>Customer type</dt>
                <dd>{selectedUser.customerType}</dd>
              </div>
            </dl>
          </div>

          <div className={styles.section}>
            <h3>Location</h3>
            <dl className={styles.detailsList}>
              <div>
                <dt>Country</dt>
                <dd>{selectedUser.country}</dd>
              </div>
              <div>
                <dt>City</dt>
                <dd>{selectedUser.city}</dd>
              </div>
              <div>
                <dt>Address</dt>
                <dd>{selectedUser.address}</dd>
              </div>
              <div>
                <dt>Postal code</dt>
                <dd>{selectedUser.postalCode}</dd>
              </div>
            </dl>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span>Total orders</span>
              <strong>{selectedUser.totalOrders}</strong>
            </div>

            <div className={styles.statCard}>
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
        </aside>
      )}
    </div>
  );
};

export default UserDrawer;
