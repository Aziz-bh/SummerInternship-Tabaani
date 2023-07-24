import "../../../assets/css/quiz.css";

const Quiz = () => {
  return (
    <div className="content">
      <div className="title-container">
        <h1>Check Your Knowledge</h1>
      </div>
      <div className="general-text-container">
        <p className="general-text">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. ad excepturi soluta Lorem ipsum, dolor sit amet consectetur adipisicing elit. ad excepturi soluta?
        </p>
        <img src="" alt="" />
      </div>
      <div className="quiz">
        <div className="question">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, quas ut hic dolore a eligendi dicta aperiam cumque earum, amet minus! Doloribus laboriosam vel natus, aliquid totam esse autem soluta ?</div>
        <div className="answer">
          <div className="options">
            <button>TRUE</button>
            <button>FALSE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
