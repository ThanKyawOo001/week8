import { useState } from "react";

const hobbies = [
  { value: "music", name: "Music" },
  { value: "movie", name: "Movies" },
  { value: "plastic-model", name: "Plastic Model" },
];

const genders = [
  { value: "male", name: "Male" },
  { value: "female", name: "Female" },
  { value: "others", name: "Others" },
];

const departments = {
  Accounting: [
    "Accountant",
    "Senior Accountant",
    "Payroll Officer",
  ],
  IT: [
    "Developer",
    "Frontend Developer",
    "System Analyst",
  ],
  HR: [
    "HR Officer",
    "Recruiter",
    "HR Manager",
  ],
};

function UserRegistration() {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [selectedHobbies, setSelectedHobbies] = useState([]);

  const departmentNames = Object.keys(departments);

  const [department, setDepartment] = useState(departmentNames[0]);
  const [job, setJob] = useState(departments[departmentNames[0]][0]);

  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState({});

  const handleDepartmentChange = (e) => {
    const dept = e.target.value;
    setDepartment(dept);
    setJob(departments[dept][0]);
  };

  const handleHobbyChange = (e) => {
    const value = e.target.value;

    if (e.target.checked) {
      setSelectedHobbies([...selectedHobbies, value]);
    } else {
      setSelectedHobbies(
        selectedHobbies.filter((hobby) => hobby !== value)
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setResult({
      username,
      firstname,
      lastname,
      gender,
      hobbies: selectedHobbies,
      job,
    });

    setSubmitted(true);
  };

  const handleReset = () => {
    setUsername("");
    setFirstname("");
    setLastname("");
    setGender("");
    setSelectedHobbies([]);

    setDepartment(departmentNames[0]);
    setJob(departments[departmentNames[0]][0]);

    setSubmitted(false);
  };

  return (
    <div
      style={{
        width: "700px",
        margin: "20px auto",
        border: "1px solid #ccc",
        padding: "20px",
      }}
    >
      <h2>User Registration</h2>
      <hr />

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ width: "120px", display: "inline-block" }}>
            Username
          </label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ width: "120px", display: "inline-block" }}>
            Firstname
          </label>

          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ width: "120px", display: "inline-block" }}>
            Lastname
          </label>

          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ width: "120px", display: "inline-block" }}>
            Gender
          </label>

          {genders.map((g) => (
            <label key={g.value} style={{ marginRight: "10px" }}>
              <input
                type="radio"
                name="gender"
                value={g.value}
                checked={gender === g.value}
                onChange={(e) => setGender(e.target.value)}
              />
              {g.name}
            </label>
          ))}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ width: "120px", display: "inline-block" }}>
            Hobbies
          </label>

          {hobbies.map((hobby) => (
            <label key={hobby.value} style={{ marginRight: "10px" }}>
              <input
                type="checkbox"
                value={hobby.value}
                checked={selectedHobbies.includes(hobby.value)}
                onChange={handleHobbyChange}
              />
              {hobby.name}
            </label>
          ))}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ width: "120px", display: "inline-block" }}>
            Department
          </label>

          <select
            value={department}
            onChange={handleDepartmentChange}
          >
            {departmentNames.map((dept) => (
              <option key={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ width: "120px", display: "inline-block" }}>
            Job Position
          </label>

          <select
            value={job}
            onChange={(e) => setJob(e.target.value)}
          >
            {departments[department].map((position) => (
              <option key={position}>
                {position}
              </option>
            ))}
          </select>
        </div>

        <hr />

        <div style={{ textAlign: "right" }}>
          <button
            type="button"
            onClick={handleReset}
            style={{ marginRight: "10px" }}
          >
            Reset
          </button>

          <button type="submit">
            Submit
          </button>
        </div>
      </form>

      {submitted && (
        <div style={{ marginTop: "30px" }}>
          <table>
            <tbody>
              <tr>
                <td><b>Username</b></td>
                <td>{result.username}</td>
              </tr>

              <tr>
                <td><b>Firstname</b></td>
                <td>{result.firstname}</td>
              </tr>

              <tr>
                <td><b>Lastname</b></td>
                <td>{result.lastname}</td>
              </tr>

              <tr>
                <td><b>Hobbies</b></td>
                <td>{result.hobbies.join(", ")}</td>
              </tr>

              <tr>
                <td><b>Gender</b></td>
                <td>{result.gender}</td>
              </tr>

              <tr>
                <td><b>Job</b></td>
                <td>{result.job}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserRegistration;