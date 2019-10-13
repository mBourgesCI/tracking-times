import { LightningElement, api, track } from 'lwc';

export default class JsonCmp extends LightningElement {
    /**
     * @api Annotaion will open variables and properties
     * for external access ,
     */
    @api
    // A getter is required for api-properties. Even if not used.
    get inputJson() {
        return this.state.api.value;
    }
    set inputJson(value) {
        /**
         * It is possible to store the input-json as-is. But in that case
         * it will be immutable. Attempting of change it will result in
         * an error.
         * Therefore the value needs to be extracted from the input and
         * stored separatly.
         */
        this.state.api.value = value.value;
    }

    /**
     * @track Annotation will make the markup keep updateing the value.
     */
    @track
    state = { api: {} };

    handleChamge(event) {
        this.state.api.value = event.target.value;
    }
}
