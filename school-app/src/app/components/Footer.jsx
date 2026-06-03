import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h2 className="footer-logo">
            UniSoft <span>School</span>
          </h2>
          <p className="footer-text">
            A modern school management platform designed to simplify learning,
            teaching, and administration in one place.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <Link href="/">Home</Link>
          <Link href="/students">Students</Link>
          <Link href="/teachers">Teachers</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="footer-links">
          <h3>Resources</h3>
          <Link href="/blog">Blog</Link>
          <Link href="/help">Help Center</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms</Link>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>
          <p>Email: <a href="mailto:unisoftpvt@gmail.com">unisoftpvt@gmail.com</a></p>
          <p>Phone: <a href="tel:+923001234567">+92 314 8588707</a></p>
          <p>Location: Lahore, Punjab, Pakistan</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} UniSoft. All rights reserved.</p>
      </div>
    </footer>
  );
}
