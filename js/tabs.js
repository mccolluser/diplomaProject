document.addEventListener('DOMContentLoaded', function(){
    let headerTabs = document.querySelectorAll('.glazing_block'),
        infoHeader = document.querySelector('.glazing_slider'),
        headerTabsLinks = document.querySelectorAll('.glazing_block a'),
        tabs = document.querySelectorAll('section.glazing div.row');
    
    function showTab(index){
        for (let i = 0; i < tabs.length; ++i){
            headerTabsLinks[i].classList.remove('active');
            tabs[i].style.display = 'none';
        }
        tabs[index].style.display = 'block';
        headerTabsLinks[index].classList.add('active');
    }

    showTab(0);

    // infoHeader.addEventListener('click', function(event){
    //     let target = event.target;
    //         for (let i = 0; i < headerTabs.length; ++i){
    //             if (target == headerTabs[i]){
    //                 showTab(i);
    //                 return;        
    //             }
    //         }
    // });
    
    headerTabs.forEach(function(item, index){
        item.addEventListener('click', function(event){
            let target = event.target;
            if (target.classList.contains('glazing_block') || target.parentElement.classList.contains('glazing_block')){
                for (let i = 0; i < headerTabs.length; ++i){
                    if (target.parentElement == headerTabs[i] || target == headerTabs[i]){
                        showTab(index);
                        return;        
                    }
                }
            }
            
            
        })
    });
});