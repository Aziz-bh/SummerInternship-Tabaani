import React from "react";
import TabaaniLogo from "../../assets/img/Logos/TabaaniLogo.png";

const CertificateCard = ({
  signatureUrl,
  displayName,
  courseTitle,
  completionDate,
}) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full">
          {TabaaniLogo && (
            <img
              src={TabaaniLogo}
              alt="Logo"
              className="mx-auto h-16 w-16 object-contain"
            />
          )}{" "}
        </div>
        <h1 className="mt-4 text-2xl font-semibold text-gray-800">
          {courseTitle}
        </h1>
        <p className="mt-2 text-gray-600">Presented to:</p>
        <p className="text-lg font-bold text-gray-800">{displayName}</p>
      </div>
      <div className="mt-6 border-t-2 border-gray-300"></div>
      <div className="mt-4 text-center">
        <p className="mt-2 text-gray-600"> Certification of Completion</p>
        <p className="text-lg font-bold text-gray-800">
          {new Date(completionDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        {signatureUrl && (
          <img
            src={signatureUrl}
            alt="Signature"
            className="mx-auto mt-4 h-8 w-24"
          />
        )}
      </div>
    </div>
  );
};

export default CertificateCard;
