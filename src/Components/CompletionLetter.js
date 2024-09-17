import React, { useState } from "react";
import Papa from "papaparse";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
            const pdf = new jsPDF('p', 'mm', 'a4');

            const imgWidth = 210;
            const pageHeight = 297;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`${selectedPerson.Name}_CompletionLetter.pdf`);
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
                <div id="completion-letter" className="container p-4">
                    <div className="header flex justify-between mb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-blue-800">InternDev Pvt Ltd</h1>
                            <p>Pune, Maharashtra, India</p>
                            <p>Phone: 9322366868</p>
                            <p>Email: interndev65@gmail.com</p>
                            <p>LinkedIn: InternDev Pvt Ltd</p>
                        </div>
                        <img src="path_to_logo.png" alt="Company Logo" className="w-16" />
                    </div>

                    <h2 className="text-center text-xl font-bold mb-4">To Whomsoever It May Concern</h2>

                    <div className="offer-details mb-4">
                        <p>Date: {new Date().toLocaleDateString()}</p>
                        <p>Intern ID: {selectedPerson["Intern ID"]}</p>
                        <p>Name: {selectedPerson.Name}</p>
                        <p>Duration: {selectedPerson.Duration}</p>
                    </div>

                    <div className="content mb-4">
                        <p>Dear {selectedPerson.Name},</p>
                        <p>
                            This is to certify that {selectedPerson.Name} has done his/her internship in{" "}
                            <strong>{selectedPerson["Internship Title"]}</strong> at InternDev Pvt Ltd, Pune
                            from <strong>{selectedPerson["Start Date"]}</strong> to <strong>{selectedPerson["End Date"]}</strong>.
                        </p>
                        <p>
                            He/She has worked on a project titled <strong>"{selectedPerson["Project Title"]}"</strong>. As a part of this
                            internship, he/she completed all the required tasks given by the company.
                        </p>
                        <p>
                            This internship is observed by InternDev Pvt Ltd as being a learning opportunity spanning{" "}
                            <strong>{selectedPerson.Duration}</strong>.
                        </p>
                        <p>
                            During the internship, {selectedPerson.Name} has shown responsibility, sincerity, and a
                            willingness to learn. We are confident in his/her skills and look forward to future
                            contributions.
                        </p>
                    </div>

                    <div className="signature mt-8">
                        <p>Best regards,</p>
                        <p className="font-bold">Gaurav Bhoi, Founder</p>
                    </div>

                    <div className="footer mt-8 text-center">
                        <img src="path_to_logo.png" alt="Company Stamp" className="w-16 mx-auto" />
                    </div>
                </div>
            )}

            {/* Download Button */}
            {selectedPerson && (
                <button
                    onClick={handleDownloadPdf}
                    className="mt-4 p-2 bg-blue-500 text-white rounded"
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
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
                .footer img {
                    width: 60px;
                }
            `}</style>
        </div>
    );
};

export default CompletionLetter;
