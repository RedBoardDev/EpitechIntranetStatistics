const ActivityList = ({ activList, totalXp }) => {
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
    }
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {activityTypes.map((type, index) => {
        let xpActivity = activitiesByType[type].reduce((total, activity) => {
          if (activity.status === 'present') {
            if (type === 'Talk') {
              return total + 1;
            } else if (type === 'Workshop') {
              return total + 2;
            } else if (type === 'Hackathon') {
              return total + 6;
            } else if (type === 'Experience') {
              return total + 3;
            }
          } else {
            if (type === 'Talk') {
              return total - 1;
            } else if (type === 'Workshop') {
              return total - 2;
            } else if (type === 'Hackathon') {
              return total - 6;
            } else if (type === 'Experience') {
              return total - 3;
            }
          }
          return total;
        }, 0);
        let nbActi = 0;
        let nbMaxActi = '∞';
        if (type === 'Talk') {
          nbActi = activitiesByType[type].length;
          nbMaxActi = 15;
        } else if (type === 'Workshop') {
          nbActi = activitiesByType[type].length;
          nbMaxActi = 10;
        } else if (type === 'Experience') {
          nbActi = activitiesByType[type].length;
          nbMaxActi = 8;
        } else if (type === 'Hackathon') {
          nbActi = activitiesByType[type].length;
        } else if (type === 'Projet') {
          const talksXp = activitiesByType['Talk'] ? activitiesByType['Talk'].length : 0;
          const workshopXp = activitiesByType['Workshop'] ? activitiesByType['Workshop'].length : 0;
          const hackathonXp = activitiesByType['Hackathon'] ? activitiesByType['Hackathon'].length : 0;
          const experiencesXp = activitiesByType['Experience'] ? activitiesByType['Experience'].length : 0;
          nbActi = activitiesByType[type].length;
          xpActivity = totalXp - (talksXp + workshopXp * 2 + hackathonXp * 6 + experiencesXp * 8);
        }

        let typeName = type.replace(/\[(.*?)\]/g, '');

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
                  {typeName} - {xpActivity} XP
                </span>
                <span style={{ fontSize: '1.2rem', margin: '10px' }}>
                  ({nbActi}/{nbMaxActi})
                </span>
              </div>
              <ul>
                {activitiesByType[type].map((activity, i) => {
                  const activityDate = new Date(activity.date);
                  const currentDate = new Date();
                  const dateColor = activityDate > currentDate ? styles.moduleBlue : activity.status === 'present' ? styles.moduleGreen : styles.moduleRed;

                  return (
                    <p
                      key={i}
                      style={{ ...dateColor, fontSize: '1.1rem' }}
                    >
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
