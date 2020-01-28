import { LightningElement, api, track } from 'lwc';

export default class ModalBase extends LightningElement {
    @track
    visible = false;

    @api
    isVisible() {
        return this.visible;
    }

    @api
    hide() {
        this.visible = false;
    }

    @api
    show() {
        this.visible = true;
    }
}
