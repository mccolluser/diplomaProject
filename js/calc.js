document.addEventListener('DOMContentLoaded', function () {
    let popupCalcForm = document.querySelector('.popup_calc'),
        popupCalcFormInputs = document.querySelectorAll('.popup_calc input'),
        popupCalcFormBtn = document.querySelector('button.popup_calc_button'),
        popupCalcFormBtns = document.querySelectorAll('button.glazing_price_btn.text-uppercase.popup_calc_btn'),
        popupCalcFormClose = document.querySelector('.popup_calc_close'),
        previewIcons = document.querySelectorAll("img[class^=type"),
        previewImage = document.querySelectorAll("img[id^=type"),
        popupCalcProfile = document.querySelector(".popup_calc_profile"),
        popupCalcProfileClose = document.querySelector(".popup_calc_profile_close"),
        checkBoxLabels = document.querySelectorAll(".popup_calc_profile_content label"),
        checkBoxInputs = document.querySelectorAll(".popup_calc_profile_content input"),
        showEndCalcFormBtn = document.querySelector(".button.popup_calc_profile_button");


    let currentCheckBox = 0;
    let objData = {
        'width': undefined,
        'height': undefined,
        'formBalcon': undefined,
        'glazingProfile': undefined,
        'glazingType': undefined,
        'name': undefined,
        'phone': undefined
    };

    function clearObjData() {
        for (let key in objData) {
            objData[key] = undefined;
        }
    }

    showPreviewIcon(0);
    // checkBoxInputs[0].checked = true;

    function showPreviewIcon(index) {
        for (let i = 0; i < previewIcons.length; ++i) {
            previewIcons[i].classList.remove('do_image_more');
            previewImage[i].style.display = 'none';
        }
        previewIcons[index].classList.add('do_image_more');
        previewImage[index].style.display = 'inline-block';
    }

    function getActivePreviewIcon() {
        for (let i = 0; i < previewIcons.length; ++i) {
            if (previewIcons[i].classList.contains('do_image_more')) {
                return i;
            }
        }
    }
    popupCalcFormInputs.forEach(function (item) {
        item.addEventListener('keypress', function (event) {
            event.preventDefault();
            if (/\d/.test(event.key)) {
                this.value += event.key;
                return;
            } else {
                return;
            }
        });
        item.addEventListener('change', function (event) {
            event.preventDefault();
            if (/\D/.test(this.value)) {
                item.value = "";
                return;
            } else {
                return;
            }
        });
    });
    popupCalcFormBtns.forEach(function (item) {

        item.addEventListener('click', () => {
            popupCalcForm.style.display = 'block';
            document.body.style.overflow = "hidden";

            popupCalcFormClose.addEventListener('click', () => {
                clearObjData();

                popupCalcFormInputs[0].value = null;
                popupCalcFormInputs[1].value = null;
                showPreviewIcon(0);

                popupCalcForm.style.display = 'none';
                document.body.style.overflow = "";
            });
            previewIcons.forEach(function (item, index) {
                item.addEventListener('click', function (event) {
                    event.preventDefault();
                    showPreviewIcon(index);
                });
            });

            popupCalcFormBtn.addEventListener('click', function () {
                popupCalcForm.style.display = 'none';

                objData.width = +popupCalcFormInputs[0].value;
                objData.height = +popupCalcFormInputs[1].value;
                objData.formBalcon = previewIcons[getActivePreviewIcon()].getAttribute('alt');

                popupCalcFormInputs[0].value = null;
                popupCalcFormInputs[1].value = null;
                showPreviewIcon(0);

                popupCalcProfile.style.display = 'block';
            });
        });
    });
    popupCalcProfileClose.addEventListener('click', function () {
        clearObjData();
        document.getElementById('view_type').selectedIndex = 0;
        for (let i = 0; i < checkBoxInputs.length; ++i) {
            checkBoxInputs[i].checked = false;
        }

        popupCalcProfile.style.display = 'none';
        document.body.style.overflow = "";
    });
    checkBoxLabels.forEach(function (item, index) {
        item.addEventListener('click', function () {
            currentCheckBox = index;
            checkBoxInputs[(index + 1) % 2].checked = false;
        });
    });

    let popupCalcEndClose = document.querySelector('.popup_calc_end_close'),
        popupCalcEndForm = document.querySelector(".popup_calc_end"),
        popupCalcEndFormForm = document.querySelector(".popup_calc_end form");


    showEndCalcFormBtn.addEventListener('click', function () {
        popupCalcProfile.style.display = 'none';
        document.getElementById('view_type').selectedIndex = 0;
        for (let i = 0; i < checkBoxInputs.length; ++i) {
            checkBoxInputs[i].checked = false;
        }

        let selectedGlazingType = document.getElementById('view_type').value;
        let glazingProfile = document.querySelectorAll('.checkbox-custom')[currentCheckBox].getAttribute('id');
        objData.glazingProfile = glazingProfile;
        objData.glazingType = selectedGlazingType;

        popupCalcEndForm.style.display = 'block';
        document.body.style.overflow = "hidden";
    });
    popupCalcEndClose.addEventListener('click', function () {
        clearObjData();
        popupCalcEndForm.style.display = 'none';
        document.body.style.overflow = "";
    });
    let popupCalcEndSubmitBtn = document.querySelector('.popup_calc_end button[name="submit"]');
    popupCalcEndSubmitBtn.addEventListener('click', function (event) {
        event.preventDefault();
        objData.name = document.querySelector('.popup_calc_end input[name="user_name"]').value;
        objData.phone = document.querySelector('.popup_calc_end input[name="user_phone"]').value;
        postData(objData, popupCalcEndFormForm);
    });

    function postData(obj, form) {
        let message = {
            loading: 'Загрузка...',
            success: 'Спасибо! Скоро мы с вами свяжемся!!!',
            failure: 'Что-то пошло не так'
        };
        let inputs = document.querySelectorAll(".popup_calc_end form input");
        let statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        form.appendChild(statusMessage);
        statusMessage.style.display = 'block';

        // return new Promise(function (resolv, reject) {
        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let jsonData = JSON.stringify(obj);

        request.send(jsonData);

        request.addEventListener('readystatechange', function () {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
            clearInput();

            function clearInput() {
                for (let i = 0; i < inputs.length; ++i) {
                    inputs[i].value = '';
                }
            }
        });

    }
});