import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="logo">
          UniSoft<span> School</span>
        </Link>

        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/teachers">Teachers</Link></li>
          <li><Link href="/courses">Courses</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>

        <div className="nav-actions">
          <Link href="/login" className="login-btn">Login</Link>
          <Link href="/dashboard" className="admission-btn">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
}

