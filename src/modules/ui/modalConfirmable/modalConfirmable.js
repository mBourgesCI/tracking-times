import { LightningElement, api } from 'lwc';

export default class ModalConfirmable extends LightningElement {
    @api
    isVisible() {
        return this.getBaseModal().isVisible();
    }

    getBaseModal() {
        return this.template.querySelector('.modal-base');
    }
}
