import React, { useState } from "react";
import Papa from "papaparse";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Image from "./download.jpeg";
import VerifyLogo from "./Screenshot_6-9-2024_2574_.jpeg";

const OfferLetterApp = () => {
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
    const input = document.getElementById("offer-letter");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Define A4 size in mm
      const pdf = new jsPDF("p", "mm", "a4");

      // Get the dimensions of the canvas and calculate aspect ratio
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add the image data to the PDF
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Handle multi-page content
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.deletePage(2);

      pdf.save(`${selectedPerson.Name}_OfferLetter.pdf`);
    });
  };

  const handlePersonSelect = (event) => {
    const personIndex = event.target.value;
    if (personIndex !== "-1") {
      setSelectedPerson(csvData[personIndex]);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Generate Offer Letter</h2>

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
                {person["Name"]}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Offer Letter Template */}
      {selectedPerson && (
        <div id="offer-letter" className="container">
          <div className="header mb-4">
            <h1>InternDev Pvt Ltd</h1>
            <img
              id="CompanyLogo"
              src={Image}
              height={"60px"}
              width={"20px"}
              alt=""
            />
            <div className="company-info">
              <p>Pune, Maharashtra, India</p>
              <p>Phone: 9422144467</p>
              <p>Email: interndev65@gmail.com</p>
              <p>LinkedIn: InternDev Pvt Ltd</p>
            </div>
          </div>

          <h2 className="offer-title">Offer Letter</h2>

          <div className="offer-details">
            <p>
              Date: <b>{new Date().toLocaleDateString()}</b>
            </p>
            <p>
              ID: <b>{}</b>
            </p>
            <p>
              Name: <b>{selectedPerson["Name"]}</b>
            </p>
            <p>
              Duration: <b>{selectedPerson["Internship Duration"]}</b>
            </p>
          </div>

          <div className="content">
            <p>
              Dear <b>{selectedPerson["Name"]}</b>,
            </p>
            <p>Welcome to InternDev Pvt Ltd,</p>

            <p>
              Congratulations! We are delighted to make you an offer as a{" "}
              <b>{selectedPerson["Preferred Internship Domain"]} Intern</b>.
            </p>

            <p>
              This letter is to confirm your selection as a{" "}
              <b>{selectedPerson["Preferred Internship Domain"]} Intern</b> at{" "}
              <b>InternDev Pvt Ltd. </b>
              We welcome you for the same effective from{" "}
            </p>
            <p>
              This internship is observed by InternDev Pvt Ltd as being a
              learning opportunity for you spanning a duration of{" "}
              <b>{selectedPerson["Internship Duration"]}</b>.
            </p>
            <p>
              In essence, your internship will embrace orientation and give
              emphasis on learning new skills with a deeper understanding of
              concepts through hands-on application of the knowledge you gained
              as an intern. Our team is confident that you will acknowledge your
              obligation to perform all work allocated to you to the best of
              your ability within the lawful and reasonable direction given to
              you.
            </p>

            <p>
              We look forward to a worthwhile and fruitful association which
              will make you equipped for future projects, wishing you the most
              enjoyable and truly meaningful internship program experience you.
            </p>
            <p>Thank you</p>
            <p>Team InternDev Pvt Ltd</p>
          </div>

          <div className="signature">
            <p>with best regards,</p>
            <p className="founder">Gaurav Bhoi, Founder</p>
            <img src={VerifyLogo} className="VerfiedLogo" alt="" />
          </div>
        </div>
      )}

      {/* Download Button */}
      {selectedPerson && (
        <button
          onClick={handleDownloadPdf}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Download Offer Letter as PDF
        </button>
      )}

      {/* Inline Styles */}
      <style>{`
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          background-color: #f4f4f9;
        }
        p{
            margin : 8px 0px 0px 0px
        }
        .container {
          max-width: 800px;
          margin: auto;
          background: #fff;
          padding: 50px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .VerfiedLogo{
            position:relative;
            bottom:50px;
            height:80px;
            left:550px
        }
        #CompanyLogo{
            position:relative;
            top:46px;
            right:370px;
            width:60px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #ddd;
          padding-bottom: 30px;
        }
        .header h1 {
          font-size: 24px;
          color: #003f7f;
        }
        .header img {
          width: 80px;
        }
        .company-info {
          text-align: right;
          font-size: 14px;
        }
        .offer-title {
          text-align: center;
          margin: 120px 0;
          font-size: 20px;
          font-weight: bold;
          text-decoration: none;
        }
        .offer-details {
          margin-bottom: 20px;
          line-height: 1.8;
        }
        .offer-details p {
          margin: 0;
        }
        .content {
          line-height: 1.8;
        }
        .signature {
          margin-top: 40px;
        }
        .signature p {
          margin: 0;
        }
        .signature .founder {
          margin-top: 10px;
          font-weight: bold;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
        }
        .footer img {
          width: 60px;
        }
      `}</style>
    </div>
  );
};

export default OfferLetterApp;
