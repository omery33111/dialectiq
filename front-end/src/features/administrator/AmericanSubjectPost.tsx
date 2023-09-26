import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Button, Container, Form } from 'react-bootstrap';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { AmericanSubject } from '../../models/AmericanSubject';
import { postAmericanSubjectAsync } from './administratorSlice';
import { selectSingleSubjectOfAmerican } from '../american/americanSlice';



const AmericanSubjectPost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const AmericanSubject = useAppSelector(selectSingleSubjectOfAmerican)


  const [subject_name, setSubject] = useState('');


  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('subject_name', subject_name);

    const newSubject: AmericanSubject = {
      subject_name: subject_name,
      id: AmericanSubject.id
    };
      console.log(newSubject)
    dispatch(postAmericanSubjectAsync(newSubject));

    setTimeout(() => {
      navigate("/administrator/american_subject/");
    }, 150);
  };

  return (
    <div>
      <div style={{ height: 200 }} />
      <Container>
        <h1>AMERICAN SUBJECT</h1>
        <br />
        <br />
        <Form onSubmit={handleSubmit} className="blog-form">
          
        <Form.Group controlId="formSubject">
                <Form.Label className = "blog-form-title"><h5>American Quiz Subject</h5></Form.Label>
                <Form.Control type="textarea" value={subject_name} onChange={handleSubjectChange} />
              </Form.Group>

          <br />
          <div>
            <Button className="submit-update-blog" variant="warning" type="submit">
              <h6>
                <BsCheckLg />
              </h6>
            </Button>&nbsp;
          </div>

          <div>
            <Button className="cancel-update-blog" variant="info">
              <Link style={{ textDecoration: "none", color: "black" }} to="/administrator/american_subject/">
                <h6>
                  <BsXLg />
                </h6>
              </Link>
            </Button>
          </div>
        </Form>

        <div style={{ height: "30vh" }} />
      </Container>
    </div>
  );
};

export default AmericanSubjectPost;
