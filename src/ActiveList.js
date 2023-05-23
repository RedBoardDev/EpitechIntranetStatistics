import React from 'react';

const ActivityList = ({ activList }) => {
  // Créer un objet pour grouper les activités par type
  const activitiesByType = activList.reduce((activities, activity) => {
    const { type } = activity;
    if (!activities[type]) {
      activities[type] = [];
    }
    activities[type].push(activity);
    return activities;
  }, {});

  // Créer un tableau de types pour l'affichage
  const activityTypes = Object.keys(activitiesByType);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '10px', height: '100%'}}>
      {activityTypes.map((type, index) => (
        <div key={index} className='HubBox'>
          <div className="ActivityBox">
            <span style={{ fontSize: '1.5rem'}}>
              {type}
            </span>
            <ul>
              {activitiesByType[type].map((activity, i) => (
                <p key={i} className={activity.status === "present" ? 'module-green' : 'module-red'} style={{fontSize: '1.1rem'}}>
                  {activity.title}
                  <br />
                  Date: {activity.date}
                </p>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityList;
