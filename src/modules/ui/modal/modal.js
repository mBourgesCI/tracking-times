import { LightningElement, track } from 'lwc';

export default class Entry extends LightningElement {
    @track
    label = {
        title: 'Head',
        button: {
            close: 'Close'
        }
    };

    //----------------------
    // Event handler
    //----------------------

    handleButtonClickClose() {
        this.hideModal();
    }

    //----------------------
    // Busines logig
    //----------------------

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
