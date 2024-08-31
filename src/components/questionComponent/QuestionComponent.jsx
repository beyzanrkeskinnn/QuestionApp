import "./QuestionComponent.css";
import { questions } from "../questions.jsx";
import { useState, useEffect } from "react";

function QuestionComponent() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState({});
  const [timeLeft, setTimeLeft] = useState(30);
  const [showAnswers, setShowAnswers] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    setQuestion(questions[questionIndex]);
    setTimeLeft(30);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowAnswers(false); 

    // After 4 seconds the replies stop starting
    const initialDelay = setTimeout(() => {
      setShowAnswers(true);
    }, 4000);

    // Start the timer
    const countdownTimer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdownTimer);
          handleNext();
          return 30;
        }
        return prevTime - 1;
      });
    }, 1000);

    //Clear timer and delay
    return () => {
      clearInterval(countdownTimer);
      clearTimeout(initialDelay);
    };
  }, [questionIndex]);

  // Runs when an option is clicked
  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
    const correct = option === question.answer;
    setIsCorrect(correct);

    if (correct) {
      setCorrectCount((prevCount) => prevCount + 1);
    } else {
      setIncorrectCount((prevCount) => prevCount + 1);
    }

    //Automatically move to next question after 2 seconds
    setTimeout(() => {
      handleNext();
    }, 2000);
  };

  // Transition function to next question
  const handleNext = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setTimeLeft(30);
      setShowAnswers(false);
    } else {
      setQuizFinished(true);
    }
  };

  return (
    <div className="question-component">
      {quizFinished ? (
        <div className="quiz-results">
          <h5>Quiz Tamamlandı!</h5>
          <p>Doğru Cevap Sayısı: {correctCount}</p>
          <p>Yanlış Cevap Sayısı: {incorrectCount}</p>
        </div>
      ) : (
        question.question && (
          <>
            <h5>{question.question}</h5>
            <div className="row">
              <div className="col-6 answers-container">
                <ul
                  className={`answers-list ${showAnswers ? "show-answer" : ""}`}
                >
                  {question.options &&
                    question.options.map((option, index) => (
                      <li
                        className={`answers-li ${
                          selectedAnswer === option
                            ? isCorrect
                              ? "correct"
                              : "incorrect"
                            : ""
                        }`}
                        key={index}
                        onClick={() => handleAnswerClick(option)}
                      >
                        {option}
                      </li>
                    ))}
                </ul>
              </div>
              <div className="col-6">
                {question.media && (
                  <img
                    className="img"
                    src={`./pictures/${question.media}`}
                    alt="Question related"
                  />
                )}
              </div>
            </div>
            <div className="butons">
              <p className="countdown">Kalan Süre: {timeLeft} saniye</p>

              <button className="nav-button" onClick={handleNext}>
                İleri <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </>
        )
      )}
    </div>
  );
}

export default QuestionComponent;
