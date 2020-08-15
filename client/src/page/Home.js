import React from 'react';
import { Link } from 'react-router-dom';
import about from '../image/about.jpg';
import reliable from '../icon/reliable.svg';
import quality from '../icon/quality.svg';
import experience from '../icon/experience.svg';

const Home = () => {
  return (
    <>
      <header className="main-header">
        <div className="container">
          <nav className="main-navbar">
            <div className="logo">
              <Link to="/">e-controctor</Link>
            </div>
            <ul className="collection">
              <li className="collection-list">
                <Link to="/">Home</Link>
              </li>
              <li className="collection-list">
                <Link to="customer.html">User</Link>
              </li>
              <li className="collection-list">
                <Link to="#">Contractor</Link>
              </li>
              <li className="collection-list">
                <Link to="#">Shop</Link>
              </li>
              <li className="collection-list">
                <Link to="#">Labour</Link>
              </li>
            </ul>
            <div className="social-btn">
              <Link to="/login" className="btn-login">
                Login
              </Link>
              <Link to="/register" className="btn-signup">
                Signup
              </Link>
            </div>
          </nav>
        </div>
        <div className="showcase mb-5">
          <h1>Contruct & Repare You Home with Professional</h1>
          <p className="lead-text mt-3">
            We offer Services like build home from start to end, repare home or
            accessories which need to repare the home. All these we provide in
            your door in just few second.
          </p>
          <Link to="/register" className="btn-signup">
            Signup
          </Link>
        </div>
      </header>

      {/* ABOUT SECTION  */}
      <section className="section-about">
        <div className="container">
          <div className="flex-box">
            <div className="section-paragraph">
              <div className="shape">
                <strong>About Us</strong>
              </div>
              <h2 className="heading">
                We have all your needs, from building complete home, Repare home
                and shop
              </h2>
              <p>
                We offer the sevices build complete home from start to end,
                Repare the home, Shop for accessories which is need to repare
                your house. We offer indiviual labour, professional labour. We
                make sure that the services we offer are hight qunality. We
                collect and analyze information about your general usage of the
                website, products to make sure high qunality
              </p>
            </div>
            <div className="section-describe">
              <img src={about} alt="contruction" />
            </div>
          </div>
        </div>
      </section>

      {/* Photo section */}
      <section className="design">
        <div className="design-grid">
          <div className="desgin-item-one">
            <div className="overlay">
              <div className="inner-flex">
                <h3>Build Home</h3>
                <p>
                  Start Build your dream house with professional and exprience
                  people.
                </p>
                <Link className="btn-light mt-3" to="#">
                  Click here <i className="fas fa-chevron-right"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="desgin-item-two">
            <div className="overlay">
              <div className="inner-flex">
                <h3>Hire interior designer</h3>
                <p>
                  Hire interior Design for give the greate look of your house.
                  Our designer make your house your dream live house
                </p>
                <Link className="btn-light mt-3" to="#">
                  Click here <i className="fas fa-chevron-right"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="desgin-item-three">
            <div className="overlay">
              <div className="inner-flex">
                <h3>Hire Labor</h3>
                <p>
                  Hire the labour from website with best rate and high qunality
                  services and lot other banifits. By using this option customer
                  can build his own time
                </p>
                <Link className="btn-light mt-3" to="#">
                  Click here <i className="fas fa-chevron-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* section for fature  */}
      <section className="fature">
        <div className="container">
          <h2>Fature</h2>
          <div className="fature-grid">
            <div className="fature-item small">
              <img className="small" src={quality} alt="qunality icons" />
              <h2>quality</h2>
              <p>
                Our mission is never compromised on quality. Our team never
                compromised on quality. qunatity does not matter. We make sure,
                we provide high quality services to our customer.
              </p>
            </div>
            <div className="fature-item">
              <img src={reliable} alt="Reliablity icons" />
              <h2>Reliablity</h2>
              <p>
                Trust is very impartant thing for customer. Our team make
                customer satisfied with our sevices. We deliver what we promise
                with customer. Raliablity with customer is the bigest assest for
                us.
              </p>
            </div>
            <div className="fature-item">
              <img src={experience} alt="experience icons" />
              <h2>Exprience</h2>
              <p>
                Exprience is people play a big role to do things in a batter
                way. We encourage experience people. We also support inexperince
                people to come and provide services to our customer. But We
                promise professional will do job in this platfarm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Query Section  */}
      <section className="query">
        <div className="container">
          <div className="query-grid">
            <div className="query-item">
              <div className="query-card">
                <h2>Let's talk about industrial problems</h2>
                <p>
                  Finding the right person for the right job is very diffcult.
                  In this industry comparsion is very hard. you don't have good
                  platform where the customer
                </p>
              </div>
            </div>
            <div className="query-item">
              <div className="form-card">
                <h2>Any Query</h2>
                <form>
                  <div className="form-field">
                    <input type="text" placeholder="Enter your name" />
                  </div>
                  <div className="form-field">
                    <input type="email" placeholder="Enter your email" />
                  </div>
                  <div className="form-field">
                    <input type="number" placeholder="Enter your phone" />
                  </div>
                  <div className="form-field">
                    <textarea placeholder="Enter your Message"></textarea>
                  </div>
                  <button className="btn-light" type="submit">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <div className="container">
          <h2 className="mb-4">e-contarcter</h2>
          <ul className="footer-collection mb-5">
            <li className="footer-collection-item">
              <Link to="#">Term of Services</Link>
            </li>
            <li className="footer-collection-item">
              <Link to="#">Privacy policy</Link>
            </li>
            <li className="footer-collection-item">
              <Link to="#">Security</Link>
            </li>
          </ul>
          <ul className="footer-collection-social">
            <li className="footer-collection-social-item">
              <Link to="#">
                <i className="fab fa-facebook"></i>
              </Link>
            </li>
            <li className="footer-collection-social-item">
              <Link to="#">
                <i className="fab fa-twitter"></i>
              </Link>
            </li>
            <li className="footer-collection-social-item">
              <Link href="#">
                <i className="fab fa-instagram-square"></i>
              </Link>
            </li>
            <li className="footer-collection-social-item">
              <Link href="#">
                <i className="fab fa-youtube"></i>
              </Link>
            </li>
          </ul>
          <div>copyright &copy; 2020 reserved by e-contracter</div>
        </div>
      </footer>
    </>
  );
};

export default Home;
