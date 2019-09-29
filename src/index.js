import { createElement } from 'lwc';
import TimeTracking from 'app/timeTracking';

const timetracking = createElement('app-timeTracking', { is: TimeTracking });
// eslint-disable-next-line @lwc/lwc/no-document-query
document.querySelector('#main').appendChild(timetracking);
