import React from 'react';

const TimelineComp = (data) => {
  const setup = {
    months: ['September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July'],
    modules: {
      'B4 - Concurrent Programming': [
        { title: 'The Plazza', begin: '2023-05-08 09:00:00', end: '2023-05-28 23:42:00', end_register: '2023-05-14 23:42:00' },
        { title: 'Panoramix', begin: '2023-04-24 09:00:00', end: '2023-05-07 23:42:00', end_register: '2023-04-26 23:42:00' }
      ],
      'B4 - Functional programming': [
        { title: 'Image Compressor', begin: '2023-03-20 08:00:00', end: '2023-04-23 23:42:00', end_register: '2023-03-26 23:42:00' },
        { title: 'Wolfram', begin: '2023-02-27 08:00:00', end: '2023-03-12 23:42:00', end_register: '2023-03-05 23:42:00' }
      ],
      'B4 - Mathematics': [
        { title: '209poll', begin: '2023-05-15 08:42:00', end: '2023-05-28 23:42:00', end_register: '2023-05-19 09:42:00' },
        { title: '208dowels', begin: '2023-05-08 08:42:00', end: '2023-05-21 23:42:00', end_register: '2023-05-12 09:42:00' },
        { title: '207demography', begin: '2023-05-01 08:42:00', end: '2023-05-14 23:42:00', end_register: '2023-05-05 09:42:00' },
        { title: '206neutrinos', begin: '2023-04-24 08:42:00', end: '2023-05-07 23:42:00', end_register: '2023-04-28 09:42:00' },
        { title: '205IQ', begin: '2023-04-10 08:42:00', end: '2023-04-23 23:42:00', end_register: '2023-04-14 09:42:00' },
        { title: '204ducks', begin: '2023-03-27 08:42:00', end: '2023-04-09 23:42:00', end_register: '2023-03-31 09:42:00' },
        { title: '203hotline', begin: '2023-03-13 08:42:00', end: '2023-03-26 23:42:00', end_register: '2023-03-17 08:42:42' },
        { title: '202unsold', begin: '2023-02-27 08:42:00', end: '2023-03-12 23:42:00', end_register: '2023-03-05 23:42:00' },
        { title: '201yams', begin: '2023-02-13 08:42:00', end: '2023-02-26 23:42:00', end_register: '2023-02-17 08:42:42' }
      ],
      'B4 - Network Programming': [
        { title: 'my_teams', begin: '2023-03-20 08:00:00', end: '2023-04-23 23:42:00', end_register: '2023-03-26 08:00:00' },
        { title: 'my_ftp', begin: '2023-02-13 08:00:00', end: '2023-03-12 23:42:00', end_register: '2023-02-20 08:00:00' }
      ],
      'B4 - Object-Oriented Programming': [
        { title: 'Raytracer', begin: '2023-04-17 08:00:00', end: '2023-05-14 23:42:00', end_register: '2023-04-23 23:42:00' },
        { title: 'Arcade', begin: '2023-03-13 08:00:00', end: '2023-04-09 23:42:00', end_register: '2023-03-26 23:42:00' },
        { title: 'NanoTekSpice', begin: '2023-02-06 08:00:00', end: '2023-03-05 23:42:00', end_register: '2023-02-19 23:42:00' }
      ],
      'B4 - Year-End-Project - Zappy': [
        { title: 'Zappy', begin: '2023-05-22 09:00:00', end: '2023-06-25 23:42:00', end_register: '2023-06-04 23:42:00' }
      ],
      'B4 - x86-64 Assembly': [
        { title: 'MiniLibC', begin: '2023-02-06 08:42:00', end: '2023-02-26 23:42:42', end_register: '2023-02-19 23:42:42' }
      ]
    }
  };

  const getMonthIndex = (date) => {
    const [year, month] = date.split('-');
    return (parseInt(year, 10) - 2023) * 12 + parseInt(month, 10);
  };

  const getGridPosition = (begin, end) => {
    const startMonth = getMonthIndex(begin);
    const endMonth = getMonthIndex(end);
    return `${startMonth} / ${endMonth + 1}`;
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', width: '100%', height: '100%', padding: '10px' }}>
      {Object.keys(setup.modules).map((module) => (
        <div key={module} style={{ display: 'flex', flexDirection: 'column', border: '1px solid black', padding: '10px' }}>
          <h2>{module}</h2>
          {setup.modules[module].map((project) => (
            <div key={project.title} style={{ gridColumn: getGridPosition(project.begin, project.end) }}>
              <h3>{project.title}</h3>
              <p>Begin: {project.begin}</p>
              <p>End: {project.end}</p>
              <p>End Registration: {project.end_register}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TimelineComp;
