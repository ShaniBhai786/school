import Link from "next/link";

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>
          Welcome to <span>UniSoft</span>
        </h1>

        <p>
          A modern school management system to manage students, teachers,
          courses, attendance, and results in one powerful platform.
        </p>

        <div className="hero-actions">
          <Link href="/login" className="btn primary">
            Get Started
          </Link>

          <Link href="/about" className="btn secondary">
            Learn More
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="card">
          <h3>Students</h3>
          <p>Manage student records efficiently with real-time updates.</p>
        </div>

        <div className="card">
          <h3>Teachers</h3>
          <p>Assign classes, track performance, and manage schedules.</p>
        </div>

        <div className="card">
          <h3>Courses</h3>
          <p>Create and organize structured learning programs easily.</p>
        </div>
      </section>
    </div>
  );
}
