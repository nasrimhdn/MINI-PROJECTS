import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//REACT
import { useEffect, useState } from "react";
// MUI Components
import Container from "@mui/material/Container";
import { Button, Typography } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
//External
import axios from "axios";
import moment from "moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";

moment.locale("ar");

function App() {
  // ===================== STATE VARIABLES ==============================
  const { t, i18n } = useTranslation();
  const [date, setDate] = useState("");
  const [temp, setTemp] = useState({
    number: null,
    min: null,
    max: null,
    discription: "",
    icon: null,
    feelsTemp: null,
  });
  const [locale, setLocale] = useState("ar");

  // =======================EVENT HANDLERS ==============================
  function handleLanguageClick() {
    if (locale === "en") {
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    } else {
      setLocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    }
    setDate(moment().add(10, "days").calendar());
  }
  useEffect(() => {
    //
    i18n.changeLanguage("ar");
    //
    setDate(moment().add(10, "days").calendar());
    //
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=24.7&lon=46.6&appid=af0ca7a62e076d97442cd02c72f6b3cb"
      )
      .then(function (response) {
        console.log(response);
        const responseTemp = Math.round(response.data.main.temp - 273.15);
        const min = Math.round(response.data.main.temp_min - 273.15);
        const max = Math.round(response.data.main.temp_max - 273.15);
        const discription = response.data.weather[0].description;
        const icon = response.data.weather[0].icon;
        const feelsTemp = Math.round(response.data.main.feels_like - 273.15);

        setTemp({
          number: responseTemp,
          min: min,
          max: max,
          discription: discription,
          icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
          feelsTemp: feelsTemp,
        });
        console.log(responseTemp);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const theme = createTheme({
    typography: {
      fontFamily: ["IBM"],
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Container maxWidth="sm">
          {/* CONTENT CONTAINER */}
          <div
            style={{
              height: "100vh ",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {/* CARD */}
            <div
              dir={locale == "ar" ? "rtl" : "ltr"}
              style={{
                width: "100%",
                background: "rgb(28 52 91 / 36%)",
                color: "white",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: " 0px 11px rgba(0,0,0,0.05)",
              }}
            >
              {/* Content */}
              <div>
                {/* CITY & TIME */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "start",
                  }}
                  dir={locale == "ar" ? "rtl" : "ltr"}
                >
                  {" "}
                  <Typography
                    variant="h2"
                    style={{ marginRight: "20px", fontWeight: "600" }}
                  >
                    {t("Riyadh")}
                  </Typography>
                  <Typography variant="h5" style={{ marginRight: "20px" }}>
                    {date}
                  </Typography>
                </div>
                {/*=== CITY & TIME ===*/}
                <hr />
                {/* CONTAINER OF DEGREE & ICON */}
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  {/* DEGREE & DISCRIPTION */}
                  <div>
                    {/* TEMP */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h1" style={{ textAlign: "right" }}>
                        {temp.number}
                      </Typography>
                      <img alt="weatherImg" src={temp.icon} />
                    </div>
                    {/*=== TEMP ===*/}
                    <Typography variant="h6">{t(temp.discription)}</Typography>
                    <Typography variant="h6">
                      {" "}
                      {t(" feels like")}
                      {temp.feelsTemp}
                    </Typography>

                    {/* MIN & MAX */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h5>
                        {t("min")}: {temp.min}
                      </h5>
                      <h5 style={{ margin: "0px 5px" }}> | </h5>
                      <h5>
                        {t("max")}: {temp.max}
                      </h5>
                    </div>
                    {/*=== MIN & MAX ===*/}
                  </div>
                  {/*=== DEGREE & DISCRIPTION ===*/}
                  <CloudIcon style={{ fontSize: "200px", color: "white" }} />
                </div>
                {/* CONTAINER OF DEGREE & ICON */}
              </div>
              {/*=== Content ===*/}
            </div>
            {/*=== CARD ===*/}
            {/* TRANSLATION CONTAINER BTN */}
            <div
              dir={locale == "ar" ? "rtl" : "ltr"}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
                marginTop: "  20px",
              }}
            >
              <Button
                style={{ color: "white" }}
                variant="text"
                onClick={handleLanguageClick}
              >
                {locale === "ar" ? "English" : "العربية"}
              </Button>
            </div>
            {/*=== TRANSLATION CONTAINER BTN ===*/}
          </div>
          {/*=== CONTENT CONTAINER ===*/}
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
