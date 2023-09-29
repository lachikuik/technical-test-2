import React from "react";
import { useState,useEffect } from "react";

import api from "../services/api";

const BudgetByMonth = ({project}) => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    (async () => {
      let d = new Date();
      let dateQuery = "";
      if (project.paymentCycle === "ONE_TIME") {
        d = new Date(project.created_at);
        dateQuery = "gte:";
      }
      const date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1));
      const { data } = await api.get(`/activity?projectId=${encodeURIComponent(project._id)}&date=${dateQuery}${date.getTime()}`);
      setActivities(data);
    })();
  }, []);

  return activities.map(activity => {
    return(
      <div key={activity._id} className="budgetByMonth">
        <span>month: {monthNames[new Date (activity.date).getMonth()]} </span>
        <span>sold: {(activity.detail.map(x =>{
          return x.value;
        }).reduce((x, y) => x + y) / 8) * activity.userSellPerDay}€</span>
        <span>cost: {activity.cost}€</span>
      </div>
    );
  });
  
};

export default BudgetByMonth;