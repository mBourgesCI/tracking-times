import { LightningElement, api, track } from 'lwc';

export default class JsonCmp extends LightningElement {
    @api
    get inputJson() {
        return this.state.api.inputJson;
    }
    set inputJson(value) {
        this.state.api.inputJson = value;
    }

    @track state = { api: {} };
}
