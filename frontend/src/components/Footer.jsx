import { Row, Col } from 'react-bootstrap';
import { FaInstagram, FaFacebook, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const whatsappNumber = "+50762324815";
  const emailAddress = "customkicks0301@gmail.com";

  const openWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  return (
    <footer>
      <Row>
        <Col className="text-center py-3 bg-primary">
          <div style={{ display: 'flex', justifyContent: 'center'}}>
            <div style={{ marginRight: '20px', textAlign:'left' }}>
              <p onClick={openWhatsApp} style={{ cursor: 'pointer' }} >
                <FaWhatsapp/> {whatsappNumber}
              </p>
              <p>
                <FaEnvelope /> <a href={`mailto:${emailAddress}`} className='text-primary'>{emailAddress}</a>
              </p>
            </div>
            <div>
              <p><FaInstagram/> <a href='https://www.instagram.com/invites/contact/?igsh=15re076cnipwu&utm_content=un1dvx3' target='_blank' className='text-primary'>customkickspanama</a></p>
              <p> <FaFacebook/> <a href='https://www.facebook.com/profile.php?id=61560725158505' target='_blank' rel='noopener noreferrer' className='text-primary'>Custom Kicks</a></p>
            </div>
          </div>
          <p>CustomKicks &copy; {currentYear}</p>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
