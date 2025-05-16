import React from 'react';

function ContactUs() {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold text-primary"> 📞 Contact Us</h2>
      
      <div className="row justify-content-center">
        <div className="col-md-6">
          <ul className="list-group shadow-sm rounded-3">
            <li className="list-group-item">
              <strong>Address:</strong><br />
              Gatchibowli,<br />
              PensicolaFlorida, USA
            </li>
            <li className="list-group-item">
              <strong>Phone:</strong><br />
              +91 93478279**
            </li>
            <li className="list-group-item">
              <strong>Email:</strong><br />
              contact@veggiemarket.com
            </li>
            <li className="list-group-item">
              <strong>Working Hours:</strong><br />
              Mon - Fri: 9am to 6pm<br />
              Sat: 10am to 4pm
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
