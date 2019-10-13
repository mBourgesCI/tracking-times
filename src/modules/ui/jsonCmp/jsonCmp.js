import { LightningElement, api, track } from 'lwc';

export default class JsonCmp extends LightningElement {
    @api inputJson;

    @track state = {};
}
