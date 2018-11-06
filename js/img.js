document.addEventListener('DOMContentLoaded', function(){
    let images = document.querySelectorAll('.works .col-lg-3');
    let worksDiv = document.querySelector('.works');

    images.forEach(function(item){
        item.addEventListener('click', function(){
            event.preventDefault();
            let overlay = document.querySelector('.overlay'),
                image = this.children[0].children[1],
                srcImage = image.getAttribute('src');
            
            
            overlay.style.display = 'block';
            let creatingImage = document.createElement('img');
            creatingImage.src = srcImage;
            creatingImage.classList.add('myimage');
            creatingImage.style.top = '10%';
            let left = Math.trunc(document.documentElement.clientWidth / 2 - 250);
            creatingImage.style.left = left + 'px';
            worksDiv.appendChild(creatingImage);
            overlay.addEventListener('click', function(){
                this.style.display = 'none';
                if (worksDiv.childNodes[3] == creatingImage){
                    worksDiv.removeChild(creatingImage);
                }
                
            });
            

        });
    });
});