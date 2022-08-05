import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function forecast({ data }) {
  const weekDays = new Date().getDate();
  const weatherForecastDays = WEEK_DAYS.splice(weekDays, WEEK_DAYS.length).concat(
    WEEK_DAYS.splice(0, weekDays)
  );

  console.log(weatherForecastDays)

  return (
    <>
      <label className="title">Daily</label>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, idx) => {
          return (
            <AccordionItem key={idx}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className="daily-item">
                    <img
                      src={`icons/${item.weather[0].icon}.png`}
                      alt="weather"
                      className="icon-small"
                    />
                    <label className="day">{weatherForecastDays[idx]}</label>
                    <label className="description">{item.weather[0].description}</label>
                    <label className="min-max">Min-temp: {Math.round(item.main.temp_min)}°C And Max-Temp: {Math.round(item.main.temp_max)}°C</label>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="daily-details-grid">
                    <div className="daily-details-grid-item">
                        <label htmlFor="">Pressure</label>
                        <label htmlFor="">{item.main.pressure} Pa</label>
                    </div>
                    <div className="daily-details-grid-item">
                        <label htmlFor="">Humidity</label>
                        <label htmlFor="">{item.main.humidity} %</label>
                    </div>
                    <div className="daily-details-grid-item">
                        <label htmlFor="">Clouds</label>
                        <label htmlFor="">{item.clouds.all} %</label>
                    </div>
                    <div className="daily-details-grid-item">
                        <label htmlFor="">Sea Level</label>
                        <label htmlFor="">{item.main.sea_level} m</label>
                    </div>
                    <div className="daily-details-grid-item">
                        <label htmlFor="">Wind Speed:</label>
                        <label htmlFor="">{item.wind.speed} m/s</label>
                    </div>
                    <div className="daily-details-grid-item">
                        <label htmlFor="">Feels Like: </label>
                        <label htmlFor="">{item.main.feels_like} °C</label>
                    </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
}

export default forecast;
