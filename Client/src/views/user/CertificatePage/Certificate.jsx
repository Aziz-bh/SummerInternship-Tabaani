import React, { useEffect, useState } from "react";
import CertificateCard from "components/card/CertificateCard";

const Certificate = () => {
  const [certificates, setCertificates] = useState([]);
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const userId = user.uid;

  useEffect(() => {
    fetch(`http://localhost:5000/api/certificates/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCertificates(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
      {certificates.map((certificate) => (
        <CertificateCard
          key={certificate.certificateId}
          displayName={certificate.displayName}
          courseTitle={certificate.courseTitle}
          completionDate={certificate.completionDate}
        />
      ))}
    </div>
  );
};

export default Certificate;
