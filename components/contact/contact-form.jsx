import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import Notification from "../../ui/notification";
import classes from "./contact-form.module.css";
const ContactForm = () => {
  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const messagelInputRef = useRef();
  const [status, setStatus] = useState({
    status: "",
    title: "",
    message: "",
  });

  useEffect(() => {
    if (status.status === "success" || status.status === "error") {
      const timer = setTimeout(() => {
        setStatus({ status: "", title: "", message: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const sumbmitHandler = (e) => {
    setStatus({
      ...status,
      title: "Sending message...",
      message: "sending your message to database",
    });
    e.preventDefault();
    const formData = {
      email: emailInputRef.current.value,
      name: nameInputRef.current.value,
      message: messagelInputRef.current.value,
    };
    axios
      .post("/api/contact", formData)
      .then((response) => {
        console.log(response.ok);
        setStatus({
          ...status,
          status: "success",
          title: "Message sent!",
          message: "Your message successfully sent to database",
        });
      })
      .catch((err) => {
        console.log(err);
        setStatus({
          ...status,
          status: "error",
          title: "Error!",
          message: err.message || "Error while sending message to database",
        });
        console.log(err.response.data.message);
      });
  };
  return (
    <>
      <section className={classes.contact}>
        <h1>How can I help you?</h1>
        <form className={classes.form} onSubmit={sumbmitHandler}>
          <div className={classes.controls}>
            <div className={classes.control}>
              <label htmlFor="email">Your Email</label>
              <input type="email" id="email" required ref={emailInputRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" required ref={nameInputRef} />
            </div>
          </div>
          <div className={classes.control}>
            <label htmlFor="message">Your message</label>
            <textarea
              id="message"
              rows="5"
              ref={messagelInputRef}
              required
            ></textarea>
          </div>
          <div className={classes.actions}>
            <button>Send Message</button>
          </div>
        </form>
        {status.title && <Notification {...status} />}
      </section>
    </>
  );
};

export default ContactForm;
