import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useAppDispatch } from '../../app/hooks';
import { postCallbackAsync } from './callbackSlice';
import { toast } from 'react-toastify';

const Callback = () => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const callbackData = {
      name: name,
      email: email,
    };

    try {
      await dispatch(postCallbackAsync(callbackData));
      toast.success('The details were received successfully!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      setName('');
      setEmail('');
    } catch (error) {
      toast.error('Incorrect details. Please try again.');
    }
  };

  return (
    
    <div>
    <Container fluid style={{ width: "80%", backgroundColor: '#505666', borderRadius: '15px', padding: '15px',
                              boxShadow: '0 10px 20px 0 rgba(0, 0, 0, 0.6), 0 1px 40px 0 rgba(0, 0, 0, 0.50)' }}>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div style={{ textAlign: 'right', color: 'white' }}>
              <br/>
            <p>קבלת ייעוץ לפגישה
              <br/>
              <br/>
              <div>
                <p>
              אני מאפשר דיאלוג ראשוני למען תיאום והבנה של התהליך, דרך וצורת התהליך ועוד פרטים עניניים.
            מלאו פרטים ואחזור אליכם עם כל המידע הדרוש תוך 24 שעות
              </p>
              </div>
            </p>
          </div>

          <br />

          <Form onSubmit={handleSubmit} className="text-center">
            <Form.Group controlId="formName">
              <Form.Label style={{ color: 'white' }}>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label style={{ color: 'white' }}>E-Mail</Form.Label>
              <Form.Control
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </Form.Group>

            <br/>
            <br/>

            <Button variant="warning" type="submit" style={{width: '70%'}}>
              <b>!שלח פרטים</b>
            </Button>
            <br /><br />
          </Form>
        </Col>

        <Col md={4} lg={4} className="text-center">
        <img
          src={require('../../images/24.png')}
          alt="24 hours"
          height="100%"
          width="100%"
          style={{
            filter: "brightness(0) invert(1)",
            position: "relative"}}/>
        </Col>
      </Row>

      
    </Container>

          


    </div>
  );
};

export default Callback;