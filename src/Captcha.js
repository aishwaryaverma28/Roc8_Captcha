import React, { useState,useEffect } from "react";

function Captcha() {
  const [captcha, setCaptcha] = useState(generateCaptcha()); // generate initial captcha on component mount
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [theme, setTheme] = useState("light-theme");
  const toggleTheme = () => {
    if(theme === "dark-theme"){
        setTheme('light-theme');
    }
    else{
        setTheme("dark-theme");
    }
    // alert("hi");
    
  }
  useEffect(() => {
    document.body.className = theme;
}, [theme]);

  function generateCaptcha() {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars[Math.floor(Math.random() * chars.length)];
    }
    return captcha;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (isValid) {
      // submit form
      alert('form submited');
      console.log("Form submitted successfully!");
    } else {
      // show error message
      alert('invalid Captcha');
      console.log("Invalid captcha!");
    }
  }

  function handleInput(event) {
    setInput(event.target.value);
    setIsValid(event.target.value === captcha);
  }

  function handleRefresh() {
    setCaptcha(generateCaptcha());
    setInput("");
    setIsValid(false);
  }

  return (
    <div className="container">
        <div className="inner">
    <a href="#" className="btn" onClick={() => toggleTheme()}>Toggle Mode</a>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
      </div>
      <div>
        <label htmlFor="captcha">Enter captcha:</label>
        <input type="text" id="captcha" name="captcha" value={input} onChange={handleInput} /><br/>
        <span>{captcha}</span> {/* display captcha text */}<br/>
        <button type="button" onClick={handleRefresh}>
          Refresh
        </button>
      </div>
      <button type="submit">Sign Up</button>
    </form>
    </div>
    </div>
  );
}
export default Captcha;