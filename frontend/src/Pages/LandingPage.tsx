import "../sytles/LandingPage.scss"

const HomePage: React.FC = () => {
    return (
      <div className="home-page">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1>Welcome to AfriVoice Hub</h1>
            <p>Empowering citizens, enhancing democracy, and fostering communication.</p>
            <button className="cta-button">Get Started</button>
          </div>
        </section>
  
        {/* Constitutional Rights Section */}
        <section className="constitutional-rights">
          <h2>Know Your Constitutional Rights</h2>
          <div className="rights-grid">
            {[
              { title: "Right to Education", description: "Every child has the right to free and compulsory basic education, as well as access to affordable secondary education and higher education opportunities." },
              { title: "Right to Health", description: "Everyone has the right to the highest attainable standard of health, which includes access to health care services, clean water, and sanitation." },
              { title: "Freedom of Expression", description: "Every individual has the right to freedom of expression, which includes seeking, receiving, and imparting information or ideas." },
              { title: "Equality and Freedom from Discrimination", description: "All individuals are equal before the law and have the right to equal protection and benefit of the law without discrimination." },
              { title: "Right to Privacy", description: "Everyone has the right to privacy, which includes the right not to have their personal information unnecessarily disclosed." },
              { title: "Right to Fair Labour Practices", description: "Every worker has the right to fair remuneration, reasonable working conditions, and freedom from forced labor or discrimination." },
              { title: "Right to a Clean and Healthy Environment", description: "Everyone has the right to live in a clean and healthy environment, which must be protected for current and future generations." },
              { title: "Right to Access Information", description: "Every person has the right to access information held by the state or another person that is necessary for the exercise or protection of a right." },
              { title: "Right to Housing", description: "Every person has the right to accessible and adequate housing and to reasonable standards of sanitation." },
              { title: "Right to Participate in Governance", description: "Every citizen has the right to free, fair, and regular elections for any elective public body or office." },
              { title: "Freedom of Association", description: "Every person has the right to join and participate in the activities of an association of their choice." },
              { title: "Freedom of Movement", description: "Every citizen has the right to move freely throughout Kenya and to reside anywhere within its borders." }
            ].map((right, index) => (
              <div className="card" key={index}>
                <h3>{right.title}</h3>
                <p>{right.description}</p>
              </div>
            ))}
          </div>
        </section>
  
        {/* Testimonials Section */}
        <section className="testimonials">
          <h2>What Our Users Say</h2>
          <div className="testimonials-grid">
            {[
              { name: "Jane Doe", feedback: "AfriVoice Hub has transformed how we interact with our leaders. It's empowering and truly revolutionary!" },
              { name: "John Smith", feedback: "Through this platform, I learned about my rights and how to hold our leaders accountable. Highly recommended!" },
              { name: "Mary Johnson", feedback: "This app makes it so easy to stay informed and engaged with governance. A must-have for every citizen!" }
            ].map((testimonial, index) => (
              <div className="testimonial-card" key={index}>
                <p>"{testimonial.feedback}"</p>
                <h4>- {testimonial.name}</h4>
              </div>
            ))}
          </div>
        </section>
  
        {/* Call to Action Section */}
        <section className="cta">
          <h2>Join the Movement</h2>
          <p>Sign up today and be part of the change.</p>
          <button className="cta-button">Sign Up</button>
        </section>
      </div>
    );
  };
  
  export default HomePage;
  