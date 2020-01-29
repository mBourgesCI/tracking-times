import { LightningElement, api } from 'lwc';

export default class ModalThreeSections extends LightningElement {
    @api
    isVisible() {
        return this.getBaseModal().isVisible();
    }

    @api
    show() {
        return this.getBaseModal().show();
    }

    getBaseModal() {
        return this.template.querySelector('.modal-base');
    }
}
