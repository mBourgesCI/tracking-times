import { LightningElement, api, track } from 'lwc';

export default class JsonCmp extends LightningElement {
    @api
    get inputJson() {
        return this.state.api.value;
    }
    /**
     * It is possible to store the input-json as-is. But in that case
     * it will be immutable. Attempting of change it will result in
     * an error.
     * Therefore the value needs to be extracted from the input and
     * stored separatly.
     */
    set inputJson(value) {
        this.state.api.value = value.value;
    }

    @track
    state = { api: {} };

    handleChamge(event) {
        this.state.api.value = event.target.value;
    }
}
