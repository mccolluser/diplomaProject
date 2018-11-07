function  tabs () {
    let headerTabs = document.querySelectorAll('.glazing_block'),
        headerTabsLinks = document.querySelectorAll('.glazing_block a'),
        tabs = document.querySelectorAll('section.glazing div.row');

    function showTab(index) {
        for (let i = 0; i < tabs.length; ++i) {
            headerTabsLinks[i].classList.remove('active');
            tabs[i].style.display = 'none';
        }
        tabs[index].style.display = 'block';
        headerTabsLinks[index].classList.add('active');
    }
    
    showTab(0);

    headerTabs.forEach((item) => {
        item.addEventListener('click', function (event) {
            let target = event.target;
            if (target.classList.contains('glazing_block') || target.parentElement.classList.contains('glazing_block')) {
                for (let i = 0; i < headerTabs.length; ++i) {
                    if (target.parentElement == headerTabs[i] || target == headerTabs[i]) {
                        showTab(i);
                        return;
                    }
                }
            }


        });
    });

    //следующие табы
    let headerTabsSecond = document.querySelectorAll('.decoration_item'),
        tabsSecond = document.querySelectorAll('.decoration_content .row')[0].children;

    function showTabSecond(index) {
        for (let i = 0; i < headerTabsSecond.length; ++i) {

            let headerTab = headerTabsSecond[i].children[0];
            headerTab.classList.remove('after_click');
            tabsSecond[i].style.display = 'none';
        }
        tabsSecond[index].style.display = 'block';

        headerTabsSecond[index].children[0].classList.add('after_click');
    }

    showTabSecond(0);

    headerTabsSecond.forEach((item) => {
        item.addEventListener('click',  (event) => {
            let target = event.target;
            for (let i = 0; i < headerTabsSecond.length; ++i) {
                if (target == headerTabsSecond[i] || target.parentElement == headerTabsSecond[i] ||
                    target.parentElement.parentElement == headerTabsSecond[i]) {
                    showTabSecond(i);
                    return;
                }
            }

        });
    });
}
module.exports = tabs;