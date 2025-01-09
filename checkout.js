import PageManager from './page-manager';
import { createCheckoutService } from '@bigcommerce/checkout-sdk';

const service = createCheckoutService();

export default class Checkout extends PageManager {
    async onReady() {
        const state = await service.loadCheckout();
        let myinter=setInterval(() => {
            let pymetsection= document.querySelector(".checkout-step--payment")
            if(pymetsection){
                console.log("pymetsection",pymetsection)
                clearInterval(myinter)
                const observer = new MutationObserver(async (mutations)  => {
                    console.log('DOM reinitializing checkbox');

                    let orderbutton=document.querySelector("#checkout-payment-continue")
                    if(orderbutton){
                        console.log("orderbutton",orderbutton);
                        const isChecked = localStorage.getItem('checkboxstate') === 'checked';
                    const userComment = localStorage.getItem('orderComment') || '';
                    let finalComment = '';

                    if (isChecked && userComment) {
                        finalComment = `${userComment}\n------------------\nHold at Post Office (USPS Only)`;
                    } else if (!isChecked && userComment) {
                        finalComment = userComment;
                    } else if (isChecked && !userComment) {
                        finalComment = `------------------\nHold at Post Office (USPS Only)`;
                    } else {
                        finalComment = '';
                    }

                    console.log('Updating checkout after payment selection with final comment:', finalComment);

                    try {
                        const updateResponse = await service.updateCheckout({
                            customerMessage: finalComment,
                        });
                        console.log('Checkout updated successfully after payment selection:', updateResponse);
                    } catch (error) {
                        console.error('Error updating checkout after payment selection:', error);
                    }
                    }
                    
                });
    
                observer.observe(pymetsection, { childList: true, subtree: true });
            }
        }, 1000);

    }}