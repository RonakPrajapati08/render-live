// ToastNotification.js
import React from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import "bootstrap/dist/css/bootstrap.min.css";

const ToastNotification = ({ show, message, onClose }) => {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast show={show} onClose={onClose} delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">New Message</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastNotification;
