import PageManager from './page-manager';
import { createCheckoutService } from '@bigcommerce/checkout-sdk';

const service = createCheckoutService();

export default class Checkout_old extends PageManager {
    async onReady() {
        try {
            const state = await service.loadCheckout();
            console.log("Checkout loaded: ", state);

            const address = {
                firstName: 'Zeel',
                lastName: 'Dabhi',
                address1: 'Dhaval nagar -2',
                city: 'Mandvi',
                stateOrProvinceCode: 'GJ',
                postalCode: '370465',
                countryCode: 'IN',
                phone: '9876543210',
                email: 'zeeldabhi@gmail.com'
            };

            await service.updateShippingAddress(address);
            console.log("Shipping address updated.");

            await service.updateBillingAddress(address);
            console.log("Billing address updated.");

            const couponCode = "DISCOUNT2024";
            await service.applyCoupon(couponCode);
            console.log(`Coupon '${couponCode}' applied successfully.`);

            const resetCheckbox = async () => {
                const cart = service.getState().data.getCart();
                const savedCartId = localStorage.getItem('savecartid');

                if (savedCartId !== cart.id) {
                    console.log('Cart is updated, resetting checkbox state.');
                    localStorage.setItem('checkboxstate', 'unchecked');
                    localStorage.setItem('orderComment', '');
                }

                localStorage.setItem('savecartid', cart.id);
            };

            const initCheckbox = () => {
                const commentSection = document.querySelector('fieldset[data-test="checkout-shipping-comments"]');

                if (!commentSection) {
                    console.log('Comment section not found.');
                    return;
                }

                if (document.querySelector('#conditionCheckbox')) {
                    console.log('Checkbox already added in this section.');
                    return;
                }

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = 'conditionCheckbox';
                checkbox.className = 'condition-checkbox';

                const label = document.createElement('label');
                label.htmlFor = 'conditionCheckbox';
                label.textContent = 'Check this box if condition is met =>';

                commentSection.insertBefore(checkbox, commentSection.firstChild);
                commentSection.insertBefore(label, checkbox);

                const commentsField = commentSection.querySelector('input[name="orderComment"]');
                const savedCheckboxState = localStorage.getItem('checkboxstate');
                const savedComment = localStorage.getItem('orderComment') || '';

                checkbox.checked = savedCheckboxState === 'checked';

                if (commentsField) {
                    commentsField.value = savedComment;
                }  
                    
                const updateComment = async () => {
                    const isChecked = checkbox.checked;
                    const userComment = commentsField?.value.trim() || '';
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

                    console.log('Updating checkout with final comment:', finalComment);

                    localStorage.setItem('checkboxstate', isChecked ? 'checked' : 'unchecked');
                    localStorage.setItem('orderComment', userComment);

                    try {
                        const updateResponse = await service.updateCheckout({
                            customerMessage: finalComment,
                        });
                        console.log('Checkout updated successfully:', updateResponse);
                    } catch (error) {
                        console.error('Error updating checkout:', error);
                    }
                };

                checkbox.addEventListener('change', updateComment);
                if (commentsField) {
                    commentsField.addEventListener('input', updateComment);
                }
            };

            const initPaymentObserver = () => {
                const paymentContainer = document.querySelector('.paymentProviderHeader-container');
                console.log("payment",paymentContainer);

                if (!paymentContainer) {
                    console.log('Payment provider container not found.');
                    return;
                }

                paymentContainer.addEventListener('click', async () => {
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
                });
            };

            const observer = new MutationObserver(() => {
                console.log('DOM reinitializing checkbox');
                initCheckbox();

                initPaymentObserver();

            });

            observer.observe(document.body, { childList: true, subtree: true });

            initCheckbox();

            initPaymentObserver();


            await resetCheckbox();

            console.log('Script initialization successfully completed.');
        } catch (error) {
            console.error("Error during checkout process:", error);

            if (error.response) {
                console.error("Error response from server: ", error.response.data);
            }
        }
    }
    }

