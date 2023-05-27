const ActivityList = ({ activList, xpAct }) => {
  const activitiesByType = activList.reduce((activities, activity) => {
    const { type } = activity;
    if (!activities[type]) {
      activities[type] = [];
    }
    activities[type].push(activity);
    return activities;
  }, {});

  const activityTypes = Object.keys(activitiesByType);

  const styles = {
    moduleBlue: {
      color: 'blue',
    },
    moduleGreen: {
      color: 'green',
    },
    moduleRed: {
      color: 'red',
    },
    moduleYellow: {
      color: 'yellow',
    },
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {activityTypes.map((type, index) => {
        const findAct = xpAct.find((act) => act.name === type || act.alias.includes(type));
        return (
          <div
            key={index}
            className='HubBox'
            style={{
              background: '#181c25',
              color: '#fff',
              width: '45%',
              padding: '10px',
              textAlign: 'center',
              marginBottom: '20px',
              margin: '10px',
              borderRadius: '10px',
              border: '1px solid #87ceeb',
            }}
          >
            <div className="ActivityBox" style={{ height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.5rem', margin: '10px' }}>
                  {type} - {findAct.nbXPTotal} XP
                </span>
                <span style={{ fontSize: '1.2rem', margin: '10px' }}>
                  ({findAct.nbPart}/{ ((findAct?.limitPart || 100) === 100 ? '∞' : findAct.limitPart) })
                </span>
              </div>
              <ul>
              {activitiesByType[type].map((activity, i) => {
                const activityDate = new Date(activity.date);
                const currentDate = new Date();
                const dateColor =
                  activityDate > currentDate
                    ? styles.moduleBlue
                    : activity.status === 'present'
                    ? styles.moduleGreen
                    : activity.status === 'organisateur'
                    ? styles.moduleYellow
                    : styles.moduleRed;

                return (
                  <p key={i} style={{ ...dateColor, fontSize: '1.1rem' }}>
                    {activity.title.replace(/\[(.*?)\]/g, '')} - {activity.date}
                  </p>
                );
              })}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActivityList;