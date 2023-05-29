import React from 'react';
import Timeline, { SidebarHeader, TodayMarker, TimelineHeaders, DateHeader } from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';

const CustomTodayMarker = () => {
  return (
    <TodayMarker interval={1000}>
      {({ styles, date }) => (
        <div className="custom-today-marker" style={styles}>
          <div className="marker-circle"></div>
        </div>
      )}
    </TodayMarker>
  );
};

const TimelineComponent = ({ projects }) => {
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
        },
        itemContentRenderer: ({ item }) => (
          <div className="project-item-content">
            <div className="project-title">{item.title}</div>
            <div className="project-dates">
              {new Date(item.start_time).toLocaleDateString()} - {new Date(item.end_time).toLocaleDateString()}
            </div>
          </div>
        )
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
        visibleTimeStart={startDate}
        visibleTimeEnd={endDate}
        sidebarWidth={300}
        lineHeight={60}
        itemHeightRatio={0.8}
        timeSteps={{ month: 1 }}
        canMove={false}
        canResize={false}
        canChangeGroup={false}
        stackItems={true}
        buffer={1}
      >
        <TimelineHeaders style={{ backgroundColor: '#181c25', color: 'darkblue' }}>
          <SidebarHeader canMove={false} />
          <DateHeader
            unit="month"
            labelFormat="MMMM yyyy"
            style={{ pointerEvents: 'none', fontSize: '22px', fontWeight: 'bold' }}
          />
        </TimelineHeaders>
        <CustomTodayMarker />
      </Timeline>
      <style jsx global>{`
        .project-item {
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
          height: 40px;
          display: flex;
          align-items: center;
          padding: 5px 10px;
          font-size: 20px;
          font-weight: bold;
        }
        .project-item-content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .project-title {
          margin-bottom: 5px;
        }
        .project-dates {
          font-size: 12px;
          color: gray;
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
        .custom-today-marker {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
        }
        .marker-circle {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 16px;
          height: 16px;
          background-color: white;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default TimelineComponent;
