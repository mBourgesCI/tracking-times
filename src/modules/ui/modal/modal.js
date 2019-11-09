import { LightningElement, track } from 'lwc';

export default class Entry extends LightningElement {
    @track
    label = {
        title: 'Head',
        button: {
            close: 'Close'
        }
    };

    handleButtonClickClose() {
        this.hideModal();
    }

    hideModal() {
        var modalElem;
        modalElem = this.getModalContainer();
        this.setElemDisplay(modalElem, 'none');
    }

    getModalContainer() {
        return this.template.querySelector('div.modal');
    }

    setElemDisplay(elem, displayValue) {
        elem.style.display = displayValue;
    }
}
