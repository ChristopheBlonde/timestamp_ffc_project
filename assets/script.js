document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const input = document.getElementById("date");
  const error = document.getElementById("error");
  const result = document.getElementById("result-container");
  const unix = document.getElementById("unix-date");
  const utc = document.getElementById("utc-date");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const value = input.value;
    const currentURL = window.location.href;
    try {
      const URL = `${currentURL}api/${value}`;
      const initfetch = {
        method: "GET",
        headers: new Headers(),
        mode: "cors",
        cache: "default",
      };
      const response = await fetch(URL, initfetch);
      try {
        const responseJson = await response.json();
        if (responseJson.error) {
          error.style.display = "block";
        } else {
          result.style.display = "flex";
          unix.innerText = responseJson.unix;
          utc.innerText = responseJson.utc;
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
    input.value = "";
  });
  input.addEventListener("change", (event) => {
    result.style.display = "none";
    error.style.display = "none";
  });
});
