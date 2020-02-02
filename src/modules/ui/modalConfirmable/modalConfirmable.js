import { LightningElement, api } from 'lwc';

export default class ModalConfirmable extends LightningElement {
    @api
    isVisible() {
        return this.getBaseModal().isVisible();
    }

    @api
    show() {
        return this.getBaseModal().show();
    }

    @api
    hide() {
        return this.getBaseModal().hide();
    }

    getBaseModal() {
        return this.template.querySelector('.modal-base');
    }
}
