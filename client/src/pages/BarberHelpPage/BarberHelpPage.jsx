import React from 'react';
import './BarberHelpPage.scss';

const BarberHelpPage = () => {
  return (
    <div>
      <header>
        <h1>Barber Shop Help Center</h1>
      </header>

      <section>
        <h2>Frequently Asked Questions</h2>

        <div>
          <h3>1. How can I book an appointment?</h3>
          <p>
            To book an appointment, navigate to our "Book Now" page and select your preferred barber, date, and time slot.
          </p>
        </div>

        <div>
          <h3>2. Can I cancel or reschedule my appointment?</h3>
          <p>
            Yes, you can. Simply log in to your account, go to the "My Appointments" section, and follow the prompts to cancel or reschedule.
          </p>
        </div>

        <div>
          <h3>3. What services do you offer?</h3>
          <p>
            We offer a range of services, including haircuts, beard trims, and styling. Check our "Services" page for a complete list.
          </p>
        </div>

        <div>
        <h3>4. What payment methods do you accept?</h3>
        <p>
            We accept various payment methods, including credit/debit cards and cash. For a seamless experience, we recommend using card payments through our online booking system.
        </p>
        </div>

        <div>
        <h3>5. Is there a loyalty program or membership available?</h3>
        <p>
            Yes, we offer a loyalty program for our valued customers. You can earn points for each visit and redeem them for discounts on future services. Check our "Loyalty Program" page for more details.
        </p>
        </div>

        <div>
        <h3>6. Can I bring my own styling products?</h3>
        <p>
            While we provide a range of high-quality styling products, you are welcome to bring your own if you have specific preferences or sensitivities. Feel free to consult with your barber for personalized recommendations.
        </p>
        </div>

        <div>
        <h3>7. Do you offer gift cards?</h3>
        <p>
            Yes, we have gift cards available for purchase. Treat your friends and family to a unique grooming experience. Visit our "Gift Cards" page for more information on how to buy and redeem them.
        </p>
        </div>

        <div>
        <h3>8. What COVID-19 safety measures are in place?</h3>
        <p>
            Your safety is our top priority. We have implemented strict hygiene and safety protocols in accordance with local health guidelines. This includes regular sanitization, mask-wearing, and social distancing. Check our "Safety Measures" page for more details.
        </p>
        </div>

      </section>

      <section>
        <h2>Contact Us</h2>

        <div>
          <h3>Customer Support</h3>
          <p>
            If you have any questions or issues, feel free to contact our customer support team at <a href="tel:+91 123456789">123-456-7890</a> or <a href="mailto:support@barbershop.com">support@barbershop.com</a>.
          </p>
        </div>

        <div>
          <h3>Visit Us</h3>
          <p>
            Our barber shop is located at JAIPUR. Drop by during our business hours for any in-person inquiries.
          </p>
        </div>
      </section>

      <footer>
        <p>&copy; 2024 Barber Shop. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BarberHelpPage;
