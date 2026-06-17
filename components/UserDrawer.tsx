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
      onClick={handleCloseDrawer}
      className={`${styles.drawerContainer} ${selectedUser ? styles.open : ""}`}
    >
      {selectedUser && (
        <div>
          <button onClick={handleCloseDrawer}>X</button>
          <h2>
            User {selectedUser.firstName} {selectedUser.lastName}
          </h2>
          <img
            className={styles.avatar}
            src={selectedUser.avatar}
            alt="customers avatar"
          />
          <p>Email address: {selectedUser.email}</p>
          <p>Phone number: {selectedUser.phone}</p>
          <p>Job title: {selectedUser.jobTitle}</p>
          <p>Company: {selectedUser.company}</p>
          <p>Department: {selectedUser.department}</p>
          <p>Country: {selectedUser.country}</p>
          <p>City: {selectedUser.city}</p>
          <p>Address: {selectedUser.address}</p>
          <p>Postal code: {selectedUser.postalCode}</p>
          <p>Status: {selectedUser.status}</p>
          <p>Customer type: {selectedUser.customerType}</p>
          <p>Account created: {selectedUser.createdAt}</p>
          <p>Last contacted: {selectedUser.lastContactedAt}</p>
          <p>Total orders: {selectedUser.totalOrders}</p>
          <p>
            Total spent: {selectedUser.totalSpent} {selectedUser.currency}
          </p>
          <p>Notes: {selectedUser.notes}</p>
        </div>
      )}
    </div>
  );
};

export default UserDrawer;
