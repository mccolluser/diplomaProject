document.addEventListener('DOMContentLoaded', function () {
    let btn = document.querySelector('.header_btn.text-uppercase.text-left.popup_engineer_btn'),
        modalWindowOverlay = document.querySelector('.popup_engineer'),
        popupContent = document.querySelectorAll('.popup_content.text-center'),
        popupClose = document.querySelectorAll('.popup_close'),
        popupOverlay = document.querySelector('.popup'),
        forms = document.forms;
        
    btn.addEventListener('click', function () {
        cleanStatusForm();
        modalWindowOverlay.style.display = 'block';
        document.body.style.overflow = "hidden";
    });
    
    popupClose.forEach(function (item) {
        item.addEventListener('click', () => {
            modalWindowOverlay.style.display = 'none';
            popupOverlay.style.display = 'none';
            document.body.style.overflow = "";
        });
    });

    function cleanStatusForm(){
        let allStatuses = document.querySelectorAll('.status');
        allStatuses.forEach(function(item){
            item.innerHTML = '';
        })
    }

    function closeOverlay(event) {
        for (let i = 0; i < popupContent.length; ++i) {
            if (event.target.offsetParent == popupContent[i]) {
                return;
            }
        }
        modalWindowOverlay.style.display = 'none';
        popupOverlay.style.display = 'none';
    }
    modalWindowOverlay.addEventListener('click', closeOverlay);
    popupOverlay.addEventListener('click', closeOverlay);

    let links = document.querySelectorAll('a.phone_link');

    links.forEach(function (item) {
        cleanStatusForm();
        item.addEventListener('click', function () {
            popupOverlay.style.display = 'block';
        });
    });
    // запрет на ввод не цифр
    let inputUserPhone = document.querySelectorAll('input[name="user_phone"]');
    inputUserPhone.forEach(function(item){
        item.addEventListener('keypress', function(event){
            event.preventDefault();
            if (/\d/.test(event.key)) {
                item.value += event.key;
            } else {
                return;
            }
        });
    });

    //forms ajax
    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!!!',
        failure: 'Что-то пошло не так'
    };
    let statusMessage = document.createElement('div');
    statusMessage.classList.add('status');
    for (let i = 0; i < forms.length; ++i) {
        let form = forms[i];
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            form.appendChild(statusMessage);
            statusMessage.style.display = 'block';
            let inputs = form.getElementsByTagName('input'),
                formData = new FormData(form);

            function postData(data) {
                // return new Promise(function (resolv, reject) {
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

                    let obj = {};
                    data.forEach(function (value, key) {
                        obj[key] = value;
                    });

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
                });

            }
            postData(formData);
            clearInput();
            function clearInput() {
                for (let i = 0; i < inputs.length; ++i) {
                    inputs[i].value = '';
                }
            }
            
        });
    }
});