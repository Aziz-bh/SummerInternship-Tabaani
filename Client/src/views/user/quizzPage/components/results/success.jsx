import React from "react";
import success from "../../../../../assets/img/results/success.png";

const Success = () => {
  return (
    <div className="ml-20 pl-4 mt-10 mr-10">
      <div className="overlap">
  
        <div className="overlap-group ">
        <div className="flex flex-col">
        <div className="lesson-complete text-gray-1000 font-semibold text-sm tracking-wide">Lesson Complete</div>



        <h1 className="thats-right-great text-4xl font-normal mt-5 mb-10 pb-5">Thats Right, Great Work</h1>



</div>

<div className="flex md:flex-row flex-col">
<p className="lorem-ipsum-dolor text-gray-1100 text-lg tracking-wide font-bold" style={{ fontWeight: 1000 }}>
  LOREM IPSUM DOLOR SIT AMET CONSECTETUR. SED EGESTAS NISL FRINGILLA HENDRERIT FAUCIBUS. PHASELLUS DAPIBUS SED
  TURPIS NULLA PORTA GRAVIDA. DUIS ET IN SODALES ARCU VITAE ET. NUNC VELIT MAURIS TRISTIQUE AMET IN FAUCIBUS
  URNA NULLAM SEMPER ID PELLENTESQUE.
</p>


  <img className="success ml-2" alt="Success" src={success}/>
</div>

        </div>
      </div>
      <div className="overlap-2">
        <div className="next-steps">NEXT STEPS</div>
        <p className="p">
          Lorem Ipsum Dolor Sit Amet Consectetur. Sed Egestas Nisl Fringilla Hendrerit Faucibus. Phasellus Dapibus Sed
          Turpis Nulla Porta Gravida. Duis Et In Sodales Arcu Vitae Et. Nunc Velit Mauris Tristique Amet In Faucibus
          Urna Nullam Semper Id Pellentesque.
        </p>
      </div>
      <img className="vector" alt="Vector" src="/img/vector-1.svg" />
    </div>
  );
};

export default Success;
