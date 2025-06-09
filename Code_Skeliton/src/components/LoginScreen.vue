<template>
  <div class="container">
    <div class="card">

      <h1>SPA</h1>

      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label class="labelLogin">Login Account</label>
          <input
            type="text"
            v-model="inpLoginAccnt"
            id="inpLoginAccnt"
            required
          />
        </div>

        <div class="input-group">
          <label class="labelLogin">Password</label>
          <div class="password-container">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="inpPassword"
              id="inpPassword"
              required
            />
          </div>
        </div>

        <button type="submit" class="btn btnLogin">LOGIN</button>
      </form>

    </div>
  </div>
</template>

<script>

/*Getting API base URL from env variable, http://10.17.1.162:5000/api */
const baseURL = process.env.VUE_APP_BASE_URL;

export default {
  data() {
    return {
      inpLoginAccnt: "",
      inpPassword: "",
      showPassword: false,
    };
  },

  mounted() {
    sessionStorage.removeItem("accessTokenInSessn");
  },

  methods: {
    handleLogin() {
      this.processLogin();
    },

    /*Performs authentication using login url, if login is success redirected to the transport translation screen
    If login failed error message will be displayed
    */
    async processLogin() {

      /*Login url to match with API*/
      const loginUrl = `${baseURL}/login`;

      /*Collecting credentials given by user*/
      let loginAccValue = `${this.inpLoginAccnt}`;
      let paswdValue = `${this.inpPassword}`;

      try {

        /*Sending loginrequest to API with user given credentials*/
        const loginUrlRes = await fetch(loginUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            loginAccount: loginAccValue,
            password: paswdValue,
          }),
        });

        /*If response of login prcosess is not 200, raising error. 
          All errors are handled in catch block only*/
        if (!loginUrlRes.ok) {
          throw new Error(`${loginUrlRes.status}`);
        }

        /*Once login is successful take the accesstoken from the response and 
          setting it in session storage. 
          Also redirecting to transport translation vue*/
        const dataFromRes = await loginUrlRes.json();
        if (dataFromRes != null) {
          sessionStorage.setItem("accessTokenInSessn", dataFromRes.accessToken);
          this.$router.push({ name: "TransportCompanyTranslationTable" });
        } else {
          throw new Error("404");
        }
      } catch (error) {
        switch (error.message) {
          case "400":
            alert("Bad request");
            break;
          case "401":
            alert("Unauthorised / Incorrect url");
            break;
          case "404":
            alert("Invalid credentials");
            break;
          default:
            alert("Error in login process. Unable to connect to the API");
        }
      }
    },
  },
};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #b2dfdb;
  height: 100vh;
  width: 100vw;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
}

.card h1 {
  text-align: center;
  color: #1a237e;
  font-size: 34px;
  font-weight: 100;
}

.input-group {
  margin-bottom: 10px;
}

.labelLogin {
  display: block;
  margin-bottom: 5px;
}

#inpLoginAccnt {
  width: 94%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.password-container {
  position: relative;
}

#inpPassword {
  width: 86%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding-right: 30px;
}

.btnLogin {
  float: right;
  width: 26%;
  padding: 10px;
  border-radius: 4px;
}
</style>
