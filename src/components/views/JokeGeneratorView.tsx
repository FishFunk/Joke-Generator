import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import JokesApi from '../../services/JokesApi';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import styles from './JokeGeneratorView.module.scss';
import { Joke } from "../../interfaces/joke";

export default function JokeGeneratorView() {

  const [jokeData, setJokeData] = useState<Joke>();
  const [showPunchline, setShowPuncline] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(()=>{
    fetchRandomJoke();
  }, []);

  const fetchRandomJoke = async ()=>{
    setIsLoading(true);
    setJokeData(undefined);

    const result = await JokesApi.fetchRandomJoke();
    if(result.status === 'OK' && result.data){
      setJokeData(result.data);
      setErrorMessage('');
    } else {
      setErrorMessage('THERE WAS AN ERROR LOADING YOUR JOKE');
    }
    setIsLoading(false);
  }

  const getMessageState = () =>{
    if(isLoading){
      return <h6 className={styles.loadingMessage}>LOADING YOUR JOKE...</h6>;
  
    } else if(errorMessage){
      return <h6 className={styles.errorMessage}>{errorMessage}</h6>;
    }
  }

  return (
    <Container className="pt-5 pr-3 pl-3">
      <Row className="justify-content-evenly text-center align-items-center">
        <Col>
          <Button className="btn-rounded" variant="primary" onClick={fetchRandomJoke}>
            Get A New Random Joke
          </Button>
        </Col>
        <Col>
          <a href="https://github.com/15Dkatz/official_joke_api"
            target="_blank"
            rel="noreferrer">
            View API Docs
          </a>
        </Col>
      </Row>
      <hr />
      {      
        jokeData ?
        <>
          <Row className="fadeInLeft align-items-center p-2">
              <FontAwesomeIcon className={styles.quoteIcon} icon={faQuoteLeft} size="8x"/>
              <h3 className={styles.jokePrompt}>{jokeData.setup}</h3>
          </Row>
          <Row className="justify-content-center align-items-center p-2">
            <Button 
              className="btn-rounded p-3" 
              variant="secondary" 
              onClick={()=>setShowPuncline(!showPunchline)}>
                {`${showPunchline ? 'Hide' : 'Show'} Punchline`}
            </Button>
          </Row>
          {
            showPunchline ? 
            <Row className="fadeInRight justify-content-end align-items-center p-2">
              <h3 className={styles.jokePunchline}>{jokeData.punchline}</h3>
              <FontAwesomeIcon className={styles.quoteIcon} icon={faQuoteRight} size="8x"/>
            </Row> : null
          }
        </>
        :
        <Row className="justify-content-center align-items-center pt-4">
          {getMessageState()}
        </Row>
        
      }
    </Container>
  );
}
