document.addEventListener('DOMContentLoaded', function(){
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
        

    
    let objData = {};
    function clearObjData(){
        objData = {};
    }

    showPreviewIcon(0);

    function showPreviewIcon(index){
        for (let i = 0; i < previewIcons.length; ++i){
            previewIcons[i].classList.remove('do_image_more');
            previewImage[i].style.display = 'none';
        }
        previewIcons[index].classList.add('do_image_more');
        previewImage[index].style.display = 'inline-block';
    }
    popupCalcFormBtns.forEach(function(item){
        item.addEventListener('click', () => {
            popupCalcForm.style.display = 'block';

            popupCalcFormClose.addEventListener('click', () => {
                clearObjData();
                popupCalcForm.style.display = 'none';
            });
            previewIcons.forEach(function(item, index){
                item.addEventListener('click', function(event){
                    event.preventDefault();
                    showPreviewIcon(index);
                });
            });
            popupCalcFormInputs.forEach(function(item){
                item.addEventListener('keypress', function(event){
                    event.preventDefault();
                    if (/\d/.test(event.key)) {
                        item.value += event.key;
                    } else {
                        return;
                    }
                });
                item.addEventListener('change', function(event){
                    if (/\D/.test(this.value)) {
                        item.value = "";
                    } else {
                        return;
                    }
                });
            });
            popupCalcFormBtn.addEventListener('click', function(){
                popupCalcForm.style.display = 'none';
                popupCalcProfile.style.display = 'block';
            });
        });
    });
    popupCalcProfileClose.addEventListener('click', function(){
        clearObjData();
        popupCalcProfile.style.display = 'none';
    });
    checkBoxLabels.forEach(function(item, index){
        item.addEventListener('click', function(){
            checkBoxInputs[(index + 1) % 2].checked = false;
        });
        
    });

    let popupCalcEndClose = document.querySelector('.popup_calc_end_close'),
        popupCalcEndForm = document.querySelector(".popup_calc_end");


    showEndCalcFormBtn.addEventListener('click', function(){
        popupCalcProfile.style.display = 'none';
        popupCalcEndForm.style.display = 'block';
    });
    popupCalcEndClose.addEventListener('click', function(){
        popupCalcEndForm.style.display = 'none';
    });
    let popupCalcEndSubmitBtn = document.querySelector('.popup_calc_end button[name="submit"]');
    popupCalcEndSubmitBtn.addEventListener('click', function(event){
        alert(1);
    });

});