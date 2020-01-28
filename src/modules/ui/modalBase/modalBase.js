import { LightningElement, api } from 'lwc';

export default class ModalBase extends LightningElement {
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
