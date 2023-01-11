// //1. import
// import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT} from 'scheduler-react'
// //include `react-big-scheduler/lib/css/style.css` for styles, link it in html or import it here
// import 'scheduler-react/lib/css/style.css'
// import moment from 'moment'
// // ...

// //2. create the view model, put it in the props obj
// //set locale moment to the schedulerData, if your locale isn't English. By default, Scheduler comes with English(en, United States).
// moment.locale('zh-cn');
// let schedulerData = new SchedulerData(new moment().format(DATE_FORMAT), ViewTypes.Week);
// schedulerData.setLocaleMoment(moment);
// //set resources here or later
// let resources = [
//                         {
//                   id: 'r0',
//                   name: 'Resource0',
//                   author: "X",
//                   bgColor: 'red',
//                   issue: '#1'
//               },
//               {
//                   id: 'r1',
//                   name: 'Resource1',
//                   author: "X",
//                   bgColor: '#D9D9D9',
//                   issue: '#2'
//               },
//               {
//                   id: 'r2',
//                   name: 'Resource2',
//                   author: "X",
//                   issue: '#99'
//               },
//                 ];
// schedulerData.setResources(resources);
// //set events here or later,
// //the event array should be sorted in ascending order by event.start property, otherwise there will be some rendering errors
// let events = [
//                   {
//                       id: 1,
//                       start: '2017-12-18 09:30:00',
//                       end: '2017-12-19 23:30:00',
//                       resourceId: 'r1',
//                       title: 'I am finished',
//                       label: 'QA Failed',
//                       img: 'https://miro.medium.com/fit/c/28/28/1*UJzclN5h-DYWjRyVqXThUw.png',
//                       bgColor: '#D9D9D9',
//                       showPopover: false
//                   },
//                   {
//                       id: 2,
//                       start: '2017-12-18 12:30:00',
//                       end: '2017-12-26 23:30:00',
//                       resourceId: 'r2',
//                       title: 'I am not resizable',
//                       label: 'Development',
//                       resizable: false
//                   },
//                  {
//                      id: 3,
//                      start: '2017-12-19 12:30:00',
//                      end: '2017-12-20 23:30:00',
//                      resourceId: 'r3',
//                      title: 'I am not movable',
//                      movable: false
//                  },
//                  {
//                      id: 4,
//                      start: '2017-12-19 14:30:00',
//                      end: '2017-12-20 23:30:00',
//                      resourceId: 'r1',
//                      title: 'I am not start-resizable',
//                      startResizable: false
//                  },
//                  {
//                      id: 5,
//                      start: '2017-12-19 15:30:00',
//                      end: '2017-12-20 23:30:00',
//                      resourceId: 'r2',
//                      title: 'R2 has recurring tasks every week on Tuesday, Friday',
//                      rrule: 'FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=TU,FR',
//                      bgColor: '#f759ab'
//                  }
//              ];
// schedulerData.setEvents(events);

// // ...

// //3. render the scheduler component, mind that the Scheduler component should be placed in a DragDropContext(father or ancestor).
// // ...
// const {schedulerData} = this.props;
// <Scheduler schedulerData={schedulerData}
//            prevClick={this.prevClick}
//            nextClick={this.nextClick}
//            onSelectDate={this.onSelectDate}
//            onViewChange={this.onViewChange}
//            eventItemClick={this.eventClicked}
// />