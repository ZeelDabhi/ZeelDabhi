import PageManager from './page-manager';
import { createCheckoutService } from '@bigcommerce/checkout-sdk';

const service = createCheckoutService();

export default class Checkout extends PageManager {
    async onReady() {
        const state = await service.loadCheckout();
        
        //init function manage comment
        const initCheckbox = () => {
            const commentSection = document.querySelector('fieldset[data-test="checkout-shipping-comments"]');

            if (document.querySelector('#conditionCheckbox')) {
                console.log('Checkbox already added in this section.');
                return;
            }
            
            //create element & style checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = 'conditionCheckbox';
            checkbox.className = 'condition-checkbox';
            
            //create label for the checkbox
            const label = document.createElement('label');
            label.htmlFor = 'conditionCheckbox';
            label.textContent = 'Check if condtion met = >';
            
            //insert the checkbox
            commentSection.insertBefore(checkbox, commentSection.firstChild);
            commentSection.insertBefore(label, checkbox);
            
            //locate comment input field
            const commentsField = commentSection.querySelector('input[name="orderComment"]');
            const savedCheckboxState = localStorage.getItem('checkboxstate');
            const savedComment = localStorage.getItem('orderComment') || '';
            
            //restore checkbox & comment states
            checkbox.checked = savedCheckboxState === 'checked';

            if (commentsField) {
                commentsField.value = savedComment;
            }
            
            //update comment based on condition
            const updateComment = async () => {
                const isChecked = checkbox.checked;
                const userComment = commentsField?.value.trim() || '';
                let customerComment = userComment;
                let adminComment = '';

                if (isChecked && userComment) {
                    adminComment = `${userComment}\n------------------\nHold at Post Office (USPS Only)`;
                } else if (!isChecked && userComment) {
                    adminComment = userComment;
                } else if (isChecked && !userComment) {
                    adminComment = `------------------\nHold at Post Office (USPS Only)`;
                } else {
                    adminComment = '';
                }

                console.log('Updating checkout comments:', { customerComment, adminComment });
                
                //save checkbox state & comment to local
                localStorage.setItem('checkboxstate', isChecked ? 'checked' : 'unchecked');
                localStorage.setItem('orderComment', userComment);
                
                //update checkout with new admin comment
                try {
                    const updateResponse = await service.updateCheckout({
                        customerMessage: adminComment,
                    });
                    console.log('Checkout updated successfully:', updateResponse);
                } catch (error) {
                    console.error('Error updating checkout:', error);
                }
            };
               
            // Attach event listeners to update comments when changes occur
            checkbox.addEventListener('change', updateComment);
            if (commentsField) {
                commentsField.addEventListener('input', updateComment);
            }
        };

        let myInterval = setInterval(() => {
            const paymentSection = document.querySelector('.checkout-step--payment');
            if (paymentSection) {
                console.log('Payment section found:', paymentSection);
                clearInterval(myInterval);

                const observer = new MutationObserver(() => {
                    console.log('Reinitializing checkbox and comment logic.');
                    initCheckbox();
                });

                observer.observe(paymentSection, { childList: true, subtree: true });
            }
        }, 1000);
    }
}
