function Contact() {
  return (
    <section>
      <h1>Contact Me</h1>

      <p>Feel free to reach out for opportunities, collaborations, or questions.</p>
      
      <form className="contact-form">
        <input type="text" placeholder="Your Name" />
        <input type="email" placeholder="Your Email" />
        <textarea placeholder="Your Message"></textarea>

        <button type="submit">Send Message</button>
      </form>
    </section>
  );
}

export default Contact;