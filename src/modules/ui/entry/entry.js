import { LightningElement, api } from 'lwc';

export default class Entry extends LightningElement {
    @api startDate;
    @api endDate;
}
