import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllInternships } from '../services/api';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("email");
  const [userInternships, setUserInternships] = useState([]);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const data = await getAllInternships();
        console.log("Fetched internships:", data);
        if (userEmail) {
          const filtered = data.filter(i => i.email === userEmail);
          setUserInternships(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch internships:", error);
      }
    };
  
    fetchInternships();
  
    const intervalId = setInterval(() => {
      fetchInternships();
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, [userEmail]);
  

  return (
    <div className="homepage-container">
      <div className="main-content">
        <h2 className="subtitle">Welcome to the UG/PG Internship Portal</h2>
      
        {/* {userEmail&& (
          <p className="user-email">Logged in as: {userEmail}</p>
        )} */}

        <div className="options-grid">
          <div className="card">
            <h2>📄 Documents</h2>
            <div className="document-section">
              <a href="https://1drv.ms/w/c/2879c4145659eca3/ETHRdK_La15KigY-Go9GHy0BQu9tEzCa5KRZvMqh-UH6XQ?e=CIhyHU" download>Letter of Recommendation Template</a>
            </div>
            <div className="document-section">
              <a href="https://1drv.ms/w/c/2879c4145659eca3/ETHRdK_La15KigY-Go9GHy0BQu9tEzCa5KRZvMqh-UH6XQ?e=CIhyHU" download>
                No Objection Certificate (NOC)
              </a>
            </div>
          </div>

          <div className="card">
            <h2>📝 Apply</h2>
            <button onClick={() => navigate('/application')}>Fill Application Form</button>
          </div>
          {userInternships.length > 0 && userInternships.some(internship => new Date(internship.endDate) < new Date()) && (
          <div className="card">
            <h2>📤 Submit Feedback</h2>
            <button onClick={() => navigate('/upload')}>Upload Feedback Form</button>
          </div>
          )}
        </div>

        {userEmail && (
        <div className="internship-section">
          <h3>Your Internships</h3>
          {userInternships.length === 0 ? (
            <p>No internships found for your account</p>
          ) : (
            <ul>
              {userInternships.map((internship, index) => (
                <li key={index}>
                  <strong>{internship.organization}</strong> - {internship.role} <br />
                  From {new Date(internship.startDate).toLocaleDateString()} to{" "}
                  {new Date(internship.endDate).toLocaleDateString()} <br />
                  Status:{" "}
                  <strong>
                    {new Date(internship.endDate) < new Date()
                      ? "Completed"
                      : "Ongoing"}
                  </strong>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      </div>
    </div>
  );
}
