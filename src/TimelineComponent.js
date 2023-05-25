import React from 'react';
import Timeline, { SidebarHeader, TodayMarker, TimelineHeaders, DateHeader } from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';

const TimelineComponent = ({ projects }) => {
  console.log(projects);
  if (!projects) {
    return <div>Loading...</div>;
  }

  const groups = Object.keys(projects).map(group => ({
    id: group,
    title: group
  }));

  const items = [];
  Object.keys(projects).forEach(group => {
    projects[group].forEach(project => {
      items.push({
        id: project.title,
        group: group,
        title: project.title,
        start_time: new Date(project.begin).valueOf(),
        end_time: new Date(project.end).valueOf(),
        canMove: false,
        canResize: false,
        canChangeGroup: false,
        className: 'project-item',
        itemProps: {
          'data-tooltip': project.end_register
        }
      });
    });
  });

  const startDate = new Date(Math.min(...items.map(item => item.start_time)));
  const endDate = new Date(Math.max(...items.map(item => item.end_time)));

  return (
    <div style={{ borderRadius: '10px' }}>
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={startDate}
        defaultTimeEnd={endDate}
        sidebarWidth={300}
        lineHeight={60}
        itemHeightRatio={0.8}
        timeSteps={{ month: 1 }}
        canMove={false}
        canResize={false}
        canChangeGroup={false}
        stackItems={true}
      >
        <TimelineHeaders style={{backgroundColor: '#181c25', color:'darkblue'}}>
          <SidebarHeader canMove={false}/>
          <DateHeader
            unit="month"
            labelFormat="MMMM yyyy"
            style={{ pointerEvents: 'none', fontSize: '22px', fontWeight: 'bold' }}
          />
        </TimelineHeaders>
        <TodayMarker />
      </Timeline>
      <style jsx global>{`
        .project-item {
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
          height: 40px;
          display: flex;
          align-items: center;
          padding: 5 10px;
          font-size: 20px;
          font-weight: bold;
        }
        .rct-sidebar-header {
          pointer-events: none;
        }
        .rct-item-content {
          pointer-events: none;
        }
        .rct-date-header {
          background: none;
          color: black;
        }
        .rct-today-marker {
          z-index: 9999;
          background-color: blue;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default TimelineComponent;
