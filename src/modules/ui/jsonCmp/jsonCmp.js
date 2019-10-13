import { LightningElement, api, track } from 'lwc';

export default class JsonCmp extends LightningElement {
    @api
    get inputJson() {
        return this.state.api.value;
    }
    set inputJson(value) {
        this.state.api.value = value.value;
    }

    @track
    state = { api: {} };

    handleChamge(event) {
        this.state.api.value = event.target.value;
    }
}
