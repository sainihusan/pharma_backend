const testSignup = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: "Local Test User",
        email: "antigravitylocal@yopmail.com",
        password: "Password123!",
        dateOfBirth: "1990-01-01",
        gender: "male"
      })
    });
    const data = await response.json();
    console.log("Response:", data);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

testSignup();
