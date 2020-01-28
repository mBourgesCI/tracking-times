import { LightningElement, api } from 'lwc';

export default class ModalBase extends LightningElement {
    @api
    isVisible() {
        return false;
    }
}
