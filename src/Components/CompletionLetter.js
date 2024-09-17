import React, { useState } from "react";
import Papa from "papaparse";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import CompanyLogo from "./download.jpeg";
import VerifyLogo from "./Interndev Stamp.png";
import QRCode from "./qrcode_126108880_58c035a6e7afe762f275b7b59cea3580.png";

const CompletionLetter = () => {
  const [csvData, setCsvData] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
      Papa.parse(file, {
        complete: (results) => {
          setCsvData(results.data);
        },
        header: true,
        skipEmptyLines: true,
      });
    } else {
      alert("Please upload a valid CSV file.");
    }
  };

  const handleDownloadPdf = () => {
    const input = document.getElementById("completion-letter");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.deletePage(2);

      pdf.save(`${selectedPerson.Name}_CompletionLetter.pdf`);
    });
  };

  const handlePersonSelect = (event) => {
    const personIndex = event.target.value;
    if (personIndex !== "-1") {
      setSelectedPerson(csvData[personIndex]);
    }
    console.log(selectedPerson);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Generate Completion Letter</h2>

      {/* File Upload */}
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="border border-gray-300 p-2 rounded mb-4"
      />

      {/* Select Person from CSV */}
      {csvData.length > 0 && (
        <div className="mb-4">
          <label>Select a person:</label>
          <select onChange={handlePersonSelect} className="ml-2 p-2 border">
            <option value="-1">Choose an option</option>
            {csvData.map((person, index) => (
              <option key={index} value={index}>
                {person.Name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Completion Letter Template */}
      {selectedPerson && (
        <div id="completion-letter" className="container">
          <div className="header flex justify-between mb-4">
            <h1 className="text-3xl font-bold text-blue-800">
              InternDev Pvt Ltd
            </h1>
            <div className="">
              <p>Pune, Maharashtra, India</p>
              <p>Phone: 9322366868</p>
              <p>Email: interndev65@gmail.com</p>
              <p>LinkedIn: InternDev Pvt Ltd</p>
            </div>
          </div>
          <img
            src={CompanyLogo}
            alt="Company Logo"
            className="relative bottom-11"
            width={"80px"}
            height={"94px"}
          />

          <div className="">
            <hr className="bg-blue-800" />
            <h2 className="text-center text-xl font-bold mb-4 mt-5">
              To Whomsoever It May Concern
            </h2>

            <div className="offer-details mb-4">
              <p>
                <b>Date: </b>10/09/2024
                {/* {new Date().toLocaleDateString()} */}
              </p>
              <p>
                <b>Intern ID:</b> {selectedPerson["Intern ID"]}
              </p>
              <p>
                <b>Name:</b> {selectedPerson.Name}
              </p>
              <p>
                <b>Duration:</b> {selectedPerson["Internship Duration"]}
              </p>
            </div>

            <div className="content mb-4">
              <p>Dear {selectedPerson.Name},</p>
              <p>
                This is to certify that <b>{selectedPerson.Name}</b> has done
                his/her internship in{" "}
                <strong>{selectedPerson["Preferred Internship Domain"]}</strong>{" "}
                at InternDev Pvt Ltd, Pune from{" "}
                <strong>{selectedPerson["Start Date"]}</strong> to{" "}
                <strong>{selectedPerson["End Date"]}</strong>.
              </p>
              <p>
                He/She has worked on a project titled{" "}
                <strong>"{selectedPerson["Project"]}"</strong>. As a part of
                this internship, he/she completed all the required tasks given
                by the company.
              </p>
              <p>
                This internship is observed by InternDev Pvt Ltd as being a
                learning opportunity spanning{" "}
                <strong>{selectedPerson["Internship Duration"]}</strong>.
              </p>
              <p>
                During the internship, <b>{selectedPerson["Name"]}</b> has shown
                a great responsibility, sincerity and a genuine willingness to
                learn and zeal to take on new assignments and challenges. In
                particular, his/her coordination skills and communication skills
                as per excellence and his attention to details is impressive.
              </p>
              <p>
                We look forward to a worthwhile and fruitful association which
                will make you equipped for future projects, wishing you all the
                very best for your future endeavours.
              </p>
              <p>Thank you</p>
            </div>

            <div className="signature mt-8">
              <p>Best regards,</p>
              <p className="font-bold">Gaurav Bhoi, Founder</p>
            </div>

            <div className="footer mt-8 text-end" style={{ marginLeft: "77%" }}>
              <img
                src={VerifyLogo}
                alt="Company Stamp"
                width={"120px"}
                height={"90px"}
                className="mb-2"
              />

              <img
                src={QRCode}
                alt="QRCode"
                width={"90px"}
                height={"90px"}
                className="ml-3"
              />
            </div>
          </div>
        </div>
      )}

      {/* Download Button */}
      {selectedPerson && (
        <button
          onClick={handleDownloadPdf}
          className="mt-4 p-2 bg-blue-500 text-white rounded absolute top-12 left-1/2"
        >
          Download Completion Letter as PDF
        </button>
      )}

      {/* Inline Styles */}
      <style>{`
                .container {
                    max-width: 800px;
                    margin: auto;
                    background: #fff;
                    padding: 40px;
                    padding-bottom:10px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }

                .company-details{
                    position: relative;
                    right: -63%;
                    bottom: 72px;
                }
                                
                .section-2{
                    position: relative;
                    bottom: 75px;
                }
                .company-logo{
                    height: 80px;
                    width: 96px;
                    position: relative;
                    bottom: 115px;
                }
                .line{

                    background-color: #003f7f;
                }
                .header h1 {
                    color: #003f7f;
                }
                .header p {
                    margin: 0;
                }
                .offer-details p {
                    margin: 0;
                }
                .content p {
                    margin-bottom: 10px;
                }
                .signature {
                    font-weight: bold;
                }
                
            `}</style>
    </div>
  );
};

export default CompletionLetter;
