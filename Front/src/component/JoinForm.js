import { useState } from "react";
import { joinMember } from "../api";
import "./JoinForm.css";

function JoinForm() {
  const [joinData, setJoinData] = useState({
    userId: "",
    password: "",
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    setJoinData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleJoinSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", joinData.userId);
    formData.append("password", joinData.password);
    formData.append("name", joinData.name);
    formData.append("email", joinData.email);
    formData.append("tag", "Front");
    formData.append("imageUrl", "");

    console.log(joinData);
    console.log(formData);
    await joinMember(formData);
  };

  const handleOverlapCheck = (e) => {
    e.preventDefault();
    console.log("중복체크버튼");
    // 대충 중복체크
  };

  return (
    <div>
      <form onSubmit={handleJoinSubmit} className="joinForm">
        아이디 : <input name="userId" onChange={handleChange} />{" "}
        <button onClick={handleOverlapCheck}>중복확인</button>
        <br />
        비밀번호 : <input name="password" onChange={handleChange} />
        <br />
        이름 : <input name="name" onChange={handleChange} />
        <br />
        이메일 : <input name="email" onChange={handleChange} />
        <br />
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}

export default JoinForm;
