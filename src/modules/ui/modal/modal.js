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

    setElemDisplay(elem, displayValue) {
        elem.style.display = displayValue;
    }

    //----------------------
    // Element getter
    //----------------------

    getModalContainer() {
        return this.template.querySelector('div.modal');
    }
}
