import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "error" | "success"
  });

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_ygo3aze",   // 🔹 Your Service ID
        "template_7lf95ap",  // 🔹 Your Template ID
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        "PeE-iFtBRlbe356_1"  // 🔹 Your Public Key
      )
      .then(
        () => {
          setLoading(false);
          setSnackbar({
            open: true,
            message: "✅ Thank you! I’ll get back to you soon.",
            severity: "success",
          });

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          setSnackbar({
            open: true,
            message: "❌ Something went wrong. Please try again.",
            severity: "error",
          });
        }
      );
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
      {/* Left Side - Form */}
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl shadow-lg"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-6"
        >
          <div className="flex flex-col">
            <span className="text-white font-medium mb-2">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className="bg-tertiary py-3 px-5 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              required
            />
          </div>

          <div className="flex flex-col">
            <span className="text-white font-medium mb-2">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className="bg-tertiary py-3 px-5 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              required
            />
          </div>

          <div className="flex flex-col">
            <span className="text-white font-medium mb-2">Your Message</span>
            <textarea
              rows={6}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What would you like to say?"
              className="bg-tertiary py-3 px-5 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary hover:scale-105 transition-all duration-300"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      {/* Right Side - 3D Earth */}
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
