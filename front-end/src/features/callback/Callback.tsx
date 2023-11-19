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
      <div className = 'callback-card'>
    <Container>
      <Row className="justify-content-center">
      <img
            src={require(`../../images/callbackpic.png`)}
            alt="callbackpic"
            style = {{width: "80%"}}
              />
          <br/>
          <br/>
        <Col md={8} lg={6}>

        

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

            <Button variant="primary" type="submit" style={{width: '50%'}}>
              <b>SEND</b>
            </Button>
            <br /><br />
          </Form>
        </Col>

      </Row>

      
    </Container>
    </div>

          


    </div>
  );
};

export default Callback;