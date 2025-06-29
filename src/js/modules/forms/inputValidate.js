export default function inputValidate() {
   document.addEventListener('DOMContentLoaded', function () {
      const forms = Array.from(document.querySelectorAll('form')).filter(form => {
         return form.querySelector('[data-required]');
      });

      forms.forEach(form => {
         form.addEventListener('submit', async function (e) {
            e.preventDefault();
            const error = formValidate(form);

            if (error === 0) {
               // console.log('Form is valid and ready to submit');
               // form.submit();
            } else {
               // console.log('Form has validation errors');
            }
         });

         form.querySelectorAll('[data-required]').forEach(input => {
            input.addEventListener('focus', () => formRemoveError(input));
         });
      });

      function formValidate(form) {
         let error = 0;
         const formReq = form.querySelectorAll('[data-required]');

         formReq.forEach(input => {
            formRemoveError(input);

            const type = input.dataset.required;

            if (type === 'email') {
               if (emailTest(input)) {
                  formAddError(input, 'Invalid email address');
                  error++;
               }
            } else if (type === 'phone') {
               if (phoneTest(input)) {
                  formAddError(input, 'Invalid phone number');
                  error++;
               }
            } else if (input.type === 'checkbox' && !input.checked) {
               formAddError(input, 'You must agree to the politics');
               error++;
            } else if (input.value.trim() === '') {
               formAddError(input, 'This field is required');
               error++;
            }
         });

         return error;
      }

      function formAddError(input, message) {
         input.parentElement.classList.add('parent-input__error');
         input.classList.add('input__error');

         let errorElem = input.parentElement.querySelector('.error-message');
         if (!errorElem) {
            errorElem = document.createElement('span');
            errorElem.classList.add('error-message');
            input.parentElement.appendChild(errorElem);
         }
         errorElem.textContent = message;
      }

      function formRemoveError(input) {
         input.parentElement.classList.remove('parent-input__error');
         input.classList.remove('input__error');

         const errorElem = input.parentElement.querySelector('.error-message');
         if (errorElem) errorElem.remove();
      }

      function emailTest(input) {
         return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
      }

      function phoneTest(input) {
         return !/^\+?[0-9]{10,14}$/.test(input.value);
      }
   });
}