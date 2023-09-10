import Card from "components/card";
import { FaTrophy } from "react-icons/fa";
import ScoreIcon from "assets/icons/ScoreIcon.png";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const CourseCard = ({ title, image, level, chapters, extra, id, price }) => {
  const fetch = require('node-fetch'); // Si vous utilisez Node.js

  const handleStartCourse = async () => {
    try {
      const user = firebase.auth().currentUser;
      if (!user) {
        // L'utilisateur n'est pas connecté
        return;
      }
      const subscriptionsRef = firebase.firestore().collection("subscriptions");

      // Vérifier si l'utilisateur est déjà inscrit à ce cours
      const existingSubscription = await subscriptionsRef
        .where("userId", "==", user.uid)
        .where("courseId", "==", id)
        .get();
  
      if (!existingSubscription.empty) {
        console.log("User is already subscribed to this course.");
        return;
      }
  
      // Obtenir les coordonnées géographiques de l'utilisateur
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
  
          // Utiliser Nominatim pour obtenir le pays
          const country = await getCountryFromCoordinates(latitude, longitude);
  
          if (!country) {
            console.error("Unable to determine country from coordinates.");
            return;
          }
  
          const subscriptionsRef = firebase.firestore().collection("subscriptions");
          const subscriptionData = {
            userId: user.uid,
            courseId: id,
            progress: 0,
            verified: "unverified",
            country: country,
            FinalExam: false,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          };
  
          await subscriptionsRef.add(subscriptionData);
  
          // La souscription a été ajoutée avec succès
          console.log("Course subscription started successfully.");
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } catch (error) {
      console.error("Error starting course:", error);
    }
  };
  
  async function getCountryFromCoordinates(latitude, longitude) {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();
  
    if (data && data.address && data.address.country) {
      return data.address.country;
    }
    
    return null;
  }
  
  
  return (
    <Card
      extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
    >
      <div className="h-full w-full">
        <div className="relative w-full">
          <img
            src={image}
            className="mb-3 h-56 w-full rounded-xl object-cover 3xl:h-full 3xl:w-full"
            alt=""
          />
        </div>

        <div className="p-![18px] mb-6 flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <div>
            <p className="text-lg font-bold dark:text-white ">{title}</p>
          </div>
        </div>
        <div className="mt-1  mb-6  flex justify-between">
          <div className="flex items-center justify-center gap-3">
            <p className="text-md font-medium">Chapters</p>
            <p className="text-md font-semibold  dark:text-white">{chapters}</p>
          </div>
          <div className="flex  items-center justify-center gap-3">
            <p className="text-md font-medium">Price</p>
            <p className="text-md font-semibold  dark:text-white">{price} DT</p>
          </div>
          <div className="flex  items-center justify-center gap-3">
            <FaTrophy size={20} color="silver" />
            <p className="text-md font-semibold  dark:text-white">{level}</p>
          </div>
        </div>
        <div className="mt-1  mb-4 flex justify-between">
          <Link to={`/course/${id}`}>
            <button  onClick={handleStartCourse} className="flex items-center justify-start gap-2 rounded-[10px] bg-[#000000] py-2.5 pl-4 pr-2 text-center text-sm font-medium capitalize leading-tight text-white">
              Start Course <MdOutlineKeyboardArrowRight size={20} />
            </button>
          </Link>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="relative">
              <img src={ScoreIcon} width={50} alt="Score Icon" />
              <p className="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 transform text-lg font-bold">
                1
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
